<template>
	<div class="c-page c-page__default">
		<div class="c-article-show" v-if="article">
			<div class="c-article-show__header">
				<div class="c-article-show__date">{{ article.updatedAt | formatDate('DateTime') }} ({{ article.updatedAt | formatDate('fromNow') }})</div>

				<div class="c-article-show__title">
					<click-to-edit-input :selectOnClick="true" :allowEmptyValue="false" @change="saveTitle" v-model.trim="article.title" />
				</div>

				<div class="c-article-show__description">
					<click-to-edit-textarea :selectOnClick="true" editButtonLabel="Add description" editButtonIcon="edit" @change="saveDescription" v-model="article.description" />
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
				enableDescriptionField: false
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

			saveTitle: _.debounce(function() {
				this.dispatchArticle().then(() => {
					this.$store.dispatch('article/getByCategory', { category: this.category.id })
				})
			}, 10),

			saveDescription: _.debounce(function() {
				this.dispatchArticle().then(() => {
					this.$store.dispatch('article/getByCategory', { category: this.category.id })
				})
			}, 10),

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
