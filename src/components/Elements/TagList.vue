<template>
	<div class="c-tag-list">
		<div class="c-tag-list__tags" v-show="tags.length > 0 || edit">
			<div class="c-tag">
				<div class="c-tag__item c-tag__item--clickable c-tag__item--editable" v-for="(tag, index) in tags" :key="index">
					<span>{{ tag }}</span> <span @click="removeTag(index)" class=" c-tag__item-close u-icon--close"></span>
				</div>
				<input
					ref="tagInput"
					style="text-transform: uppercase"
					class="c-tag-list__form"
					placeholder="Add tag ..."
					type="text"
					v-model.trim="tag"
					@blur="toggleActivation"
					@keyup="sanitizeCharacters"
					@keypress.prevent.stop.enter="addTag"
				/>
			</div>
		</div>
		<div class="c-link--pointer" @click="toggleActivation()" v-if="!edit && tags.length === 0"><span class="u-icon u-icon--label"> Add tags</span></div>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				default: ''
			}
		},

		data() {
			return {
				edit: false,
				tag: '',
				tags: this.value !== null ? this.value.split(',') : []
			}
		},
		watch: {
			value() {
				if (this.value === '' || this.value === null) {
					this.tags = []
				} else {
					this.tags = this.value.split(',')
				}
			}
		},

		methods: {
			toggleActivation() {
				this.edit = !this.edit
				if (this.edit) {
					this.$nextTick(() => {
						this.$refs.tagInput.focus()
					})
				}
			},

			sanitizeCharacters() {
				this.tag = this.tag.split(' ').join('-').toUpperCase()
			},

			addTag() {
				if (this.tag === '' || this.tags.includes(this.tag)) return
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
