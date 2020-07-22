import Vue from 'vue'

import App from './layouts/app.vue'
import createStore from './store.js'
import createRouter from './routes.js'
import mixins from './mixins.js'

import VueGoodTablePlugin from 'vue-good-table'
Vue.use(VueGoodTablePlugin)

Vue.mixin(mixins)

export default () => {
    const store = createStore()
    const router = createRouter()

    const app = new Vue({
        router,
        store,
        ...App,
    })

    return {
        app,
        router,
        store,
    }
}
