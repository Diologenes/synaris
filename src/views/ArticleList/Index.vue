<template>
	<div class="c-page c-page__default">
		<div class="c-article-list">
			<div class="c-article-list__wrap" ref="resizerArticleList" :style="{ width: articleListWindowWidth }">
				<!-- panel section -->
				<header-panel
					@change="getResult"
					:category="category"
					:filterOptionsOrderBy="filterOptionsOrderBy"
					:filterOptionsReverseOrder="filterOptionsReverseOrder"
					:filterOptionsShowDate="filterOptionsShowDate"
					:filterOptionsShowDescription="filterOptionsShowDescription"
					:filterOptionsShowTags="filterOptionsShowTags"
				/>
				<!-- panel section -->

				<search-bar :category="category" :articles="articles" />
				<loader :active="loading" />

				<!-- if no articles -->
				<div class="c-article-list__no-content" v-if="!loading && articles && articles.length === 0">
					<prominent-message :active="true" :hasBorder="false" title="No articles found" icon="note" iconSize="sm" />
				</div>
				<!-- if no articles -->

				<!-- scrollbar -->
				<perfect-scrollbar id="articleListContent" class="c-article-list__content" v-if="!loading && articles && articles.length > 0">
					<div :id="'articleId__' + article.id" v-for="article in articles" :key="article.id" class="c-article-list__item">
						<b-link
							@contextmenu.prevent="openContextMenu($event, article)"
							@dragover.prevent
							@dragstart="dragStart(article, $event)"
							@dragend="dragEnd($event)"
							draggable="true"
							router-tag="a"
							:to="{ name: 'articleShow', params: { article: article.id } }"
							class="c-article-list__link"
							active-class="c-article-list__link--is-active"
						>
							<article-content
								:article="article"
								:showDate="filterOptionsShowDate"
								:showDescription="filterOptionsShowDescription"
								:showTags="filterOptionsShowTags"
								:showFavouriteBadge="true"
							/>
						</b-link>
					</div>
				</perfect-scrollbar>
				<!-- scrollbar -->

				<!--  create new article button -->
				<div class="c-create-button c-button c-button--primary c-button--bullseye u-icon--more" @click="createArticle"></div>

				<section-resizer :min="200" :max="1000" bindRef="resizerArticleList" dispatchToStore="settings/articleListWindowWidth" />
			</div>
		</div>

		<router-view />

		<modal-delete-article :item="contextObject" />
		<LayerMenu @select="contextArticleSelect" ref="layermenuArticle" :options="contextOptions" />
	</div>
</template>

<script>
	import { mapGetters as vuexStore } from 'vuex'
	import searchBar from './SearchBar'
	import headerPanel from './HeaderPanel'
	import modalDeleteArticle from '@/components/Modals/DeleteArticle'
	import _ from 'lodash'

	export default {
		components: {
			searchBar,
			headerPanel,
			modalDeleteArticle
		},
		computed: {
			...vuexStore({
				category: 'collection/currentCategory',
				currentArticle: 'article/currentArticle',
				articles: 'article/articles',
				articleListWindowWidth: 'settings/articleListWindowWidth',
				filterOptionsShowDate: 'settings/filterShowDate',
				filterOptionsShowDescription: 'settings/filterShowDescription',
				filterOptionsShowTags: 'settings/filterShowTags',
				filterOptionsOrderBy: 'settings/filterOrderBy',
				filterOptionsReverseOrder: 'settings/filterReverseOrder'
			})
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
					this.activateFirstOnMounted()
				}
			}
		},
		mounted() {
			this.activateFirstOnMounted()
		},
		methods: {
			// scroll to current article if set (e.g. coming from search route back to articleShow view)
			scrollToActiveArticle() {
				let scrollableWrapper = document.querySelector('#articleListContent')
				if (scrollableWrapper && this.currentArticle !== null) {
					let activeElement = document.querySelector(`#articleId__${this.currentArticle.id}`)
					activeElement ? scrollableWrapper.scrollTo({ top: activeElement.offsetTop }) : false
				}
			},

			activateFirstOnMounted() {
				this.getResult().then(() => {
					if (this.articles.length > 0 && this.$route.params.redirectToFirstMatch === true) {
						if (parseInt(this.$route.params.article) !== this.articles[0].id) {
							this.$router.push({ name: 'articleShow', params: { article: this.articles[0].id } })
						}
					}
				})
			},

			// get article list and current category if entering or modifying this route
			async getResult(resetArticles = false, scrollToActiveArticle = true) {
				let vm = this
				let loadTimer = _.delay(function() {
					vm.loading = true
				}, 500)
				if (resetArticles) vm.$store.dispatch('article/resetArticles')
				let articles = await vm.$store.dispatch('article/getByCategory', { category: vm.$route.params.category })
				await vm.$store.dispatch('collection/setCurrentCategoryById', vm.$route.params.category)
				clearTimeout(loadTimer)
				vm.loading = false
				scrollToActiveArticle ? this.scrollToActiveArticle() : false
				return new Promise(resolve => {
					resolve(articles)
				})
			},

			// create new article
			async createArticle() {
				let newArticle = await this.$store.dispatch('article/addArticle', this.category.id)
				await this.$store.dispatch('collection/getAll')
				await this.getResult(false, true)
				this.$router.push({ path: `/categories/${this.category.id}/${newArticle.id}` })
			},

			// draging the article to categoryList view for reassigning the belonging category
			dragStart(article, $event) {
				window.EventBus.fire('method/categoryList', { method: 'showCategoryDropzones', arguments: [true, false, 'string'] })
				this.$refs.layermenuArticle.close()
				let payload = JSON.stringify({
					type: 'article',
					article: article
				})

				let ghostElement = document.createElement('p')
				ghostElement.classList.add('c-dnd__ghost')
				ghostElement.innerHTML = article.title
				document.body.appendChild(ghostElement)
				$event.dataTransfer.setDragImage(ghostElement, 0, 0)
				$event.dataTransfer.setData('draggedObject', payload)
			},

			// emit via eventbus to deactivate the active drag classes
			dragEnd() {
				window.EventBus.fire('method/categoryList', { method: 'hideCategoryDropzones' })
				let elem = document.querySelector('.c-dnd__ghost')
				elem.parentNode.removeChild(elem)
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
					this.getResult(false, false)
				})
			}
		}
	}
</script>
