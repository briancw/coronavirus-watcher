import {ipcRenderer} from 'electron'
import createApp from './create_app.js'

const {app, store, router} = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

ipcRenderer.on('data-response', (event, {lastUpdateTime, covidData}) => {
    let formattedTime = new Date(lastUpdateTime).toLocaleString('en-us', {month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric', hour12: true})
    store.commit('updateDataTime', formattedTime)
    store.commit('updateCovidData', covidData)
})

router.onReady(() => {
    app.$mount('#app')

    store.dispatch('getCovidData')
})

