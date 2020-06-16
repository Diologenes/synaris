<template>
	<b-modal size="xl" id="modal-global-settings" ref="modalGlobalSettings" centered title="Settings" :hide-footer="true">
		<tab-container>
			<tab-item title="Database">
				<settings-change-database />
			</tab-item>
			<tab-item title="Keyboard Shortcuts">
				<keyboard-shortcuts />
			</tab-item>
			<tab-item title="About">
				<about-app />
			</tab-item>
		</tab-container>
	</b-modal>
</template>

<script>
	import settingsChangeDatabase from '@/views/Settings/ChangeDatabase'
	import keyboardShortcuts from '@/views/Settings/KeyboardShortcuts'
	import aboutApp from '@/views/Settings/AboutApp'

	export default {
		data() {
			return {}
		},
		components: {
			settingsChangeDatabase,
			keyboardShortcuts,
			aboutApp
		}
	}
</script>
