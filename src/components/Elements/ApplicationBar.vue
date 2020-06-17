<template>
	<div class="c-applicationwindow-bar">
		<div class="c-applicationwindow-bar__logo"><img class="c-applicationwindow-bar__logo-icon" src="images/app-logo.svg" /></div>
		<div class="c-applicationwindow-bar__title">Synaris</div>
		<div class="c-applicationwindow-bar__controls">
			<button
				id="c-applicationwindow-bar-button-minimize"
				class="c-applicationwindow-bar__control c-applicationwindow-bar__control--minimize u-icon--win-minimize"
				@click="minimize"
			></button>
			<button
				id="c-applicationwindow-bar-button-maximize"
				class="c-applicationwindow-bar__control c-applicationwindow-bar__control--maximize"
				:class="iconWindowModeChange"
				@click="maximize"
			></button>
			<button
				id="c-applicationwindow-bar-button-close"
				class="c-applicationwindow-bar__control c-applicationwindow-bar__control--close u-icon--close"
				@click="close"
			></button>
		</div>
	</div>
</template>
<script>
	import { remote } from 'electron'

	export default {
		data() {
			return {
				iconWindowModeChange: 'u-icon--win-fullscreen',
			}
		},
		mounted() {
			this.checkWindowMode()
		},
		methods: {
			checkWindowMode() {
				const getCurrentWindow = remote.getCurrentWindow()
				getCurrentWindow.isMaximized() ? (this.iconWindowModeChange = 'u-icon--win-window') : (this.iconWindowModeChange = 'u-icon--win-fullscreen')
			},

			minimize() {
				remote.getCurrentWindow().minimize()
			},

			maximize() {
				const getCurrentWindow = remote.getCurrentWindow()
				getCurrentWindow.isMaximized() ? remote.getCurrentWindow().unmaximize() : getCurrentWindow.maximize()
				this.checkWindowMode()
			},

			close() {
				remote.app.quit()
			}
		}
	}
</script>
