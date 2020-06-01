<template>
	<div class="c-page c-page__default">
		<div class="c-category">
			<div class="c-category__wrap" ref="resizerCategory" :style="{ width: categoryWindowWidth }">
				<!-- panel section -->
				<div class="c-panel-section">
					<div class="c-panel-section__title">Categories</div>
				</div>
				<!-- panel section -->

				<!-- scrollbar -->
				<perfect-scrollbar class="c-category__content">
					<!-- group item -->
					<div v-for="(collection, collectionIndex) in collections" :key="collection.id" class="c-category__group">
						<!-- group title -->
						<div
							class="c-category__group-title"
							@contextmenu.prevent="$refs.layermenuCategory.open($event, collection)"
							@dragover.prevent
							@dragstart="dragStart('collection', null, collectionIndex, $event)"
							@drop="dragFinish(null, null, null, collectionIndex, $event)"
							@dragend="dragEnd()"
							draggable="true"
						>
							{{ collection.title }}
						</div>

						<div v-if="collection.categories.length === 0">
							<div class="c-category__dropzone c-category__dropzone--is-empty" @dragover.prevent @drop="dragFinish(0, collectionIndex)"></div>
						</div>
						<!-- group title -->

						<!-- group content -->
						<div class="c-category__group-content">
							<div class="c-category__item c-category__dropzone" v-for="(category, categoryIndex) in collection.categories" :key="category.id">
								<b-link
									@contextmenu.prevent="$refs.layermenuCategory.open($event, category)"
									@dragover.prevent
									@dragstart="dragStart('category', categoryIndex, collectionIndex, $event)"
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
					<!-- group item -->
				</perfect-scrollbar>

				<!-- scrollbar -->

				<div v-b-modal.modal-create-new-category class="c-create-button c-button c-button--primary c-button--bullseye u-icon--more"></div>
				<section-resizer :min="200" :max="1000" bindRef="resizerCategory" dispatchToStore="settings/categoryWindowWidth" />
			</div>
		</div>

		<router-view />
		<modal-add-category />
		<modal-delete-category :item="contextObject" />
		<modal-rename-category :item="contextObject" />
		<LayerMenu
			@select="contextCategorySelect"
			ref="layermenuCategory"
			:options="[
				{ method: 'rename', title: 'Rename ...', icon: 'edit' },
				{ method: 'delete', title: 'Delete ...', icon: 'delete' }
			]"
		/>
	</div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import modalAddCategory from '@/components/modals/AddCategory'
import modalDeleteCategory from '@/components/modals/DeleteCategory'
import modalRenameCategory from '@/components/modals/RenameCategory'

export default {
	components: {
		modalAddCategory,
		modalDeleteCategory,
		modalRenameCategory
	},
	data() {
		return {
			contextObject: null
		}
	},
	computed: {
		collections: {
			get() {
				return this.$store.getters['collection/collections']
			}
		},
		categoryWindowWidth: {
			get() {
				return this.$store.getters['settings/categoryWindowWidth']
			}
		}
	},
	mounted() {
		this.$store.dispatch('collection/getAll')
	},
	methods: {
		showCategoryDropzones: _.debounce((ignoreEmptyDropzones = false) => {
			const identifierClass = 'c-category__dropzone'
			const activeClass = 'c-category__dropzone--is-active'
			let items = []
			if (ignoreEmptyDropzones) {
				items = window.document.querySelectorAll('.' + identifierClass + ':not(.c-category__dropzone--is-empty)')
			} else {
				items = window.document.getElementsByClassName(identifierClass)
			}
			items.forEach((element) => {
				element.classList.add(activeClass)
			})
		}, 30),
		hideCategoryDropzones() {
			const identifierClass = 'c-category__dropzone'
			const activeClass = 'c-category__dropzone--is-active'
			let items = window.document.getElementsByClassName(identifierClass)
			items.forEach((element) => {
				element.classList.remove(activeClass)
			})
		},

		dragStart(type, categoryIndex, collectionIndex, $event) {
			// close layermenu if opened
			this.$refs.layermenuCategory.close()

			// define payload and dataTransfer
			let payload = JSON.stringify({
				type: type,
				categoryIndex: categoryIndex,
				collectionIndex: collectionIndex
			})
			$event.dataTransfer.setData('draggedObject', payload)

			// define style behavior for ...
			switch (type) {
				case 'category':
					this.showCategoryDropzones()
					break
				case 'collection':
					break
			}
		},
		dragEnd() {
			this.hideCategoryDropzones()
		},
		dragFinish(category, collection, categoryDropIndex, collectionDropIndex, $event) {
			// dragged payload
			let payload = JSON.parse($event.dataTransfer.getData('draggedObject'))

			let vm = this
			let writeData = false
			switch (payload.type) {
				case 'article':
					if (typeof category !== 'undefined' || category !== null) {
						vm.$db.Article.findOne({
							where: {
								id: payload.article.id
							}
						}).then((article) => {
							if (article.categoryId !== category.id) {
								article.categoryId = category.id
								article.save().then(() => {
									vm.$store.dispatch('article/getByCategory', { category: vm.$store.getters['collection/currentCategory'].id })
									vm.$store.dispatch('collection/getAll')
								})
							}
						})
					}
					break
				case 'category':
					let elementToMove = vm.collections[payload.collectionIndex].categories[payload.categoryIndex]
					// move element in same collection
					if (payload.collectionIndex === collectionDropIndex) {
						// continue if drag and drop is not the same
						if (payload.categoryIndex !== categoryDropIndex) {
							vm.collections[payload.collectionIndex].categories.splice(payload.categoryIndex, 1)
							vm.collections[payload.collectionIndex].categories.splice(categoryDropIndex, 0, elementToMove)
							writeData = true
						}
					}
					// move element in another collection
					if (payload.collectionIndex !== collectionDropIndex) {
						vm.collections[payload.collectionIndex].categories.splice(payload.categoryIndex, 1)
						vm.collections[collectionDropIndex].categories.splice(categoryDropIndex, 0, elementToMove)
						writeData = true
					}
					break
				case 'collection':
					if (payload.collectionIndex !== collectionDropIndex) {
						let collectionToMove = vm.collections[payload.collectionIndex]
						vm.collections.splice(payload.collectionIndex, 1)
						vm.collections.splice(collectionDropIndex, 0, collectionToMove)
						writeData = true
					}
					break
			}

			if (writeData) {
				vm.persistSorting()
			}
		},

		persistSorting() {
			let vm = this
			let promises = []
			vm.collections.forEach((collection, collectionIndex) => {
				collection.sorting = collectionIndex
				promises.push(collection.save({ fields: ['sorting'] }))
				collection.categories.forEach((category, categoryIndex) => {
					category.sorting = categoryIndex
					category.collectionId = collection.id
					promises.push(category.save())
				})
			})
			Promise.all(promises).then(() => {
				vm.$store.dispatch('collection/update', this.collections)
			})
		},

		contextCategorySelect(option) {
			let vm = this
			vm.contextObject = option.payload
			switch (option.method) {
				case 'delete':
					vm.$root.$emit('bv::show::modal', 'modal-delete-category')
					break
				case 'rename':
					vm.$root.$emit('bv::show::modal', 'modal-rename-category')
					break
			}
		}
	}
}
</script>
