<template>
	<div class="c-prominent-message" :class="wrapperClass" v-if="active">
		<div class="c-prominent-message__icon" :class="iconClass" v-if="icon"></div>
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
			iconSize: {
				type: String,
				default: ''
			},
			className: {
				type: String,
				default: ''
			},
			hasBorder: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			iconClass() {
				let classArray = []
				classArray.push('u-icon')
				if (this.icon) {
					classArray.push(`u-icon--${this.icon}`)
				}
				if (this.iconSize) {
					classArray.push(`c-prominent-message__icon--${this.iconSize}`)
				}
				return classArray.join(' ')
			},
			wrapperClass() {
				let classArray = []
				if (this.hasBorder) {
					classArray.push('c-prominent-message--has-border')
				}
				if (this.className) {
					classArray.push(this.className)
				}
				return classArray.join(' ')
			}
		}
	}
</script>
