<template>
	<div class="c-page c-page__default">
		<div class="c-article-show">
			Article here!
		</div>
	</div>
</template>

<script>
	export default {
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
				let vm = this
				vm.$store.dispatch('article/setCurrentArticle', vm.$route.params.article)
			}
		}
	}
</script>
