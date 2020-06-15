<template>
	<div id="app">
		<router-view />
		<keyboard-navigation />
		<notification />
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
