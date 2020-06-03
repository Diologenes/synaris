import Vue from 'vue'

window.EventBus = new class {

	constructor() {
		console.log('EventBus started')
		this.vue = new Vue()
	}

	fire(event, data = null) {
		this.vue.$emit(event, data)
	}

	listen(event, callback) {
		this.vue.$on(event, callback)
	}

}