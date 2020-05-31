<template>
	<div :class="styling" @mouseenter="enter()" @mouseleave="leave()" @mousedown="down()" @mouseup="up()" @mousemove="move($event)" v-click-outside="up"></div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
	props: {
		bindRef: {
			type: String,
			required: true
		},
		direction: {
			type: String,
			required: false,
			default: 'horizontal'
		},
		defaultCssClass: {
			type: String,
			required: false,
			default: 'c-resize'
		},
		min: {
			type: Number,
			default: 10,
			required: false
		},
		max: {
			type: Number,
			default: 600,
			required: false
		},
		dispatchToStore: {
			type: String,
			required: false
		}
	},
	directives: {
		ClickOutside
	},
	computed: {
		styling() {
			let classPrefix = this.defaultCssClass
			let classes = []
			classes.push(classPrefix)
			classes.push(classPrefix + '--' + this.direction)
			if (this.enabled) {
				classes.push(classPrefix + '--is-active')
			}
			if (this.hover) {
				classes.push(classPrefix + '--is-hover')
			}
			return classes.join(' ')
		}
	},
	data() {
		return {
			enabled: false,
			hover: false,
			bindedElement: null,
			calculatedDimension: '0px'
		}
	},
	mounted() {
		this.bindedElement = this.$parent.$refs[this.bindRef]
	},
	methods: {
		enter() {
			this.hover = true
		},
		leave() {
			this.hover = false
		},
		down() {
			this.enabled = true
		},
		up() {
			if (this.enabled) {
				this.hover = false
				this.enabled = false
				this.$emit('value', this.calculatedDimension)
				if (typeof this.dispatchToStore !== 'undefined') {
					console.log('to store: ', this.dispatchToStore, this.calculatedDimension)
					this.$store.dispatch(this.dispatchToStore, this.calculatedDimension)
				}
			}
		},
		move($event) {
			if (this.enabled) {
				if (this.direction === 'horizontal') {
					this.calculatedDimension = this.calculateDimension($event.clientX, this.bindedElement.offsetLeft)
					this.bindedElement.style.width = this.calculatedDimension
				}
			}
		},
		calculateDimension(currentPos, offset) {
			let dimension = currentPos - offset
			if (dimension <= this.min) {
				dimension = this.min
			}
			if (dimension >= this.max) {
				dimension = this.max
			}
			return dimension + 'px'
		}
	}
}
</script>
