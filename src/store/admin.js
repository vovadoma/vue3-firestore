import db from "../db";

const state = {
  collections: ["users", "testCollection"],
  users: [],
  collectionData: [],
  loading: null,
};
const mutations = {
  startFetch(state) {
    state.loading = true;
    state.collectionData = [];
  },
  addDoc(state, { data }) {
    state.collectionData.push(data.data());
    state.loading = false;
  },
  removeDoc(state, { oldIndex }) {
    state.collectionData.splice(oldIndex, 1);
    state.loading = false;
  },
  updDoc(state, { oldIndex, data }) {
    state.collectionData.splice(oldIndex, 1);
    state.collectionData.push({ ...data.data(), id: data.data().id });
    state.loading = false;
  },
};
const actions = {
  async bindTable({ commit }, collect) {
    commit("startFetch");
    try {
      db.collection(collect).onSnapshot(
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const { newIndex, oldIndex, doc, type } = change;
            if (type === "added") {
              commit("addDoc", { collect, newIndex, data: doc });
            }
            if (type === "modified") {
              commit("updDoc", { collect, newIndex, oldIndex, data: doc });
            }
            if (type === "removed") {
              commit("removeDoc", { collect, oldIndex, data: doc });
            }
          });
          return collect;
        },
        (error) => {
          console.log(error);
        },
      );
      return collect;
    } catch (e) {
      return e;
    }
  },
  removeDocs(store, { collect, data }) {
    data.forEach(({ id }) => {
      db.collection(collect)
        .doc(id.trim())
        .delete();
    });
  },
  async updateDoc(store, { collect, data }) {
    const { id, ...otherData } = data;
    await db
      .collection(collect)
      .doc(id.trim())
      .update({ ...otherData });
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
