<template>
    <div>
        <form @submit.prevent="signIn">
            <input type="email" v-model='formData.email'/>
            <input type="password" v-model='formData.password'/>
            <button  type='submit'>Submit</button>
        </form>
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
        ...mapActions('auth',['setUser']),
        signIn(){
            firebase.auth().createUserWithEmailAndPassword(this.formData.email,this.formData.password).then((resp)=>{
            const user = resp.user
            this.setUser({ uid: user.uid, email: user.email })
            .then(() => {
            this.$router.push('/admin')
            })
        })
        }
    }
}
</script>