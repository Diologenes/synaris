import './assets/sass/app.scss'
import electronFileStorage from './store/electron/Index'
import db from './database/models'
import Vue from 'vue'
import App from './App'
import store from './store/vuex/index'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
require('./services/EventBus')
require('./filters/formatDate')
require('./filters/textCrop')
require('./components')

import { ToastPlugin } from 'bootstrap-vue'
Vue.use(ToastPlugin)

Vue.prototype.$electronFileStorage = electronFileStorage
Vue.prototype.$db = db
Vue.use(BootstrapVue)
Vue.use(PerfectScrollbar)

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
