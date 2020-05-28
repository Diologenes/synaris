<template>
	<div class="c-layermenu" :class="{ 'c-layermenu--is-active': isVisible }" ref="popper" tabindex="-1" v-click-outside="close" @contextmenu.capture.prevent>
		<slot></slot>
	</div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import ClickOutside from 'vue-click-outside'

export default {
	props: {
		boundariesElement: {
			type: String,
			default: 'body'
		}
	}, 
	data() {
		return {
			opened: false,
			contextData: {}
		} 
	},
	directives: {
		ClickOutside
	},
	computed: {
		isVisible() {
			return this.opened
		}
	},
	methods: {
		open(evt, contextData) {
			let vm = this
			let popperReference = vm.$refs.popper

			this.opened = true
			this.contextData = contextData

			const virtualReference = {
				getBoundingClientRect() {
					return {
						top: evt.clientY,
						left: evt.clientX,
						bottom: 1,
						right: 1,
						width: 1,
						height: 1
					}
				}
			}

			createPopper(virtualReference, popperReference, {
				placement: 'right-start',
				strategy: 'fixed'
			})
		},
		close() {
			this.opened = false
			this.contextData = null
		}
	}
}
</script>
