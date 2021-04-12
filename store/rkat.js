export const state = () => ({
    rkat: [],
    data: [],
    errors: []
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
    }
}

export const actions = {
    getrkat({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/rkat/').then((response) => {
                // console.log(response.data.data);
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
            this.$axios.put(`/rkat/${payload.id}`, payload).then((response) => {
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
            this.$axios.delete(`/rkat/${payload}`).then((response) => {
                dispatch('getrkat')
                resolve()
            })
            .catch((e) => {
                commit('SET_ERRORS', e.response.data)
            })
        })
    },
}