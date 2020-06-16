<template>
	<div class="c-layermenu__item">
		<div class="c-layermenu__link c-txt c-txt-text-tiny" @click="clickItem(value)">
			<div :class="iconClass"></div>
			<div class="c-layermenu__text">{{ title }}</div>
			<div class="c-layermenu__suffix">
				<form-radio :active="active" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String
		},
		group: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		},
		dispatchToStore: {
			type: String,
			default: ''
		}
	},
	computed: {
		iconClass() {
			if (this.icon) {
				return 'c-layermenu__icon u-icon--' + this.icon
			} else {
				return ''
			}
		},
		active() {
			if (this.group === this.value) {
				return true
			} else {
				return false
			}
		},
	},
	methods: {
		clickItem(value) {
			if (this.dispatchToStore !== '') {
				this.$store.dispatch(this.dispatchToStore, value)
			}
			this.$emit('select', value)
		}
	}
}
</script>
