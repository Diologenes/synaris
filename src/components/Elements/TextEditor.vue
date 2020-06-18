<template>
	<div ref="editor"></div>
</template>

<script>
	import Quill from 'quill'

	export default {
		data() {
			return {}
		},
		props: {
			content: String
		},
		watch: {
			content(newVal, oldVal) {
				if (this.quill) {
					if (newVal) {
						this.quill.pasteHTML(newVal)
					} else if (!newVal) {
						this.quill.setText('')
					}
				}
			}
		},
		mounted() {
			this.initEditor()
		},
		methods: {
			initEditor() {
				if (!this.$el) {
					return
				}

				var toolbarOptions = [
					['bold', 'italic', 'underline'], // toggled buttons
					['blockquote', 'code-block'],

					[{ header: 1 }, { header: 2 }], // custom button values
					[{ list: 'ordered' }, { list: 'bullet' }],
					[{ indent: '-1' }, { indent: '+1' }], // outdent/indent

					['clean'] // remove formatting button
				]

				const options = {
					// debug: 'info',
					modules: {
						toolbar: toolbarOptions
					},
					placeholder: 'Compose an epic...',
					readOnly: false,
					theme: 'snow'
				}

				this.quill = new Quill(this.$refs.editor, options)
				this.quill.enable(false)
				if (this.content) {
					this.quill.pasteHTML(this.content)
				}
				this.quill.enable(true)

				this.quill.on('selection-change', range => {
					if (!range) {
						this.$emit('blur', this.quill)
					} else {
						this.$emit('focus', this.quill)
					}
				})

				this.quill.on('text-change', (delta, oldDelta, source) => {
					let html = this.$refs.editor.children[0].innerHTML
					const quill = this.quill
					const text = this.quill.getText()
					if (html === '<p><br></p>') html = ''
					this._content = html
					this.$emit('input', this._content)
					this.$emit('change', { html, text, quill })
				})

				this.$emit('ready', this.quill)
			}
		},
		beforeDestroy() {
			this.quill = null
			delete this.quill
		}
	}
</script>