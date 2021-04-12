export const state = () => ({
    pengajuan: [],
    data: [],
    status: [],
    approve: [],
    decline: [],
    history: [],
    subordinate: [],
    errors: []
})

export const mutations = {
    SET_PENGAJUAN_DATA(state, payload) {
        state.pengajuan = payload
    },

    SET_DATA(state, payload) {
        state.data = payload
    },

    SET_STATUS(state, payload) {
        state.status = payload
    },

    SET_APPROVE(state, payload) {
        state.approve = payload
    },

    SET_DECLINE(state, payload) {
        state.decline = payload
    },

    SET_HISTORY(state, payload) {
        state.history = payload
    },

    SET_SUBORDINATE(state, payload) {
        state.subordinate = payload
    },

    SET_ERRORS(state, payload) {
        state.errors = payload
    }
}

export const actions = {
    getpengajuan({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/pengajuan/byUser/${payload}`).then((response) => {
                commit('SET_PENGAJUAN_DATA', response.data.data.data)
                resolve()
            })
        })
    },
    getpengajuanID({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/pengajuan/${payload}`).then((response) => {
                commit('SET_DATA', response.data.data)
                commit('SET_STATUS', response.data.status)
                commit('SET_HISTORY', response.data.history.data)
                resolve()
            })
        })
    },
    storepengajuan({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/pengajuan/', payload).then((response) => {
                dispatch('getpengajuan')
                resolve()
            })
            .catch((e) => {
                commit('SET_ERRORS', e.response.data)
            })
        })
    },
    updatepengajuan({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put(`/pengajuan/${payload.id}`, payload).then((response) => {
                dispatch('getpengajuan')
                resolve()
            })
            .catch((e) => {
                commit('SET_ERRORS', e.response.data)
            })
        })
    },
    deletepengajuan({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/pengajuan/${payload}`).then((response) => {
                dispatch('getpengajuan')
                resolve()
            })
            .catch((e) => {
                commit('SET_ERRORS', e.response.data)
            })
        })
    },
    getstatus({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/pengajuan/status/${payload}`).then((response) => {
                commit('SET_STATUS', response.data.data)
                resolve()
            })
        })
    },
    getapprove({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/pengajuan/approve/${payload}`).then((response) => {
                commit('SET_APPROVE', response.data.data)
                resolve()
            })
        })
    },
    getdecline({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/pengajuan/decline/${payload}`).then((response) => {
                commit('SET_DECLINE', response.data.data)
                resolve()
            })
        })
    },
    gethistory({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/pengajuan/history/${payload}`).then((response) => {
                commit('SET_HISTORY', response.data.data)
                resolve()
            })
        })
    },
    getsubordinates({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/pengajuan/pengajuanSubordinate/${payload}`).then((response) => {
                commit('SET_SUBORDINATE', response.data)
                resolve()
            })
        })
    }
}