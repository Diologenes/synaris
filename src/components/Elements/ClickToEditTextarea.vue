<template>
	<div>
		<textarea ref="cteTextarea" :style="textAreaStyle" :class="inputClasses" v-show="edit" :value="valueLocal" @keydown.enter="emitChange" @blur="emitChange"></textarea>
		<div :class="divClasses" v-if="!edit" @click="toggleEdit">
			{{ valueLocal }}
			<div
				style="white-space: pre;"
				:class="editButtonClasses"
				v-if="(typeof valueLocal === 'undefined' || valueLocal === null || valueLocal === '') && editButtonEnabled === true"
			>
				{{ editButtonLabel }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			active: {
				type: Boolean,
				default: false
			},
			value: {
				type: String,
				default: ''
			},
			nullOnEmpty: {
				type: Boolean,
				default: true
			},
			minHeight: {
				type: String,
				default: '5rem'
			},
			maxHeight: {
				type: String,
				default: '20rem'
			},
			allowEmptyValue: {
				type: Boolean,
				default: true
			},
			editButtonEnabled: {
				type: Boolean,
				default: false
			},
			editButtonLabel: {
				type: String,
				default: 'Edit'
			},
			editButtonClass: {
				type: String,
				default: ''
			},
			editButtonIcon: {
				type: String,
				default: ''
			},
			inputClass: {
				type: String,
				default: ''
			},
			divClass: {
				type: String,
				default: ''
			}
		},

		data() {
			return {
				edit: false,
				valueLocal: this.value,
				textAreaStyle: {
					minHeight: this.minHeight,
					maxHeight: this.maxHeight,
					overflow: 'hidden',
					resize: 'none'
				}
			}
		},
		computed: {
			originalValue() {
				return this.value
			},
			inputClasses() {
				const classes = []
				classes.push('c-form__cte c-form__cte--edit-field c-form__cte--textarea')
				if (this.inputClass) {
					classes.push(this.inputClass)
				}
				return classes.join(' ')
			},
			divClasses() {
				const classes = []
				classes.push('c-form__cte c-form__cte--text')
				if (this.divClass) {
					classes.push(this.divClass)
				}
				return classes.join(' ')
			},
			editButtonClasses() {
				const classes = []
				if (this.editButtonClass) {
					classes.push(this.editButtonClass)
				}
				if (this.editButtonIcon) {
					classes.push(`u-icon--${this.editButtonIcon}`)
				}
				return classes.join(' ')
			}
		},
		watch: {
			active(newValue) {
				if (newValue) {
					this.edit = true
					this.focusInput()
				}
			},
			value: function() {
				this.valueLocal = this.value
			}
		},

		directives: {
			focus: {
				inserted(el) {
					el.focus()
				}
			}
		},
		mounted() {
			if (this.active) {
				this.edit = true
				this.focusInput()
			}
		},
		methods: {
			focusInput() {
				this.$nextTick(() => {
					this.$refs.cteTextarea.focus()
				})
			},

			toggleEdit() {
				this.edit = !this.edit
				this.$nextTick(() => {
					if (this.edit) this.$refs.cteTextarea.focus()
				})
			},

			emitChange($event) {
				let newValue = $event.target.value.trim()
				if (newValue === '' && this.nullOnEmpty) newValue = null
				if ((newValue === null || newValue === '') && this.allowEmptyValue === false) newValue = this.originalValue
				this.valueLocal = newValue
				this.edit = false
				this.$emit('input', this.valueLocal)
				if (this.valueLocal !== this.originalValue) {
					this.$emit('change', this.valueLocal)
				}
				this.$emit('blur')
				$event.preventDefault()
			}
		}
	}
</script>
