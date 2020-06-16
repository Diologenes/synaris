<template>
	<div id="app">
		<applicationBar />
		<router-view />
		<keyboard-navigation />
		<notification />
	</div>
</template>

<script>
	import applicationBar from '@/components//Elements/ApplicationBar'
	import notification from '@/services/Notification.js'
	import keyboardNavigation from '@/services/KeyboardNavigation.js'

	export default {
		name: 'App',
		components: {
			applicationBar,
			notification,
			keyboardNavigation
		}
	}
</script>
