import db from '../db'

const state = {}
const mutations = {
    LOGIN (state, user) {
        state.user = user
        localStorage.setItem('user-login', JSON.stringify(user))
    },
    LOGOUT (state) {
        state.user = {}
        localStorage.removeItem('user-login')
    }
}
const actions = {
    // eslint-disable-next-line no-unused-vars
    async setUser ({ commit }, user) {
        try{
            db.collection('users').doc(user.uid).set(user).then(()=>{
                commit('LOGIN', user)
            })
            return user
        }
        catch(e){
        console.log(e.message)
        }
    },
} 
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,

}