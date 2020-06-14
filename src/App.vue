<template>
	<div id="app">
		<router-view />
		<keyboard-navigation />
	</div>
</template>

<script>
	import keyboardNavigation from '@/services/KeyboardNavigation.js'

	export default {
		name: 'App',
		components: {
			keyboardNavigation
		}
	}
</script>
