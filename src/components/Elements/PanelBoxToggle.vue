<template>
	<div class="c-layermenu__item">
		<div class="c-layermenu__link c-txt c-txt-text-tiny" @click="clickItem(active)">
			<div :class="iconClass"></div>
			<div class="c-layermenu__text">{{ title }}</div>
			<div class="c-layermenu__suffix">
				<form-toggle :active="active" />
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
		active: {
			type: Boolean,
			default: false
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
		}
	},
	methods: {
		clickItem(value) {
			value = !value
			if (this.dispatchToStore !== '') {
				this.$store.dispatch(this.dispatchToStore, value)
			}
			this.$emit('select', value)
		}
	}
}
</script>
