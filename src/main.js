import './assets/sass/app.scss'
import db from './database/models'
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
require('./services/EventBus')
require('./filters/formatDate')
require('./filters/textCrop')
require('./components')

Vue.prototype.$db = db
Vue.use(BootstrapVue)
Vue.use(PerfectScrollbar)

new Vue({
	store,
	router,
	methods: {
		routeKeySwitch(route) {
			if (this.$route.name !== route) this.$router.push({ name: route })
		}
	},
	mounted() {
		this._keyListener = function(e) {
			if (e.key === '1' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault()
				this.routeKeySwitch('categoryList')
			}
			if (e.key === '2' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault()
				this.routeKeySwitch('search')
			}
		}
		document.addEventListener('keydown', this._keyListener.bind(this))
	},
	beforeDestroy() {
		document.removeEventListener('keydown', this._keyListener)
	},
	render: h => h(App)
}).$mount('#app')
