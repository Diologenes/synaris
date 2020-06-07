<template>
	<b-link
		@contextmenu.prevent="dispatchContextMenu($event, article)"
		@dragover.prevent
		@dragstart="dragStart(article, $event)"
		@dragend="dragEnd($event)"
		draggable="true"
		router-tag="a"
		:to="{ name: 'articleShow', params: { article: article.id } }"
		class="c-article-list__link"
		active-class="c-article-list__link--is-active"
	>
		<article-content :article="article" :showDate="showDate" :showDescription="showDescription" :showTags="showTags" :showFavouriteBadge="true" />
	</b-link>
</template>

<script>
export default {
	props: {
		article: {
			type: Object,
			default: null
		},
		showDate: {
			type: Boolean,
			default: true
		},
		showDescription: {
			type: Boolean,
			default: true
		},
		showTags: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		dragStart(...parameters) {
			this.$emit('dragStart', ...parameters)
		},

		dragEnd(...parameters) {
			this.$emit('dragEnd', ...parameters)
		},

		dispatchContextMenu(...parameters) {
			this.$emit('contextmenu', ...parameters)
		}
	}
}
</script>
