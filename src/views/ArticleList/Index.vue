<template>
	<div class="c-page c-page__default">
		<div class="c-article-list">
			<div class="c-article-list__wrap" ref="resizerArticleList" :style="{ width: articleListWindowWidth }">
				<!-- panel section -->
				<div class="c-panel-section">
					<div class="c-panel-section__title">
						<span class="u-hash" v-if="category">{{ category.title }}</span>
					</div>
					<div class="c-panel-section__options">
						<panel-box :clickable="true" icon="filter">
							<panel-box-header title="Order by" />
							<panel-box-radio
								@select="getArticles"
								value="title"
								title="Title"
								icon="move"
								:group="filterOptionsOrderBy"
								dispatchToStore="settings/filterOrderBy"
							/>
							<panel-box-radio
								@select="getArticles"
								value="updatedAt"
								title="Recently modified"
								icon="move"
								:group="filterOptionsOrderBy"
								dispatchToStore="settings/filterOrderBy"
							/>
							<panel-box-radio
								@select="getArticles"
								value="visitedAt"
								title="Recently viewed"
								icon="move"
								:group="filterOptionsOrderBy"
								dispatchToStore="settings/filterOrderBy"
							/>
							<panel-box-divider />
							<panel-box-toggle
								@select="getArticles"
								title="Reverse order"
								icon="change"
								:active="filterOptionsReverseOrder"
								dispatchToStore="settings/filterReverseOrder"
							/>
							<panel-box-divider />
							<panel-box-header title="Show extra fields" />
							<panel-box-toggle title="Show date" icon="calendar" :active="filterOptionsShowDate" dispatchToStore="settings/filterShowDate" />
							<panel-box-toggle
								title="Show description"
								icon="text"
								:active="filterOptionsShowDescription"
								dispatchToStore="settings/filterShowDescription"
							/>
							<panel-box-toggle title="Show tags" icon="label" :active="filterOptionsShowTags" dispatchToStore="settings/filterShowTags" />
						</panel-box>
					</div>
				</div>
				<!-- panel section -->

				<search-bar :category="category" :articles="articles" />
				<loader :active="loading" />

				<!-- scrollbar -->
				<perfect-scrollbar id="articleListContent" class="c-article-list__content" v-if="!loading">
					<div :id="'articleId__' + article.id" v-for="article in articles" :key="article.id" class="c-article-list__item">
						<article-item
							@dragStart="dragStart"
							@dragEnd="dragEnd"
							@contextmenu="openContextMenu"
							:article="article"
							:showDate="filterOptionsShowDate"
							:showDescription="filterOptionsShowDescription"
							:showTags="filterOptionsShowTags"
						/>
					</div>
				</perfect-scrollbar>
				<!-- scrollbar -->

				<section-resizer :min="200" :max="1000" bindRef="resizerArticleList" dispatchToStore="settings/articleListWindowWidth" />
			</div>
		</div>

		<router-view />

		<modal-delete-article :item="contextObject" />
		<LayerMenu @select="contextArticleSelect" ref="layermenuArticle" :options="contextOptions" />
	</div>
</template>

<script>
	import searchBar from './SearchBar'
	import articleItem from './ArticleItem'
	import modalDeleteArticle from '@/components/Modals/DeleteArticle'
	import _ from 'lodash'

	export default {
		components: {
			searchBar,
			articleItem,
			modalDeleteArticle
		},
		computed: {
			category() {
				return this.$store.getters['collection/currentCategory']
			},
			currentArticle() {
				return this.$store.getters['article/currentArticle']
			},
			articles() {
				return this.$store.getters['article/articles']
			},
			articleListWindowWidth() {
				return this.$store.getters['settings/articleListWindowWidth']
			},
			filterOptionsShowDate() {
				return this.$store.getters['settings/filterShowDate']
			},
			filterOptionsShowDescription() {
				return this.$store.getters['settings/filterShowDescription']
			},
			filterOptionsShowTags() {
				return this.$store.getters['settings/filterShowTags']
			},
			filterOptionsOrderBy() {
				return this.$store.getters['settings/filterOrderBy']
			},
			filterOptionsReverseOrder() {
				return this.$store.getters['settings/filterReverseOrder']
			}
		},
		data() {
			return {
				loading: false,
				contextObject: null,
				contextOptions: []
			}
		},
		watch: {
			$route(to, from) {
				if (to.params.category !== from.params.category) {
					this.getArticles()
				}
			}
		},
		mounted() {
			this.getArticles()
		},
		methods: {
			// scroll to current article if set (e.g. coming from search route back to articleShow view)
			scrollToCurrentArticle() {
				let scrollableWrapper = document.querySelector('#articleListContent')
				if (scrollableWrapper && this.currentArticle !== null) {
					let activeElement = document.querySelector(`#articleId__${this.currentArticle.id}`)
					activeElement ? scrollableWrapper.scrollTo({ top: activeElement.offsetTop }) : false
				}
			},

			// get article list and current category if entering or modifying this route
			async getArticles(resetArticles = true) {
				let vm = this
				let promises = []
				let loadTimer = _.delay(function() {
					vm.loading = true
				}, 500)
				if (resetArticles) {
					vm.$store.dispatch('article/resetArticles')
				}
				await promises.push(vm.$store.dispatch('article/getByCategory', { category: vm.$route.params.category }))
				await promises.push(vm.$store.dispatch('collection/setCurrentCategoryById', vm.$route.params.category))
				Promise.all(promises).then(() => {
					clearTimeout(loadTimer)
					vm.loading = false
					this.scrollToCurrentArticle()
				})
			},

			// draging the article to categoryList view for reassigning the belonging category
			dragStart(article, $event) {
				window.EventBus.fire('method/categoryList', { method: 'showCategoryDropzones', arguments: [true, false, 'string'] })
				this.$refs.layermenuArticle.close()
				let payload = JSON.stringify({
					type: 'article',
					article: article
				})

				var ghostElement = document.createElement('p')
				ghostElement.classList.add('c-dnd__ghost')
				ghostElement.innerHTML = article.title
				document.body.appendChild(ghostElement)
				$event.dataTransfer.setDragImage(ghostElement, 0, 0)
				$event.dataTransfer.setData('draggedObject', payload)
			},

			// emit via eventbus to deactivate the active drag classes
			dragEnd() {
				window.EventBus.fire('method/categoryList', { method: 'hideCategoryDropzones' })
			},

			// opens the contextMenu with dynamic options
			openContextMenu($event, article) {
				let favouriteTitle = ''
				this.contextOptions = [{ special: 'divider' }, { method: 'delete', title: 'Delete ...', icon: 'delete' }]
				article.isFavourite ? (favouriteTitle = 'Remove from favorites') : (favouriteTitle = 'Add to favorites')
				this.contextOptions.unshift({ method: 'toggleFavourites', title: favouriteTitle, icon: 'star' })
				this.$refs.layermenuArticle.open($event, article)
			},

			// process click on contextMenu action
			contextArticleSelect(option) {
				let vm = this
				vm.contextObject = option.payload
				switch (option.method) {
					case 'toggleFavourites': {
						vm.toggleFavourites(vm.contextObject)
						break
					}
					case 'delete': {
						vm.$root.$emit('bv::show::modal', 'modal-delete-article')
						break
					}
				}
			},

			// toggles the favourites in article list view. saves the data to db
			toggleFavourites(article) {
				article.isFavourite = !article.isFavourite
				article.save({ silent: true, fields: ['isFavourite'] }).then(() => {
					this.getArticles(false)
				})
			}
		}
	}
</script>
