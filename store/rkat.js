// export const state = () => ({
//     rkat: [], //DATA RKAT AKAN DISIMPAN KE DALAM STATE INI
//     errors: []
// })

// export const mutations = {
//     //MUTATION INI DIGUNAKAN UNTUK MENGUBAH VALUE DARI STATE rkat
//     SET_RKAT_DATA(state, payload) {
//         state.rkat = payload
//     },
//     SET_ERRORS(state, payload) {
//         state.errors = payload
//     }
// }

// export const actions = {
//     //FUNGSI UNTUK MENGAMBIL DATA RKAT
//     getrkatData({ commit }) {
//         return new Promise((resolve, reject) => {
//             this.$axios.get('/rkat').then((response) => {
//                 commit('SET_RKAT_DATA', response.data)
//                 resolve()
//             })
//         })
//     },
// }