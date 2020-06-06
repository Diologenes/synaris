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
							<panel-box-radio @select="getArticles" value="title" title="Title" icon="move" :group="filterOptionsOrderBy" dispatchToStore="settings/filterOrderBy" />
							<panel-box-radio @select="getArticles" value="updatedAt" title="Recently modified" icon="move" :group="filterOptionsOrderBy" dispatchToStore="settings/filterOrderBy" />
							<panel-box-radio @select="getArticles" value="visitedAt" title="Recently viewed" icon="move" :group="filterOptionsOrderBy" dispatchToStore="settings/filterOrderBy" />
							<panel-box-divider />
							<panel-box-toggle @select="getArticles" title="Reverse order" icon="change" :active="filterOptionsReverseOrder" dispatchToStore="settings/filterReverseOrder" />
							<panel-box-divider />
							<panel-box-header title="Show extra fields" />
							<panel-box-toggle title="Show date" icon="calendar" :active="filterOptionsShowDate" dispatchToStore="settings/filterShowDate" />
							<panel-box-toggle title="Show description" icon="text" :active="filterOptionsShowDescription" dispatchToStore="settings/filterShowDescription" />
						</panel-box>
					</div>
				</div>
				<!-- panel section -->

				<search-bar :category="category" :articles="articles" />
				<loader :active="loading" />

				<!-- scrollbar -->
				<perfect-scrollbar class="c-article-list__content" v-if="!loading">
					<div v-for="article in articles" :key="article.id" class="c-article-list__item">
						<b-link
							@contextmenu.prevent="$refs.layermenuArticle.open($event, article)"
							@dragover.prevent
							@dragstart="dragStart(article, $event)"
							@dragend="dragEnd($event)"
							draggable="true"
							router-tag="a"
							:to="{ name: 'articleShow', params: { article: article.id } }"
							class="c-article-list__link"
							active-class="c-article-list__link--is-active"
						>
							<div v-if="filterOptionsShowDate" class="c-article-list__date">
								{{ article.updatedAt | formatDate('DateTime') }} <span class="c-article-list__date--low-opacity">({{ article.updatedAt | formatDate('fromNow') }})</span>
							</div>
							<div class="c-article-list__title">{{ article.title }}</div>
							<div v-if="filterOptionsShowDescription" class="c-article-list__description">{{ article.description }}</div>
						</b-link>
					</div>
				</perfect-scrollbar>
				<!-- scrollbar -->

				<section-resizer :min="200" :max="1000" bindRef="resizerArticleList" dispatchToStore="settings/articleListWindowWidth" />
			</div>
		</div>

		<router-view />

		<modal-delete-article :item="contextObject" />
		<LayerMenu @select="contextArticleSelect" ref="layermenuArticle" :options="[{ method: 'delete', title: 'Delete ...', icon: 'delete' }]" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import searchBar from './SearchBar'
import modalDeleteArticle from '@/components/Modals/DeleteArticle'
import _ from 'lodash'

export default {
	components: {
		searchBar,
		modalDeleteArticle
	},
	computed: {
		category() {
			return this.$store.getters['collection/currentCategory']
		},
		articles() {
			return this.$store.getters['article/articles']
		},
		articleListWindowWidth() {
			return this.$store.getters['settings/articleListWindowWidth']
		},
		filterOptionsShowDescription() {
			return this.$store.getters['settings/filterShowDescription']
		},
		filterOptionsShowDate() {
			return this.$store.getters['settings/filterShowDate']
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
			contextObject: null
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
		async getArticles() {
			let vm = this
			let loadTimer = _.delay(function() {
				vm.loading = true
			}, 500)
			let promises = []
			vm.$store.dispatch('article/resetArticles')
			await promises.push(vm.$store.dispatch('article/getByCategory', { category: vm.$route.params.category }))
			await promises.push(vm.$store.dispatch('collection/setCurrentCategoryById', vm.$route.params.category))
			Promise.all(promises).then(() => {
				clearTimeout(loadTimer)
				vm.loading = false
			})
		},

		dragStart(article, $event) {
			EventBus.fire('method/categoryList', { method: 'showCategoryDropzones', arguments: [true, false, 'string'] })
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

		dragEnd($event) {
			EventBus.fire('method/categoryList', { method: 'hideCategoryDropzones' })
		},

		contextArticleSelect(option) {
			console.log('contextArticleSelect')
			let vm = this
			vm.contextObject = option.payload
			switch (option.method) {
				case 'delete':
					vm.$root.$emit('bv::show::modal', 'modal-delete-article')
					break
			}
		}
	}
}
</script>
