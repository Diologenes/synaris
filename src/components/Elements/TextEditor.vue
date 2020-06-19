<template>
	<div ref="editor"></div>
</template>

<script>
	import Quill from 'quill'
	import PerfectScrollbar from 'perfect-scrollbar'

	export default {
		data() {
			return {
				// eslint-disable-next-line vue/no-reserved-keys
				_content: '',
				perfectScrollbar: null
			}
		},
		props: {
			content: String
		},
		watch: {
			content(newVal) {
				if (this.quill) {
					if (newVal && newVal !== this._content) {
						this._content = newVal
						this.quill.pasteHTML(newVal)
					} else if (!newVal) {
						this.quill.setText('')
					}
					this.perfectScrollbar.update()
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
					readOnly: false,
					theme: 'snow'
				}

				this.quill = new Quill(this.$refs.editor, options)
				this.quill.enable(false)
				if (this.content) {
					this.quill.pasteHTML(this.content)
				}
				this.quill.enable(true)

				this.perfectScrollbar = new PerfectScrollbar(document.querySelector('.ql-container'))

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
					if (quill.getLength() > 131072) {
						quill.deleteText(131050, quill.getLength())
						window.EventBus.fire('notification', { title: 'Warning', variant: 'danger', msg: 'Max. article length reached. Content will be cropped!' })
					}
					if (html === '<p><br></p>') html = ''
					this._content = html
					this.$emit('input', this._content)
					this.$emit('change', { html, quill })
				})

				this.$emit('ready', this.quill)
			}
		},
		beforeDestroy() {
			this.perfectScrollbar.destroy()
			this.perfectScrollbar = null
			this.quill = null
			delete this.quill
		}
	}
</script>
