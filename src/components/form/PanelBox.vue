<template>
	<div v-click-outside="boxClose" class="c-panelbox c-contextmenu" :class="wrapperClasses">
		<!-- prefix -->
		<div v-if="prefix" class="c-panelbox__prefix" @click="boxClick()" v-text="prefix"></div>

		<!-- item -->
		<div class="c-panelbox__item" :class="panelClasses" @click="boxClick()" v-text="text"></div>

		<!-- contextmenu container (slot) -->
		<div v-if="hasDefaultSlot" class="c-contextmenu__container" :class="slotClasses">
			<div class="c-contextmenu__container-inner">
				<slot />
			</div>
		</div>

		<!-- contextmenu new -->
		<div class="c-layermenu" :class="{ 'c-layermenu--is-active': isFoldout, 'c-layermenu--is-foldout': isFoldout }" ref="popper" tabindex="-1">
			<ul class="c-layermenu__wrap">
				<transition v-for="(option, key) in options" :key="key">
					<!-- header -->
					<li v-if="option.type === 'header'" class="layermenu__item">
						<span class="c-layermenu__group"><span v-if="option.icon" :class="itemIcon(option)"></span>{{ option.title }}</span>
					</li>
					<!-- divider -->
					<li v-if="option.type === 'divider'" class="c-layermenu__divider"></li>

					<!-- method -->
					<li v-if="option.type === 'method'" class="c-layermenu__item" @click="select(option)">
						<span class="c-layermenu__link"><span v-if="option.icon" :class="itemIcon(option)"></span>{{ option.title }}</span>
					</li>

					<!-- radiogroup -->
					<span v-if="option.type === 'radiogroup'">
						<transition v-for="(option, optionIndex) in option.options" :key="optionIndex">
							<li class="c-layermenu__item" @click="select(option)">
								<span class="c-layermenu__link">
									<span v-if="option.icon" :class="itemIcon(option)"></span>
									<span class="c-layermenu__text">{{ option.title }}</span>
									<span class="c-layermenu__suffix">
										<span class="c-radio">
											<span class="c-radio__pin" :class="{'c-radio__pin--is-active': option.active}"></span>
										</span>
									</span>
								</span>
							</li>
						</transition>
					</span>

				<!-- toggle -->
					<span v-if="option.type === 'toggle'">
						<li class="c-layermenu__item" @click="select(option)">
								<span class="c-layermenu__link">
									<span v-if="option.icon" :class="itemIcon(option)"></span>
									<span class="c-layermenu__text">{{ option.title }}</span>
									<span class="c-layermenu__suffix">
										<span class="c-toggle">
											<span class="c-toggle__pin" :class="{'c-toggle__pin--is-active': option.active}"></span>
										</span>
									</span>
								</span>
							</li>
					</span>

				</transition>
			</ul>
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
		},

		// slot class
		slotClasses() {
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
		itemIcon(option) {
			if (typeof option.icon !== 'undefined') {
				return 'c-layermenu__icon u-icon--' + option.icon
			}
		},

		// on box clicked
		boxClick() {
			this.$emit('submit')
			if ((this.options !== undefined && this.options.length) || this.hasDefaultSlot) {
				this.isFoldout = !this.isFoldout
			}
		},

		// on box closed
		boxClose() {
			this.isFoldout = false
		},

		// on item in options clicked
		select(option) {
			this.$emit('select', option)
			this.boxClose()
		}
	}
}
</script>
