<template>
	<div class="c-tag-list">
		<div class="c-tag-list__tags">
			<div class="c-tag">
				<div class="c-tag__item c-tag__item--clickable c-tag__item--editable" v-for="(tag, index) in tags" :key="index">
					<span>{{ tag }}</span> <span @click="removeTag(index)" class=" c-tag__item-close u-icon--close"></span>
				</div>
				<input
					ref="tagInput"
					style="text-transform: uppercase"
					class="c-tag-list__form"
					:class="{'c-tag-list__form--active': isFocused}"
					placeholder="Add tag ..."
					type="text"
					v-model.trim="tag"
					@focus="isFocused = true"
					@blur="blurInput"
					@keyup="sanitizeCharacters"
					@keypress.prevent.stop.enter="addTag"
				/>
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
			}
		},

		data() {
			return {
				tag: '',
				tags: this.value !== null ? this.value.split(',') : [],
				isFocused: false
			}
		},
		watch: {
			active(newValue) {
				if (newValue) {
					this.focusInput()
				}
			},
			value() {
				if (this.value === '' || this.value === null) {
					this.tags = []
				} else {
					this.tags = this.value.split(',')
				}
			}
		},
		mounted() {
			if (this.active) {
				this.focusInput()
			}
		},
		methods: {
			blurInput() {
				this.isFocused = false
				this.$emit('blur', false)
			},

			focusInput() {
				this.$nextTick(() => {
					this.$refs.tagInput.focus()
				})
			},

			sanitizeCharacters() {
				this.tag = this.tag
					.replace(/,/g, '.')
					.replace(/ /g, '-')
					.toUpperCase()
			},

			addTag() {
				if (this.tag === '' || this.tag.length <= 1 || this.tags.includes(this.tag)) return
				this.tags.push(this.tag)
				this.tag = ''
				this.changeEmitter()
			},

			removeTag(index) {
				this.tags.splice(index, 1)
				this.changeEmitter()
			},

			changeEmitter() {
				this.$emit('change', this.tagsToString())
			},

			tagsToString() {
				if (this.tags === null || this.tags === '' || this.tags.length === 0) {
					return null
				} else {
					return this.tags.join(',')
				}
			}
		}
	}
</script>
