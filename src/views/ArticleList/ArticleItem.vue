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
		:class="{ 'c-article-list__link--is-favourite': isFavourite }"
		active-class="c-article-list__link--is-active"
	>
		<div v-if="isFavourite" class="c-article-list__favourite-badge u-icon--star"></div>
		<div v-if="showDate" class="c-article-list__date">
			{{ article.updatedAt | formatDate('DateTime') }} <span class="c-article-list__date-ago">({{ article.updatedAt | formatDate('fromNow') }})</span> <span v-if="isNew" class="c-badge u-m__lr--2">New</span>
		</div>
		<div class="c-article-list__title">{{ article.title }}</div>
		<div v-if="showDescription" class="c-article-list__description">{{ article.description }}</div>
		<div v-if="showTags && tags.length > 0" class="c-article-list__tags c-tag">
			<span class="c-tag__item" v-for="tag in tags" :key="tag">{{ tag | textCrop(25) }}</span>
		</div>
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
	computed: {
		markNewUntilDays() {
			return this.$store.getters['settings/markNewUntilDays']
		},
		isNew() {
			if (this.$options.filters.formatDate(this.article.createdAt, 'dayDiff') <= this.markNewUntilDays) {
				return true
			}
			return false
		},
		isFavourite() {
			if (this.article.isFavourite === 1) {
				return true
			}
			return false
		},
		tags() {
			if (this.article.tags !== null) {
				return this.article.tags.split(',')
			} 
			return []
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
