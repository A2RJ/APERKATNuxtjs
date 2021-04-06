export const state = () => ({
    isAuth: false,
    token: null,
    ardi: null
})

export const mutations = {
    SET_IS_AUTH(state, payload) {
        state.isAuth = payload
    },

    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedUser(state) {
        return state.auth.user
    },
    SET_USER_DATA(state, payload) {
        state.ardi = payload
    },

    SET_API_TOKEN(state, payload) {
        state.token = payload
    }
}

export const actions = {
    nuxtServerInit({ commit }, context) {
        if (context.app.$auth.strategy.token.status().valid()) {
            commit('SET_IS_AUTH', true);
            // console.log(context.app.$auth.$state);
            // console.log(context.app.$auth.user);
        }
        
    },
    // getUsersData({ commit }) {
    //     return new Promise((resolve, reject) => {
    //         //DIMANA KITA MELAKUKAN REQUEST DENGAN METHOD GET KE URL /USERS
    //         this.$axios.get('/api/me').then((response) => {
    //             //DAN MENYIMPAN DATANYA KE STATE USERS MELALUI MUTATIONS
    //             commit('SET_USER_DATA', response)
    //             resolve()
    //         })
    //     })
    // },
}