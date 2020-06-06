<template>
	<div class="c-category__group">
		<!-- group title -->
		<div
			class="c-category__group-title"
			@click="collapseToggle()"
			@contextmenu.prevent="dispatchContextMenu($event, collection)"
			@dragover.prevent
			@dragstart="dragStart('collection', null, collectionIndex, collection, $event)"
			@drop="dragFinish(null, null, null, collectionIndex, $event)"
			@dragend="dragEnd()"
			draggable="true"
		>
			<div class="c-category__group-name">{{ collection.title }}</div>
			<div class="c-category__group-toggle u-icon--arrow-left" :class="{ 'c-category__group-toggle--is-collapsed': isCollapsed }"></div>
		</div>

		<div v-if="collection.categories.length === 0">
			<div class="c-category__dropzone c-category__dropzone--is-empty" @dragover.prevent @drop="dragFinish(null, null, 0, collectionIndex, $event)"></div>
		</div>
		<!-- group title -->

		<!-- group content -->
		<div class="c-category__group-content" :class="{ 'c-category__group-content--is-collapsed': isCollapsed }">
			<div class="c-category__item c-category__dropzone" v-for="(category, categoryIndex) in collection.categories" :key="category.id">
				<b-link
					@contextmenu.prevent="dispatchContextMenu($event, category)"
					@dragover.prevent
					@dragstart="dragStart('category', categoryIndex, collectionIndex, category, $event)"
					@dragend="dragEnd()"
					@drop="dragFinish(category, collection, categoryIndex, collectionIndex, $event)"
					draggable="true"
					router-tag="a"
					:to="{ name: 'articleList', params: { category: category.id } }"
					class="c-category__link"
					active-class="c-category__link--is-active"
				>
					<div class="c-category__link-title" :title="category.title">{{ category.title }}</div>
					<div class="c-category__link-indicator">
						<div class="c-panelbox">
							<div class="c-panelbox__item">{{ category.dataValues.articleCount }}</div>
						</div>
					</div>
				</b-link>
			</div>
		</div>
		<!-- group content -->
	</div>
</template>

<script>
export default {
	props: {
		collection: {
			type: Object,
			default: null
		},
		collectionIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			collectionCollapsed: false
		}
	},
	computed: {
		isCollapsed: {
			get() {
				return this.$store.getters['settings/collapsedCollections'].includes(this.collection.id) ? true : false
			}
		}
	},
	methods: {
		collapseToggle() {
			this.$store.dispatch('settings/modifyCollapsedCollection', this.collection.id)
		},

		dragStart(...parameters) {
			this.$emit('dragStart', ...parameters)
		},

		dragEnd() {
			this.$emit('dragEnd')
		},

		dragFinish(...parameters) {
			this.$emit('dragFinish', ...parameters)
		},

		dispatchContextMenu(...parameters) {
			this.$emit('contextmenu', ...parameters)
		}
	}
}
</script>