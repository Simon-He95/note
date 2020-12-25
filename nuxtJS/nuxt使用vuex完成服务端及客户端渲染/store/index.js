import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

export const modules = {
  geo,
  home
}


export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    const { status:positionStatus, data: { province, city } } = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', positionStatus === 200 ? { city:'上海', province } : { city: '', province: '' })

    const { status:menuStatus, data: {menu}} = await app.$axios.get('/geo/menu')
    commit('home/setMenu', menuStatus === 200 ? {menu} : {menu: []})

    const { status:hotPlaceStatus, data: {result}} = await app.$axios.get('/search/hotPlace', {
      params: {
        city: app.store.state.geo.position.city.replace('市', '')
      }
    })
    commit('home/setHotPlace', hotPlaceStatus === 200 ? {result} : {result: []})

  }
}
