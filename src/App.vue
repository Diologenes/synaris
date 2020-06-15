<template>
	<div id="app">
		<router-view />
		<notification />
		<keyboard-navigation />
	</div>
</template>

<script>
	import notification from '@/services/Notification.js'
	import keyboardNavigation from '@/services/KeyboardNavigation.js'

	export default {
		name: 'App',
		components: {
			notification,
			keyboardNavigation
		},
	}
</script>
