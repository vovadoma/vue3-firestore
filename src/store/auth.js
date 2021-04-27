import db from '../db'

const state = {user: null}
const mutations = {
    setUser (state, user) {
        state.user = null
        state.user = user
        localStorage.setItem('user-login', JSON.stringify(user))
    },
    logout (state) {
        state.user = null
        localStorage.removeItem('user-login')
    }
}
const actions = {
    signUp ({ commit }, user) {
        try{
            db.collection('users').doc(user.id).set(user).then(()=>{
                commit('setUser', user)
            })
            return user
        }
        catch(e){
        console.log(e.message)
        }
    },
    login({commit},user){
        commit('setUser', user)
    },

} 
const getters = {
    isAuthenticated () {
        const user = JSON.parse(localStorage.getItem('user-login')) || {}
        return Boolean(user.uid)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,

}