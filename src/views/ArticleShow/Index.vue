<template>
	<div class="c-page c-page__default">
		<div class="c-article-show" v-if="article">
			<div class="c-article-show__header">
				<div class="c-article-show__date">{{ article.updatedAt | formatDate('DateTime') }} ({{ article.updatedAt | formatDate('fromNow') }})</div>
				<div contenteditable class="c-article-show__title">{{ article.title }}</div>
				<div contenteditable class="c-article-show__description">{{ article.description }}</div>
			</div>

			<div class="c-article-show__content">
				<text-editor @change="saveChanges" :content="article.content" />
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
			return {}
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
		},
		methods: {
			async getArticle() {
				await this.$store.dispatch('article/setCurrentArticleById', this.$route.params.article)
			},

			saveChanges: _.debounce(function(params) {
				this.article.content = params.html
				this.$store.dispatch('article/setCurrentArticle', this.article)
			}, 1000)
		}
	}
</script>
