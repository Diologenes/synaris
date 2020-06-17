<template>
	<div class="c-page c-page__default">
		<div class="c-article-show">
			<div id="editor">{{ article.content }}</div>
		</div>
	</div>
</template>

<script>
	import Quill from 'quill'

	export default {
		data() {
			return {
				editor: null
			}
		},
		computed: {
			category() {
				return this.$store.getters['article/currentCategory']
			},
			article() {
				return this.$store.getters['article/currentArticle']
			}
		},
		watch: {
			$route(to, from) {
				if (to.params.article !== from.params.article) {
					this.getArticle()
				}
			}
		},
		mounted() {
			this.getArticle()
			this.initEditor()
		},
		methods: {
			async getArticle() {
				await this.$store.dispatch('article/setCurrentArticle', this.$route.params.article)
			},

			initEditor() {
				var toolbarOptions = [
					['bold', 'italic', 'underline', 'strike'], // toggled buttons
					['blockquote', 'code-block'],

					[{ header: 1 }, { header: 2 }], // custom button values
					[{ list: 'ordered' }, { list: 'bullet' }],
					[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
					[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
					[{ direction: 'rtl' }], // text direction

					[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
					[{ header: [1, 2, 3, 4, 5, 6, false] }],

					[{ color: [] }, { background: [] }], // dropdown with defaults from theme
					[{ font: [] }],
					[{ align: [] }],

					['clean'] // remove formatting button
				]

				const options = {
					debug: 'info',
					modules: {
						toolbar: toolbarOptions
					},
					placeholder: 'Compose an epic...',
					readOnly: false,
					theme: 'snow'
				}

				this.editor = new Quill(document.getElementById('editor'), options)
			}
		}
	}
</script>
