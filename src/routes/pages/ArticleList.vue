<template>
	<div class="c-page c-page__default">
		<div class="c-article-list">
			<div class="c-article-list__wrap" ref="resizerArticleList" :style="{ width: articleListWindowWidth }">
				<!-- panel section -->
				<div class="c-panel-section">
					<div class="c-panel-section__title">TYPO3</div>
				</div>
				<!-- panel section -->

				<!-- filter section -->
				<div class="c-panel-filter">
					<div class="c-panel-filter__wrap">
						<input v-model="filter" @keyup="filterArticles" :class="{ 'c-panel-filter__input--is-active': isFilter }" class="c-panel-filter__input" type="text" placeholder="Filter articles ..." />
						<div :class="{ 'c-panel-filter__close--is-active': isFilter }" class="c-panel-filter__close"><button @click="deleteFilter" class="u-icon--close"></button></div>
					</div>
				</div>
				<!-- filter section -->

				<!-- scrollbar -->
				<perfect-scrollbar class="c-article-list__content">
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
import modalDeleteArticle from '@/components/modals/DeleteArticle'
import _ from 'lodash'

export default {
	components: {
		modalDeleteArticle
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.$store.dispatch('article/getByCategory', { category: to.params.category }).then((response) => {
				vm.$store.dispatch('collection/setCurrentCategoryById', to.params.category)
				next()
			})
		})
	},
	beforeRouteUpdate(to, from, next) {
		let vm = this
		vm.$store.dispatch('article/getByCategory', { category: to.params.category }).then((response) => {
			vm.$store.dispatch('collection/setCurrentCategoryById', to.params.category)
			next()
		})
	},
	computed: {
		articles: {
			get() {
				return this.$store.getters['article/articles']
			}
		},
		articleListWindowWidth: {
			get() {
				return this.$store.getters['settings/articleListWindowWidth']
			}
		},
		filter: {
			get() {
				return this.$store.getters['article/searchWord']
			},
			set(value) {
				this.$store.dispatch('article/setSearchWord', value)
			}
		},
		isFilter() {
			if (this.filter.length > 0) {
				return true
			} else {
				return false
			}
		}
	},
	data() {
		return {
			contextObject: null
		}
	},
	methods: {
		filterArticles: _.debounce(function() {
			this.$store.dispatch('article/getByCategory', { category: this.$route.params.category })
		}, 400),

		deleteFilter() {
			this.$store.dispatch('article/setSearchWord', '')
			this.filterArticles()
		},

		dragStart(article, $event) {
			this.$parent.showCategoryDropzones(true)
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
			this.$parent.hideCategoryDropzones()
		},

		contextArticleSelect(option) {
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
