<template>
	<div v-click-outside="boxClose" class="c-panelbox c-contextmenu" :class="computedWrapperClass">

		<!-- prefix -->
		<div v-if="prefix" class="c-panelbox__prefix" @click="boxClick()" v-text="prefix"></div>

		<!-- item -->
		<div class="c-panelbox__item" :class="computedItemClass" @click="boxClick()" v-text="text"></div>

		<!-- contextmenu container (slot) -->
		<div v-if="hasDefaultSlot" class="c-contextmenu__container" :class="computedSlotClass">
			<div class="c-contextmenu__container-inner">
				<slot/>
			</div>
		</div>

		<!-- contextmenu container (list) -->
		<div v-if="options" class="c-contextmenu__container" :class="computedContextClass">
			<div class="c-contextmenu__container-inner">
				<ul class="c-contextmenu__list">
					<transition v-for="(option, key) in options" :key="key">
						<li v-if="option.type === 'route'" class="c-contextmenu__list-item" @click="itemClick(option)">
							<b-link router-tag="a" :to="option.route" :class="linkClasses(option)">{{ option.title }}</b-link>
						</li>
						<li v-if="option.type === 'method'" class="c-contextmenu__list-item" @click="itemClick(option)">
							<span :class="linkClasses(option)">{{ option.title }}</span>
						</li>
						<li v-if="option.type === 'divider'" class="c-contextmenu__list-item c-contextmenu__list-item--divider"></li>
					</transition>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			icon: String,
			clickable: Boolean,
			primary: Boolean,
			additionalClass: String,
			text: String,
			options: Array,
			size: String,
			contextSize: String,
			color: String,
			prefix: String,
			slotClass: String
		},
		data() {
			return {
				isFoldout: false
			}
		},
		computed: {

			// check if slot is used
			hasDefaultSlot() {
				return !!this.$slots.default
			},

			// wrapper class
			computedWrapperClass() {
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
				if (this.color) {
					cssClasses.push('c-panelbox--color-' + this.color)
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
			computedItemClass() {
				let cssClasses = []
				if (this.icon) {
					cssClasses.push('u-icon--' + this.icon)
				}
				if (cssClasses.length > 0) {
					return cssClasses.join(' ')
				} else {
					return ''
				}
			},

			// contextmenu class (not slot)
			computedContextClass() {
				let cssClasses = []
				if (this.contextSize) {
					cssClasses.push('c-contextmenu__container--size-' + this.contextSize)
				}
				if (cssClasses.length > 0) {
					return cssClasses.join(' ')
				} else {
					return ''
				}
			},

			// slot class
			computedSlotClass() {
				let cssClasses = []
				if (this.slotClass) {
					cssClasses.push(this.slotClass)
				}
				if (this.contextSize) {
					cssClasses.push('c-contextmenu__container--size-' + this.contextSize)
				}
				if (cssClasses.length > 0) {
					return cssClasses.join(' ')
				} else {
					return ''
				}
			}

		},
		methods: {

			// link classes
			linkClasses(option) {
				let cssClasses = []
				cssClasses.push('c-contextmenu__list-link')
				if (option.icon) {
					cssClasses.push('c-contextmenu__list-link--has-icon')
					cssClasses.push('u-icon--' + option.icon)
				}
				if (cssClasses.length > 0) {
					return cssClasses.join(' ')
				} else {
					return ''
				}
			},

			// on box clicked
			boxClick() {
				this.$emit('submit')
				if (this.options !== undefined && this.options.length || this.hasDefaultSlot) {
					this.isFoldout = !this.isFoldout
				}
			},

			// on box closed
			boxClose() {
				this.isFoldout = false
			},

			// on item in options clicked
			itemClick(option) {
				this.$emit('select', option)
				this.boxClose()
			}
		}
	}
</script>
