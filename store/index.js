export const state = () => ({
    settings: {},
})

export const mutations = {
    // Set Settings
    setSettings(state, payload) {
        state.settings = payload
    }
}

export const actions = {
    // Get Settings
    async getSettings({ commit }) {
        const response = await this.$axios.get('/api/setting')

        const settings = response.data.result.settings

        commit('setSettings', settings)
    }
}