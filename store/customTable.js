export const state = () => ({
    success: [],
    errors: [],
})

export const mutations = {
    SET_SUCCESS(state, payload) {
        state.success = payload
    },

    SET_ERRORS(state, payload) {
        state.errors = payload
    },
}

export const actions = {
    action({ commit }, payload) {
        return new Promise((resolve, reject) => {
            const fun = '';
            if (payload.route == "RESET") {
                this.$axios.get(payload.link).then((response) => {
                    commit('SET_SUCCESS', response.data.data)
                    resolve()
                })
            }
            fun.catch((e) => {
                commit('SET_ERRORS', e.response.data)
            })
        })
    }
}