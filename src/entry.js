import {ipcRenderer} from 'electron'
import createApp from './create_app.js'

const {app, store, router} = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

ipcRenderer.on('data-response', (event, {lastUpdateTime, covidData}) => {
    let formattedTime = new Date(lastUpdateTime).toLocaleString('en-us', {month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric', hour12: true})
    store.commit('updateDataTime', formattedTime)

    let statesData = {}
    covidData.forEach((line) => {
        let {state} = line

        if (!statesData[state]) {
            statesData[state] = [line]
        }
        else {
            statesData[state].push(line)
        }
    })
    store.commit('updateCovidData', statesData)
})

router.onReady(() => {
    app.$mount('#app')

    store.dispatch('getCovidData')
})

