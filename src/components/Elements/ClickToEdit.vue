<template>
	<div>
		<input :class="inputClasses" type="text" v-if="edit" :value="valueLocal" @blur="change" @keyup.enter="change" v-focus="" />
		<div :class="divClasses" v-else="" @click="edit = true">{{ valueLocal }}</div>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
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
				if (this.divClass) {
					classes.push(this.divClass)
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
				if (newValue === '') newValue = this.originalValue
				this.valueLocal = newValue
				this.edit = false
				this.$emit('input', this.valueLocal, this.originalValue)
			}
		}
	}
</script>
