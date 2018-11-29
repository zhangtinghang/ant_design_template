
const app = {
  state: {
    sidebar: !+window.localStorage.getItem('sidebarStatus'),
    device: 'desktop',
    // eslint-disable-next-line no-undef
    language: window.localStorage.getItem('language') || 'en'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar) {
        // eslint-disable-next-line no-undef
        window.localStorage.setItem('sidebarStatus', 1)
      } else {
        // eslint-disable-next-line no-undef
        window.localStorage.setItem('sidebarStatus', 0)
      }
      state.sidebar = !state.sidebar
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      // eslint-disable-next-line no-undef
      window.localStorage.setItem('language', language)
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    // toggleDevice({ commit }, device) {
    //   commit('TOGGLE_DEVICE', device)
    // },
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
