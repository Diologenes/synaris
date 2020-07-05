<template>
	<div class="c-page c-page__default">
		<div class="c-article-show" v-if="article">
			<div class="c-article-show__header">
				<div class="c-article-show__meta">
					<div class="row">
						<div class="col">
							<div class="c-article-show__date">{{ article.updatedAt | formatDate('DateTime') }} ({{ article.updatedAt | formatDate('fromNow') }})</div>
							<div class="c-article-show__title">
								<click-to-edit-input :allowEmptyValue="false" @change="saveTitle" v-model.trim="article.title" />
							</div>
						</div>
						<div class="col-auto">
							<panel-box :clickable="true" icon="menu">
								<panel-box-link title="Add to favorites" />
								<panel-box-link title="Create a copy" />
								<panel-box-divider />
								<panel-box-link title="Delete ..." />
							</panel-box>
						</div>
					</div>

					<div class="c-article-show__description" v-if="editDescription || (article.description !== '' && article.description !== null)">
						<click-to-edit-textarea  @blur="editDescription = false" @change="saveDescription" v-model="article.description" :active="editDescription" />
					</div>
					
					<div class="row">
						<div class="col-auto" v-if="!article.description"><span class="u-icon--m-r u-icon--edit c-txt-text-small c-link"  @click="editDescription = true">Add description</span></div>
						<div class="col" v-if="!article.tags"><span class="u-icon--m-r u-icon--label c-txt-text-small c-link" @click="editTags = true">Add tags</span></div>
					</div>

				</div>

				<div class="c-article-show__tags" v-if="editTags || (article.tags && article.tags.length > 0)">
					<tag-list @blur="editTags = false" @change="saveTags($event)" :value="article.tags" :active="editTags" />
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
				editTags: false,
				editDescription: false
			}
		},
		computed: {
			category() {
				return this.$store.getters['collection/currentCategory']
			},
			article() {
				return this.$store.getters['article/currentArticle']
			},
			articleTags() {
				if (this.article && this.article.tags) {
					return this.article.tags.split(',')
				} else {
					return []
				}
			}
		},
		watch: {
			$route(to, from) {
				if (to.params.article !== from.params.article) {
					this.getArticle()
					this.editTags = false
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

			saveTitle() {
				this.dispatchArticle().then(() => {
					this.$store.dispatch('article/getByCategory', { category: this.category.id })
				})
			},

			saveDescription() {
				this.dispatchArticle().then(() => {
					this.$store.dispatch('article/getByCategory', { category: this.category.id })
				})
			},

			saveTags(tags) {
				this.article.tags = tags
				this.dispatchArticle().then(() => {
					this.$store.dispatch('article/getByCategory', { category: this.category.id })
				})
			},

			saveContent: _.debounce(function(params) {
				this.article.content = params.html
				this.dispatchArticle()
			}, 1000),

			async dispatchArticle() {
				this.article.isPrototype = null
				this.$store.dispatch('article/setCurrentArticle', this.article).then(response => ({ response }))
			}
		}
	}
</script>
