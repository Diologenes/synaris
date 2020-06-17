<template>
	<div class="c-layermenu" :class="{ 'c-layermenu--is-active': isVisible }" ref="popper" tabindex="-1" v-click-outside="close" @contextmenu.capture.prevent>
		<ul class="c-layermenu__wrap">
			<transition v-for="(option, key) in options" :key="key">
				<li v-if="typeof option.method !== 'undefined'" class="c-layermenu__item" @click="select(option)">
					<span class="c-layermenu__link c-txt c-txt-text-tiny"><span v-if="option.icon" :class="itemIcon(option)"></span>{{ option.title }}</span>
				</li>
				<li v-if="option.special === 'divider'" class="c-layermenu__divider"></li>
			</transition>
		</ul>
	</div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import ClickOutside from 'vue-click-outside'

export default {
	props: {
		options: Array,
		boundariesElement: {
			type: String,
			default: 'body'
		}
	},
	data() {
		return {
			opened: false,
			payload: null
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
		open($event, payload = null) {
			this.opened = true
			this.payload = payload

			const virtualReference = {
				getBoundingClientRect() {
					return {
						top: $event.clientY,
						left: $event.clientX,
						bottom: 1,
						right: 1,
						width: 1,
						height: 1
					}
				}
			}

			createPopper(virtualReference, this.$refs.popper, {
				placement: 'right-start',
				strategy: 'fixed'
			})
		},

		close() {
			this.opened = false
			this.payload = null
		},

		itemIcon(option) {
			if (typeof option.icon !== 'undefined') {
				return 'c-layermenu__icon u-icon--' + option.icon
			}
		},

		select(option) {
			option['payload'] = this.payload
			this.$emit('select', option)
			this.close()
		}
	}
}
</script>
