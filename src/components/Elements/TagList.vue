<template>
	<div class="c-tag-list">
		<div class="c-tag-list__tags">
			<div class="c-tag">
				<div class="c-tag__item c-tag__item--clickable c-tag__item--editable" v-for="(tag, index) in tags" :key="index">
					{{ tag }} <span @click="removeTag(index)">XXXX</span>
				</div>
			</div>
		</div>
		<div class="c-tag-list__form">
			<input type="text" v-model.trim="tag" @keypress.prevent.stop.enter="addTag" />
		</div>
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
			addTag() {
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
