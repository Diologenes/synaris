<template>
	<div class="c-layermenu__item">
		<div class="c-layermenu__link" @click="clickItem(value)">
			<div :class="iconClass"></div>
			<div class="c-layermenu__text">{{ title }}</div>
			<div class="c-layermenu__suffix">
				<div class="c-radio">
					<div class="c-radio__pin" :class="{ 'c-radio__pin--is-active': active }"></div>
				</div>
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
