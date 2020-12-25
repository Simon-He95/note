const state = () => ({
  menu: [],
  hotPlace: []
})

const mutations = {
  setMenu(state, menu) {
    state.menu = menu
  },
  setHotPlace(state, hotPlace) {
    state.hotPlace = hotPlace
  }
}

const actions = {
  setMenu: ({commit}, menu) => {
    commit('setMenu', menu)
  },
  setHotPlace: ({commit}, hotPlace) => {
    commit('setHotPlace', hotPlace)
  }
}

export default {namespaced: true, state, mutations, actions}
