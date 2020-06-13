<template>
	<div class="c-page c-page__default c-page__view--search c-search" :class="{ 'c-search--is-active': hasSearchWords }">
		<div class="c-search__searchbox">
			<div class="c-search__headline">
				Search for something ...
			</div>
			<input ref="globalSearch" v-model="searchWord" @keyup="keypress()" class="c-search__input" type="text" />
		</div>

		<perfect-scrollbar class="c-search__result" :class="{ 'c-search__result--no-result': hasResults === false }">
			<prominent-message
				:active="query.result.length === 0 && query.loading === false"
				title="No results found"
				description="Maybe you should try something else"
				icon="info"
				className="c-search__prominent-message"
			/>
			<div class="c-search__items" v-if="query.result.length > 0 && query.loading === false">
				<div class="c-search__item" v-for="(result, index) in query.result" :key="index">
					<b-link :to="{ path: 'categories/' + result.categoryId + '/' + result.id }" class="c-search__link">
						<div class="c-search__box">
							<article-content :article="result" />
						</div>
					</b-link>
				</div>
			</div>
		</perfect-scrollbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: {
					foldout: false
				},
				query: {
					result: [],
					timer: null,
					loading: true
				}
			}
		},
		computed: {
			result() {
				return this.$store.getters['search/result']
			},
			hasSearchWords() {
				if (this.searchWord.length > 0) {
					return true
				}
				return false
			},
			hasResults() {
				if (this.result && this.result.length > 0) {
					return true
				}
				return false
			},
			searchWord: {
				get() {
					let value = this.$store.getters['search/searchWord']
					return value
				},
				set(value) {
					this.$store.dispatch('search/setSearchWord', value)
				}
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.query.result = []
				vm.query.loading = true
				vm.getResult(true)
			})
		},
		mounted() {
			this.focusInput()
		},
		methods: {
			focusInput() {
				this.$refs.globalSearch.focus()
			},

			keypress() {
				this.submitSearchWord()
				this.query.loading = true
			},

			submitSearchWord: _.debounce(function() {
				this.searchWord.length > 0 ? (this.show.foldout = true) : ((this.show.foldout = false), (this.query.result = []))
				this.getResult()
			}, 250),

			getResult(noDelay = false) {
				let vm = this
				let delay = noDelay === true ? 0 : 500
				clearTimeout(vm.query.timer)
				if (vm.searchWord.length === 0) {
					vm.query.result = []
					return
				}
				vm.$store.dispatch('search/getResult').then(result => {
					vm.query.timer = setTimeout(() => {
						vm.query.result = result
						vm.query.loading = false
					}, delay)
				})
			}
		}
	}
</script>
