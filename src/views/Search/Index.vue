<template>
	<div class="c-page c-page__default c-page__view--search">
		<div class="c-search__search" :class="{ 'c-search__search--is-foldout': !show.result }">
			<div class="c-search__title" :class="{ 'c-search__title--is-active': !show.result }">
				Search for something ...
			</div>
			<input ref="globalSearch" v-model="query.search" @keyup="keypress()" class="c-search__input" type="text" />
		</div>

		<div :class="{ 'c-search__result--is-foldout': show.result }" class="c-search__result">
			<div class="container-fluid">
				<div class="row">
					<div class="c-search__item col col-2" v-for="(result, index) in query.result" :key="index">
						<div class="c-search__box">
							<article-content :article="result" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: {
					result: false,
					preview: false
				},

				query: {
					search: '',
					isStarted: false,
					result: []
				}
			}
		},
		computed: {
			result() {
				return this.$store.getters['search/result']
			},
			searchword() {
				return this.$store.getters['search/searchword']
			}
		},
		mounted() {
			this.focusInput()
		},
		methods: {
			focusInput() {
				this.$refs.globalSearch.focus()
			},

			async keypress() {
				let vm = this
				if (vm.query.search.length > 0) {
					vm.query.isStarted = true
					vm.show.result = true
				} else {
					vm.query.isStarted = false
					vm.show.result = false
				}

				await vm.$store.dispatch('search/setSearchWord', vm.query.search)
				vm.$store.dispatch('search/getResult').then(result => {
					vm.query.result = result
				})
			}
		}
	}
</script>
