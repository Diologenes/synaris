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
						<div class="c-category__group-title" @contextmenu.prevent="$refs.layermenuCategory.open($event, collection)" @dragover.prevent @dragstart="dragStart('collection', null, collectionIndex)" @drop="dragFinish(null, collectionIndex)" @dragend="dragEnd()" draggable="true">
							{{ collection.title }}
						</div>

						<div v-if="collection.categories.length === 0">
							<div class="c-category__dropzone" @dragover.prevent @drop="dragFinish(0, collectionIndex)"></div>
						</div>
						<!-- group title -->

						<!-- group content -->
						<div class="c-category__group-content">
							<div class="c-category__item c-category__dropzone" v-for="(category, categoryIndex) in collection.categories" :key="category.id">
								<b-link
									@contextmenu.prevent="$refs.layermenuCategory.open($event, category)"
									@dragover.prevent
									@dragstart="dragStart('category', categoryIndex, collectionIndex)"
									@drop="dragFinish(categoryIndex, collectionIndex)"
									@dragend="dragEnd()"
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
			drag: {
				isDrag: false,
				type: null,
				categoryDragIndex: null,
				collectionDragIndex: null
			},
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
		this.$store.dispatch('collection/getAll').then((r) => console.log(r))
	},
	methods: {
		showCategoryDropzones: _.debounce(() => {
			const identifierClass = 'c-category__dropzone'
			const activeClass = 'c-category__dropzone--is-active'
			let items = window.document.getElementsByClassName(identifierClass)
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

		dragStart(type, i, collectionId) {
			this.$refs.layermenuCategory.close()
			this.drag.type = type
			switch (this.drag.type) {
				case 'category':
					this.showCategoryDropzones()
					this.drag.categoryDragIndex = i
					this.drag.collectionDragIndex = collectionId
					break
				case 'collection':
					this.drag.collectionDragIndex = collectionId
					break
			}
		},
		dragEnd() {
			switch (this.drag.type) {
				case 'category':
					this.hideCategoryDropzones()
					break
				case 'collection':
					break
			}
		},
		dragFinish(categoryDropIndex, collectionDropIndex) {
			let vm = this
			let writeData = false
			switch (vm.drag.type) {
				case 'category':
					let elementToMove = vm.collections[vm.drag.collectionDragIndex].categories[vm.drag.categoryDragIndex]
					// move element in same collection
					if (vm.drag.collectionDragIndex === collectionDropIndex) {
						// continue if drag and drop is not the same
						if (vm.drag.categoryDragIndex !== categoryDropIndex) {
							vm.collections[vm.drag.collectionDragIndex].categories.splice(vm.drag.categoryDragIndex, 1)
							vm.collections[vm.drag.collectionDragIndex].categories.splice(categoryDropIndex, 0, elementToMove)
							writeData = true
						}
					}
					// move element in another collection
					if (vm.drag.collectionDragIndex !== collectionDropIndex) {
						vm.collections[vm.drag.collectionDragIndex].categories.splice(vm.drag.categoryDragIndex, 1)
						vm.collections[collectionDropIndex].categories.splice(categoryDropIndex, 0, elementToMove)
						writeData = true
					}
					break
				case 'collection':
					if (vm.drag.collectionDragIndex !== collectionDropIndex) {
						let collectionToMove = vm.collections[vm.drag.collectionDragIndex]
						vm.collections.splice(vm.drag.collectionDragIndex, 1)
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
