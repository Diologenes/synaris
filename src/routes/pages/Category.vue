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
			</div>
		</div>

		<router-view />
	</div>
</template>

<script>
export default {
	components: {},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			next()
			vm.$db.Article.findAll({
				where: {
					categoryId: to.params.category
				},
				order: [['title', 'ASC']]
			}).then((response) => {
				vm.articles = response
			})
		})
	},
	beforeRouteUpdate(to, from, next) {
		let vm = this
		vm.$db.Article.findAll({
			where: {
				categoryId: to.params.category
			},
			order: [['title', 'ASC']]
		}).then((response) => {
			vm.articles = response
		})
		next()
	},
	mounted() {
		this.init()
	},
	computed: {
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
			articles: null,
			filter: ''
		}
	},
	methods: {
		init() {
			console.log(this.articles)
		},

		deleteFilter() {
			this.filter = ''
		}
	}
}
</script>
