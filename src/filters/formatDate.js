import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value, format) {
	if (value) {
		let formatted = 'DD.MM.YYYY'
		if (format === 'DateTimeExact') {
			formatted = formatted + ', HH:mm:ss'
		}
		if (format === 'DateTime') {
			formatted = formatted + ', HH:mm'
		}
		if (format === 'fromNow') {
			return moment(value).fromNow()
		}
		return moment(value).format(formatted)
	}
})
