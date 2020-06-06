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
		<div v-if="showDate" class="c-article-list__date">
			{{ article.updatedAt | formatDate('DateTime') }} <span class="c-article-list__date-ago">({{ article.updatedAt | formatDate('fromNow') }})</span> <span v-if="isNew" class="c-badge u-m__lr--2">New</span>
		</div>
		<div class="c-article-list__title">{{ article.title }}</div>
		<div v-if="showDescription" class="c-article-list__description">{{ article.description }}</div>
	</b-link>
</template>

<script>
import { mapGetters } from 'vuex'

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
		}
	},
	computed: {
		markNewUntilDays() {
			return this.$store.getters['settings/markNewUntilDays']
		},

		isNew() {
			if (this.$options.filters.formatDate(this.article.updatedAt, 'dayDiff') <= this.markNewUntilDays) {
				return true
			}
			return false
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
