<template>
	<div>
		<input :class="inputClasses" type="text" v-if="edit" :value="valueLocal" @blur="change" @keyup.enter="change" v-focus="" />
		<div :class="divClasses" v-else="" @click="edit = true">
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
				classes.push('c-form__input c-form__input--inherit-style c-form__input--transparent')
				if (this.inputClass) {
					classes.push(this.inputClass)
				}
				return classes.join(' ')
			},
			divClasses() {
				const classes = []
				classes.push('c-form__click-to-edit')
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
			change($event) {
				let newValue = $event.target.value
				if (newValue === '' && this.allowEmptyValue === false) newValue = this.originalValue
				this.valueLocal = newValue
				this.edit = false
				this.$emit('input', this.valueLocal, this.originalValue)
			}
		}
	}
</script>
