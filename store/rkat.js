export const state = () => ({
    rkat: [],
    data: [],
    errors: [],
    rkatUser: [],
})

export const mutations = {
    SET_RKAT_DATA(state, payload) {
        state.rkat = payload
    },
    
    SET_DATA(state, payload) {
        state.data = payload
    },
    
    SET_ERRORS(state, payload) {
        state.errors = payload
    },

    SET_RKAT_USER(state, payload) {
        state.rkatUser = payload
    },
}

export const actions = {
    getrkat({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/rkat/').then((response) => {
                commit('SET_RKAT_DATA', response.data.data)
                resolve()
            })
        })
    },
    getrkatID({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/rkat/${payload}`).then((response) => {
                commit('SET_DATA', response.data.data)
                resolve()
            })
        })
    },
    storerkat({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/rkat/', payload).then((response) => {
                dispatch('getrkat')
                resolve()
            })
            .catch((e) => {
                commit('SET_ERRORS', e.response.data)
            })
        })
    },
    updaterkat({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/rkat/${payload.id}`, payload).then((response) => {
                dispatch('getrkat')
                resolve()
            })
            .catch((e) => {
                commit('SET_ERRORS', e.response.data)
            })
        })
    },
    deleterkat({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/rkat/delete/${payload}`).then((response) => {
                dispatch('getrkat')
                resolve()
            })
            .catch((e) => {
                commit('SET_ERRORS', e.response.data)
            })
        })
    },
    getUser({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/user/rkatUser').then((response) => {
                commit('SET_RKAT_USER', response.data.data)
                resolve()
            })
        })
    },
}