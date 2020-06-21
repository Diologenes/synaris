<template>
	<div :id="'fieldwrap-' + hash" class="c-form__fieldwrap c-form__fieldwrap--input" :class="computedWrapperClass">
		<label class="c-form__label" :class="{ 'is-mandatory': isMandatory }" :for="hash" v-if="label" v-html="computedLabel"></label>

		<div
			v-click-outside="boxClose"
			class="c-panelbox c-panelbox--color-dark c-panelbox--size-large c-panelbox--has-prefix c-panelbox--clickable c-contextmenu"
			:class="{ 'c-contextmenu--active active': isFoldout }"
		>
			<div class="c-panelbox__prefix c-panelbox__prefix--size-md " @click="boxClick()" v-text="selectedLabel"></div>
			<div class="c-panelbox__item u-icon--burger" @click="boxClick()"></div>
			<div v-if="options" class="c-contextmenu__container">
				<div class="c-contextmenu__container-inner">
					<ul class="c-contextmenu__list">
						<perfect-scrollbar class="c-contextmenu__scrollbar">
							<transition v-for="(option, key) in options" :key="key">
								<li class="c-contextmenu__list-item c-contextmenu__list-link" @click="itemClick(option, key)">
									{{ option[optionLabelField] }}
									<span class="c-contextmenu__list-tooltip u-icon--info" v-if="option.tooltip" v-b-tooltip.hover :title="option.tooltip"></span>
								</li>
							</transition>
						</perfect-scrollbar>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ClickOutside from 'vue-click-outside'

	export default {
		props: {
			options: Array,
			optionLabelField: {
				type: String,
				default: 'label'
			},
			optionValueField: {
				type: String,
				default: 'value'
			},
			selected: String | Number,
			label: String,
			errorMessage: String,
			errorBag: Object | Array,
			isMandatory: Boolean,
			wrapperClass: String,
			disabled: Boolean
		},
		directives: {
			ClickOutside
		},
		data() {
			return {
				isFoldout: false,
				selectedLabel: ''
			}
		},

		watch: {
			selected(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.getSelected()
				}
			}
		},

		computed: {
			computedWrapperClass() {
				let classArray = []
				if (this.errorBag !== undefined) {
					if (this.errorBag !== null && this.errorBag !== '') {
						classArray.push('error')
					}
				}
				if (this.wrapperClass !== undefined) {
					classArray.push(this.wrapperClass)
				}
				if (classArray.length) {
					return classArray.join(' ')
				} else {
					return ''
				}
			},

			computedLabel() {
				if (this.errorMessage !== undefined && this.errorBag !== undefined) {
					if (this.errorBag !== '' && this.errorBag !== null) {
						return this.label + ' <span>(' + this.errorMessage + ')</span>'
					} else {
						return this.label
					}
				} else {
					return this.label
				}
			},

			hash() {
				return Math.random()
					.toString(36)
					.substring(2)
			}
		},

		mounted() {
			this.getSelected()
		},

		methods: {
			getSelected() {
				if (this.selected === undefined) {
					this.selectedLabel = this.options[0][this.optionLabelField]
					this.$emit('input', this.options[0]) // emitting for v-model
				} else {
					let selectedOption = _.find(this.options, { [this.optionValueField]: this.selected })
					this.selectedLabel = selectedOption[this.optionLabelField]
					this.$emit('input', selectedOption) // emitting for v-model
				}
			},

			// on box clicked
			boxClick() {
				if (this.options !== 'undefined' && this.options.length && this.disabled === false) {
					this.isFoldout = !this.isFoldout
				}
			},

			// on box close
			boxClose() {
				this.isFoldout = false
			},

			// on item in options clicked
			itemClick(option, key) {
				this.selectedLabel = option[this.optionLabelField]
				this.$emit('input', option) // emitting for v-model
				this.$emit('change', option, key)
				this.boxClose()
			}
		}
	}
</script>
