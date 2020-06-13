<template>
	<div class="c-prominent-message" :class="wrapperClass" v-if="active">
		<div class="c-prominent-message__icon" :class="iconClass"></div>
		<div class="c-prominent-message__title" v-if="title">{{ title }}</div>
		<div class="c-prominent-message__description" v-if="description">{{ description }}</div>
	</div>
</template>

<script>
	export default {
		props: {
			active: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			description: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			},
			className: {
				type: String,
				default: ''
			}
		},
		computed: {
			iconClass() {
				if (this.icon) {
					return `u-icon u-icon--${this.icon}`
				}
				return ''
			},
			wrapperClass() {
				if (this.className) {
					return this.className
				}
				return ''
			}
		}
	}
</script>
