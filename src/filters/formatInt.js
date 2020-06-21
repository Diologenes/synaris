import Vue from 'vue'

Vue.filter('formatInt', function(value) {
	if (Number.isInteger(value) && value > 999) {
		return (value / 1000).toFixed(1) + 'k'
	}
	return value
})
