<template>
  <q-page class="flex row">
    <q-card class="col-lg-1 col-md-2 col-sm-2 ">
      <q-card-section class="flex-center flex column">
        <q-item>
          <q-tabs v-model="currentCollect" vertical class="text-dark">
            <q-route-tab
              :to="{ params: { collect: collect } }"
              v-for="collect in collections"
              :name="collect"
              :label="collect"
              :key="collect"
            />
          </q-tabs>
        </q-item>
      </q-card-section>
    </q-card>
    <q-spinner-cube
      class="absolute-center"
      size="5em"
      color="warning"
      v-if="loading"
    />
    <q-card v-else-if="initTable" class="col-lg-11 col-md-10 col-sm-10">
      <q-card-section class="q-mt-md flex column items-center">
        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="getHeadersColumns"
          option-value="name"
          options-cover
          row-key="name"
        />
      </q-card-section>
      <q-card-section v-if="visibleColumns.length" class="flex flex-center">
        <q-table
          table-body-class="width:100px"
          :columns="getHeadersColumns"
          :title="currentCollect"
          style="width: calc(100vw - 300px);"
          :rows="collectionData"
          row-key="id"
          selection="multiple"
          v-model:selected="selectedRow"
          :selected-rows-label="getSelectedString"
          :visible-columns="visibleColumns"
        >
          <template v-slot:top-right v-if="selectedRow.length">
            <q-btn
              class="q-ml-sm"
              color="negative"
              label="Remove row"
              @click="removeRows()"
            />
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td>
                <q-checkbox v-model="props.selected" color="grey-8" />
              </q-td>
              <q-td
                v-for="column in getHeadersColumns"
                :props="props"
                :key="column.name"
              >
                {{ props.row[column.name] }}
                <q-popup-edit
                  v-slot="scope"
                  buttons
                  v-model="props.row"
                  label-set="Save"
                  @save="(value) => updateRow(value)"
                >
                  <q-input
                    v-model="scope.value[column.name]"
                    dense
                    autofocus
                    type="text"
                    @keyup.enter="scope.set"
                  >
                  </q-input>
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import { mapActions, mapState } from "vuex";

  export default {
    props: ["collect"],
    data() {
      return {
        initTable: false,
        currentCollect: "",
        selectedRow: [],
        visibleColumns: [],
      };
    },
    computed: {
      ...mapState("admin", ["collections", "collectionData", "loading"]),

      getHeadersColumns() {
        const columns = [];
        const data = new Set();
        this.collectionData.forEach((doc) => {
          Object.keys(doc).forEach((header) => data.add(header));
        });

        data.forEach((head) => {
          columns.push({
            name: head,
            label: head,
            align: "center",
            sortable: true,
            field: (row) => row[head],
            format: (val) => `${val}` || " ",
          });
        });

        columns.sort((a, b) => {
          if (a.name === b.name) return 0;
          if (a.name === "id") return -1;
          if (b.name === "id") return 1;
        });
        return columns;
      },
    },
    watch: {
      visibleColumns() {
        const dataStr =
          JSON.parse(localStorage.getItem("visibleColumns")) || {};
        dataStr[this.currentCollect] = this.visibleColumns;
        if (this.visibleColumns.length) {
          localStorage.setItem("visibleColumns", JSON.stringify(dataStr));
        }
      },
      currentCollect() {
        if (this.currentCollect) {
          this.visibleColumns = [];
          this.selectedRow = [];
          const storageColumns = JSON.parse(
            localStorage.getItem("visibleColumns"),
          );

          this.visibleColumns = storageColumns?.[this.currentCollect] || [];
          this.bindTable(this.currentCollect);
        }
        this.initTable = !!this.currentCollect;
      },
    },
    methods: {
      ...mapActions("admin", ["bindTable", "removeDocs", "updateDoc"]),
      
      removeRows() {
        this.removeDocs({
          collect: this.currentCollect,
          data: this.selectedRow,
        });
        this.selectedRow = [];
      },

      getSelectedString() {
        return this.selectedRow.length === 0
          ? ""
          : `${this.selectedRow.length} record${
              this.selectedRow.length > 1 ? "s" : ""
            } selected of ${this.collectionData.length}`;
      },

      updateRow(newData) {
        this.updateDoc({ collect: this.currentCollect, data: newData });
      },
    },
    mounted() {
      this.currentCollect = this.$route.params.collect;
    },
  };
</script>
