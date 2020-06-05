<template>
	<div ref="panelBox" v-click-outside="close" class="c-panelbox c-contextmenu" :class="wrapperClasses">
		<!-- prefix -->
		<div v-if="prefix" class="c-panelbox__prefix" @click="click()" v-text="prefix"></div>

		<!-- item -->
		<div class="c-panelbox__item" :class="panelClasses" @mouseenter="debouncedCancelClose" @click="click()" v-text="text"></div>

		<!-- slot / layermenu -->
		<div @mouseleave="debouncedClose" @mouseenter="debouncedCancelClose" v-if="hasDefaultSlot" class="c-layermenu" :class="{ 'c-layermenu--is-active': isFoldout, 'c-layermenu--is-foldout': isFoldout }" ref="popper" tabindex="-1">
			<div class="c-layermenu__wrap">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
	props: {
		icon: String,
		clickable: Boolean,
		primary: Boolean,
		additionalClass: String,
		text: String,
		size: String,
		prefix: String,
		slotClass: String,
		boundariesElement: {
			type: String,
			default: 'body'
		}
	},
	data() {
		return {
			isFoldout: false,
			closeTimer: null
		}
	},
	directives: {
		ClickOutside
	},
	computed: {
		// check if slot is used
		hasDefaultSlot() {
			return !!this.$slots.default
		},

		// wrapper class
		wrapperClasses() {
			let cssClasses = []
			if (this.additionalClass) {
				cssClasses.push(this.additionalClass)
			}
			if (this.isFoldout) {
				cssClasses.push('c-contextmenu--active active')
			}
			if (this.prefix) {
				cssClasses.push('c-panelbox--has-prefix')
			}
			if (this.size) {
				cssClasses.push('c-panelbox--size-' + this.size)
			}
			if (this.primary) {
				cssClasses.push('c-panelbox--primary')
			}
			if (this.clickable) {
				cssClasses.push('c-panelbox--clickable')
			}
			if (cssClasses.length > 0) {
				return cssClasses.join(' ')
			} else {
				return ''
			}
		},

		// item class
		panelClasses() {
			let cssClasses = []
			if (this.icon) {
				cssClasses.push('u-icon--' + this.icon)
			}
			if (cssClasses.length > 0) {
				return cssClasses.join(' ')
			} else {
				return ''
			}
		}
	},
	mounted() {
		EventBus.listen('panelBoxClose', () => {
			this.close()
		})
	},
	methods: {
		itemIcon(option) {
			if (typeof option.icon !== 'undefined') {
				return 'c-layermenu__icon u-icon--' + option.icon
			}
		},

		// on box clicked
		click() {
			if (this.clickable) {
				this.$emit('submit')
				if (this.hasDefaultSlot) {
					this.isFoldout = !this.isFoldout
				}
			}
		},

		// on box closed
		close() {
			this.isFoldout = false
		},

		debouncedClose() {
			let vm = this
			this.closeTimer = setTimeout(function() {
				vm.close()
			}, 500)
		},

		debouncedCancelClose() {
			clearTimeout(this.closeTimer)
		}
	}
}
</script>
