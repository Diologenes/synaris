import './assets/sass/app.scss'
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
require('./services/EventBus')
require('./filters/formatDate')
require('./filters/textCrop')
require('./components')
const db = require('./database/models')

Vue.prototype.$db = db
Vue.use(BootstrapVue)
Vue.use(PerfectScrollbar)

new Vue({
	store: store,
	router,
	render: (h) => h(App)
}).$mount('#app')