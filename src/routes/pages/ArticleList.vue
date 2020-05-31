<template>
	<div class="c-page c-page__default">
		<div class="c-article-list">
			<div class="c-article-list__wrap">
				<!-- panel section -->
				<div class="c-panel-section">
					<div class="c-panel-section__title">TYPO3</div>
				</div>
				<!-- panel section -->

				<!-- filter section -->
				<div class="c-panel-filter">
					<div class="c-panel-filter__wrap">
						<input v-model="filter" :class="{ 'c-panel-filter__input--is-active': isFilter }" class="c-panel-filter__input" type="text" placeholder="Filter articles ..." />
						<div :class="{ 'c-panel-filter__close--is-active': isFilter }" class="c-panel-filter__close"><button @click="deleteFilter" class="u-icon--close"></button></div>
					</div>
				</div>
				<!-- filter section -->

				<!-- scrollbar -->
				<perfect-scrollbar class="c-article-list__content">
					<div v-for="article in articles" :key="article.id" class="c-article-list__item">
						<a href="#" class="c-article-list__link" @contextmenu.prevent="$refs.layermenuArticle.open($event, article)">
							<div class="c-article-list__title">{{ article.title }}</div>
							<div class="c-article-list__description">{{ article.description }}</div>
						</a>
					</div>
				</perfect-scrollbar>
				<!-- scrollbar -->
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

export default {
	components: {
		modalDeleteArticle
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.$store.dispatch('article/getByCategory', { category: to.params.category })
			next()
		})
	},
	beforeRouteUpdate(to, from, next) {
		let vm = this
		vm.$store.dispatch('article/getByCategory', { category: to.params.category }).then(() => {
			next()
		})
	},
	computed: {
		articles: {
			get() {
				return this.$store.getters['article/articles']
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
			filter: '',
			contextObject: null
		}
	},
	methods: {
		deleteFilter() {
			this.filter = ''
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
