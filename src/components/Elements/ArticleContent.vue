<template>
	<div>
		<div v-if="isFavourite && showFavouriteBadge" class="c-article-list__favourite-badge u-icon--star"></div>
		<div v-if="showDate" class="c-article-list__date c-txt c-txt-text-tiny-alt">
			{{ article.updatedAt | formatDate('DateTime') }} <span class="c-article-list__date-ago">({{ article.updatedAt | formatDate('fromNow') }})</span> <span v-if="isNew" class="c-badge u-m__lr--2">New</span>
		</div>
		<div class="c-article-list__title c-txt c-txt-text-regular">{{ article.title }}</div>
		<div v-if="showDescription" class="c-article-list__description c-txt c-txt-text-small">{{ article.description | textCrop(200) }}</div>
		<div v-if="showTags && tags.length > 0" class="c-article-list__tags c-tag">
			<span class="c-tag__item" v-for="tag in tags" :key="tag">{{ tag | textCrop(25) }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		article: {
			type: Object,
			default: null
		},
		showFavouriteBadge: {
			type: Boolean,
			default: false
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
			if (this.article.isFavourite === true) {
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
	}
}
</script>
