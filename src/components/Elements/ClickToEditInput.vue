<template>
	<div>
		<input ref="cteInput" :class="inputClasses" type="text" v-if="edit" :value="valueLocal" @blur="emitChange" @keyup.enter="emitChange" v-focus="" />
		<div :class="divClasses" v-if="!edit" @click="toggleEdit">
			{{ valueLocal }}
			<div :class="editButtonClasses" v-if="(typeof valueLocal === 'undefined' || valueLocal === null || valueLocal === '') && editButtonEnabled === true">
				{{ editButtonLabel }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				default: ''
			},
			selectOnClick: {
				type: Boolean,
				default: false
			},
			allowEmptyValue: {
				type: Boolean,
				default: true
			},
			editButtonEnabled: {
				type: Boolean,
				default: true
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
				valueLocal: this.value
			}
		},
		computed: {
			originalValue() {
				return this.value
			},
			inputClasses() {
				const classes = []
				classes.push('c-form__cte c-form__cte--edit-field c-form__cte--input')
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
		methods: {
			toggleEdit() {
				this.edit = !this.edit
				this.$nextTick(() => {
					if (this.edit) {
						this.selectOnClick ? this.$refs.cteInput.setSelectionRange(0, this.valueLocal.length) : this.$refs.cteInput.focus()
					}
				})
			},

			emitChange($event) {
				let newValue = $event.target.value
				if (newValue === '' && this.allowEmptyValue === false) newValue = this.originalValue
				this.valueLocal = newValue
				this.edit = false
				this.$emit('input', this.valueLocal, this.originalValue)
				if (this.valueLocal !== this.originalValue) {
					this.$emit('change', this.valueLocal)
				}
			}
		}
	}
</script>
