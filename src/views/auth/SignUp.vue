<template>
    <div class='row justify-center q-mt-xl absolute-center full-width'>
        <q-form @submit.prevent="signUP" class='col-xs-11 col-sm-5 col-md-5 col-lg-3 col-xl-3  text-center q-gutter-lg'>
            <q-input type="email" v-model='formData.email' outlined dense placeholder='email'/>
            <q-input type="password" v-model='formData.password' outlined dense placeholder='password'/>
            <q-btn  type='submit'>Registration</q-btn>
        </q-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from '../../firebase'
export default {

    data(){
        return {
            formData: {
                email: '',
                password:'',
            },
        }
    },
    methods:{
        ...mapActions('auth',['signUp']),
        signUP(){
            firebase.auth().createUserWithEmailAndPassword(this.formData.email,this.formData.password).then((resp)=>{
            const user = resp.user
            this.signUp({ id: user.uid, email: user.email })
            .then(() => {
            this.$router.push('/admin')
            })
        })
        }
    }
}
</script>