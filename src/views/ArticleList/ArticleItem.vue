<template>
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
		<div v-if="showDate" class="c-article-list__date">
			{{ article.updatedAt | formatDate('DateTime') }} <span class="c-article-list__date--low-opacity">({{ article.updatedAt | formatDate('fromNow') }})</span>
		</div>
		<div class="c-article-list__title">{{ article.title }}</div>
		<div v-if="showDescription" class="c-article-list__description">{{ article.description }}</div>
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
	},
	methods: {
		dragStart(...parameters) {
			this.$emit('dragStart', ...parameters)
		},
		dragEnd(...parameters) {
			this.$emit('dragEnd', ...parameters)
		}
	}
}
</script>
