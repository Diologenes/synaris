<template>
	<div class="c-page c-page__default">
		<div class="c-article-list">
			<div class="c-article-list__wrap">
				<!-- panel section -->
				<div class="c-panel-section">
					<div class="c-panel-section__title">asd</div>
				</div>
				<!-- panel section -->
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
	data() {
		return {
			articles: null
		}
	},
	methods: {
		init() {
			console.log(this.articles)
		}
	}
}
</script>
