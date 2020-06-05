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
						<form-panel-box :options="filterOptions" :clickable="true" icon="filter" />
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
							<div class="c-article-list__title">{{ article.title }}</div>
							<div class="c-article-list__description">{{ article.description }}</div>
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
import modalDeleteArticle from '@/components/modals/DeleteArticle'
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
		}
	},
	data() {
		return {
			loading: false,
			contextObject: null,
			filterOptions: [
				{ type: 'header', title: 'Order by' },
				{
					type: 'radiogroup',
					method: 'changeFilterOptions',
					options: [
						{ title: 'Title', value: 'title', active: true },
						{ title: 'Recently updated', value: 'modifyDate', active: false },
						{ title: 'Recently viewed', value: 'lastVisit', active: false }
					]
				},
				{ type: 'divider' },
				{ type: 'toggle', method: 'changeFilterOptions', title: 'Reverse sorting', icon: 'move', active: false  },
				{ type: 'divider' },
				{ type: 'header', title: 'Show in results' },
				{ type: 'toggle', method: 'changeFilterOptions', title: 'Description', icon: 'text', active: true  },
				{ type: 'toggle', method: 'changeFilterOptions', title: 'Labels', icon: 'label', active: false  },
				{ type: 'toggle', method: 'changeFilterOptions', title: 'Date', icon: 'calendar', active: false  }
			]
		}
	},
	watch: {
		$route(to, from) {
			if (to.params.category !== from.params.category) {
				this.init()
			}
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		changeFilterOptions() {},

		async init() {
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
