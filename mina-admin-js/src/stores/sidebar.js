import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'

Vue.use(Vuex)

const sidebarStore = new Vuex.Store({
    modules: {
        app,
    },
    getters
})

export default sidebarStore
