import './assets/sass/app.scss'
import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
import { router } from './routes/routes'
import BootstrapVue from 'bootstrap-vue'

require('./components/components')
require('./directives/clickOutside')
const db = require('./database/models')
Vue.prototype.$db = db

Vue.use(BootstrapVue)

new Vue({
	store: store,
	router: router,
	render: (h) => h(App)
}).$mount('#app')