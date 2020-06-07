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

db.sequelize.beforeConnect((config) => {
	console.log('BEFORE CONNECT:', config);
})

db.sequelize.afterConnect((connection, config) => {
	console.log('AFRER CONNECT:', connection, config);
})


Vue.use(BootstrapVue)
Vue.use(PerfectScrollbar)

Vue.prototype.$db = db

new Vue({
	store: store,
	router,
	render: (h) => h(App)
}).$mount('#app')