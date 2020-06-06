<template>
	<div class="c-panel-filter">
		<div class="c-panel-filter__wrap">
			<input ref="searchbarInput" v-model="filter" @keyup.esc="restore" @keyup="submit" :class="{ 'c-panel-filter__input--is-active': isFilter }" class="c-panel-filter__input" type="text" placeholder="Filter articles ..." />
			<div :class="{ 'c-panel-filter__close--is-active': isFilter }" class="c-panel-filter__close"><button @click="restore" class="u-icon--close"></button></div>
		</div>
		<div class="c-panel-filter__status" :class="{ 'c-panel-filter__status--is-active': isFilter }">
			<span v-if="articles">
				<span v-if="articles.length > 0">{{ articles.length }} matches found</span>
				<span v-if="articles.length === 0">No matches found</span>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
        category: {
            type: Object,
            default: null
        },
        articles: {
            type: Array,
            default: []
        }
    },
	computed: {
		filter: {
			get() {
				return this.$store.getters['article/searchWord']
			},
			set(value) {
				this.$store.dispatch('article/setSearchWord', value)
			}
		},
		isFilter() {
			return this.filter.length ? true : false
		}
	},
	methods: {
		submit: _.debounce(function() {
			this.$store.dispatch('article/getByCategory', { category: this.category.id })
		}, 400),

		restore() {
			this.$refs.searchbarInput.blur()
			this.$store.dispatch('article/setSearchWord', '')
			this.submit()
		}
	}
}
</script>
