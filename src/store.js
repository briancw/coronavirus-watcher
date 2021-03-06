import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {ipcRenderer} from 'electron'

const state = {
    covidDataUpdateTime: '',
    covidData: {},
    watchedCountiesIds: localStorage.getItem('watched-counties') !== null ? JSON.parse(localStorage.getItem('watched-counties')) : [],
}

const mutations = {
    updateCovidData(state, payload) {
        state.covidData = payload
    },
    updateDataTime(state, payload) {
        state.covidDataUpdateTime = payload
    },
}

const actions = {
    getCovidData() {
        ipcRenderer.send('data-request')
    },
}

export default () => new Vuex.Store({state, mutations, actions})
