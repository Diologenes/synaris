<template>
	<div class="c-layermenu__item">
		<div class="c-layermenu__link c-txt c-txt-text-tiny" @click="clickItem()">
			<div :class="iconClass"></div>
			<div class="c-layermenu__text">{{ title }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			icon: {
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
			clickItem() {
				this.$emit('select')
			}
		}
	}
</script>
