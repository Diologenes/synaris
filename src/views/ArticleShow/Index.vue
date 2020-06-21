<template>
	<div class="c-page c-page__default">
		<div class="c-article-show" v-if="article">
			<div class="c-article-show__header">
				<div class="c-article-show__date">{{ article.updatedAt | formatDate('DateTime') }} ({{ article.updatedAt | formatDate('fromNow') }})</div>

				<div class="c-article-show__title">
					<click-to-edit @input="saveTitle" v-model.trim="article.title" />
				</div>

				<div contenteditable ref="articleDescriptionField" class="c-article-show__description" @input="saveDescription">
					{{ article.description }}
				</div>
			</div>

			<div class="c-article-show__content">
				<text-editor @change="saveContent" :content="article.content" />
			</div>
		</div>
	</div>
</template>

<script>
	import textEditor from '@/components/Elements/TextEditor'
	import _ from 'lodash'

	export default {
		components: {
			textEditor
		},
		data() {
			return {
				enableDescriptionField: false,
			}
		},
		computed: {
			category() {
				return this.$store.getters['collection/currentCategory']
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
		},
		methods: {
			async getArticle() {
				await this.$store.dispatch('article/setCurrentArticleById', this.$route.params.article)
			},

			saveDescription: _.debounce(function($event) {
				let description = $event.target.innerText
				description.length === 0 ? (this.enableDescriptionField = false) : (this.enableDescriptionField = true)
				if (this.article.description === description) {
					return
				}
				this.article.description = description
				this.dispatchArticle().then(() => {
					this.$store.dispatch('article/getByCategory', { category: this.category.id })
				})
				$event.preventDefault()
			}, 1000),

			saveTitle: _.debounce(function() {
				this.dispatchArticle().then(() => {
					this.$store.dispatch('article/getByCategory', { category: this.category.id })
				})
			}, 1000),

			saveContent: _.debounce(function(params) {
				this.article.content = params.html
				this.dispatchArticle()
			}, 1000),

			async dispatchArticle() {
				this.$store.dispatch('article/setCurrentArticle', this.article).then(response => ({ response }))
			}
		}
	}
</script>
