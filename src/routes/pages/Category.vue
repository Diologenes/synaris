<template>
	<div class="c-page c-page__default">
		<div class="c-category">
			<div class="c-category__wrap">
				<!-- panel section -->
				<div class="c-panel-section">
					<div class="c-panel-section__title">Categories</div>
				</div>
				<!-- panel section -->

				<!-- scrollbar -->
				<perfect-scrollbar class="c-category__content">
					<!-- group item -->
					<div v-for="(category, categoryIndex) in categories" :key="category.id" class="c-category__group">
						<!-- group title -->
						<div class="c-category__group-title" @contextmenu.prevent="$refs.layermenuCategory.open($event, category)" @dragover.prevent @dragstart="dragStart('folder', null, categoryIndex)" @drop="dragFinish(null, categoryIndex)" @dragend="dragEnd()" draggable="true">
							{{ category.title }}
						</div>

						<div v-if="category.categories.length === 0">
							<div class="c-category__dropzone" @dragover.prevent @drop="dragFinish(0, categoryIndex)"></div>
						</div>
						<!-- group title -->

						<!-- group content -->
						<div class="c-category__group-content">
							<div class="c-category__item c-category__dropzone" v-for="(element, elementIndex) in category.categories" :key="element.id">
								<b-link
									@contextmenu.prevent="$refs.layermenuCategory.open($event, element)"
									@dragover.prevent
									@dragstart="dragStart('category', elementIndex, categoryIndex)"
									@drop="dragFinish(elementIndex, categoryIndex)"
									@dragend="dragEnd()"
									draggable="true"
									router-tag="a"
									:to="{ name: 'category', params: { categoryId: element.id } }"
									class="c-category__link"
									active-class="active"
								>
									<div class="c-category__link-title" :title="element.title">{{ element.title }}</div>
									<div class="c-category__link-indicator">
										<div class="c-panelbox">
											<div class="c-panelbox__item">0</div>
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

				<LayerMenu
					@select="contextCategorySelect"
					ref="layermenuCategory"
					:options="[
						{ method: 'rename', title: 'Rename ...' },
						{ method: 'delete', title: 'Delete ...' }
					]"
				/>

				<div v-b-modal.modal-create-new-category class="c-create-button c-button c-button--primary c-button--bullseye u-icon--more"></div>
			</div>
		</div>

		<router-view />
		<modal-add-category />
		<modal-delete-category :item="contextObject" />
	</div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import modalAddCategory from '@/components/modals/AddCategory'
import modalDeleteCategory from '@/components/modals/DeleteCategory'

export default {
	components: {
		modalAddCategory,
		modalDeleteCategory
	},
	data() {
		return {
			drag: {
				isDrag: false,
				type: null,
				categoryDragIndex: null,
				folderDragIndex: null
			},
			contextObject: null
		}
	},
	computed: {
		categories: {
			get() {
				return this.$store.getters['category/categories']
			}
		}
	},
	mounted() {
		this.$store.dispatch('category/getAll')
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

		dragStart(type, i, folderId) {
			this.$refs.layermenuCategory.close()
			this.drag.type = type
			switch (this.drag.type) {
				case 'category':
					this.showCategoryDropzones()
					this.drag.categoryDragIndex = i
					this.drag.folderDragIndex = folderId
					break
				case 'folder':
					this.drag.folderDragIndex = folderId
					break
			}
		},
		dragEnd() {
			switch (this.drag.type) {
				case 'category':
					this.hideCategoryDropzones()
					break
				case 'folder':
					break
			}
		},
		dragFinish(categoryDropIndex, folderDropIndex) {
			let vm = this
			let writeData = false
			switch (vm.drag.type) {
				case 'category':
					let elementToMove = vm.categories[vm.drag.folderDragIndex].categories[vm.drag.categoryDragIndex]
					// move element in same folder
					if (vm.drag.folderDragIndex === folderDropIndex) {
						// continue if drag and drop is not the same
						if (vm.drag.categoryDragIndex !== categoryDropIndex) {
							vm.categories[vm.drag.folderDragIndex].categories.splice(vm.drag.categoryDragIndex, 1)
							vm.categories[vm.drag.folderDragIndex].categories.splice(categoryDropIndex, 0, elementToMove)
							writeData = true
						}
					}
					// move element in another folder
					if (vm.drag.folderDragIndex !== folderDropIndex) {
						vm.categories[vm.drag.folderDragIndex].categories.splice(vm.drag.categoryDragIndex, 1)
						vm.categories[folderDropIndex].categories.splice(categoryDropIndex, 0, elementToMove)
						writeData = true
					}
					break
				case 'folder':
					if (vm.drag.folderDragIndex !== folderDropIndex) {
						let folderToMove = vm.categories[vm.drag.folderDragIndex]
						vm.categories.splice(vm.drag.folderDragIndex, 1)
						vm.categories.splice(folderDropIndex, 0, folderToMove)
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
			vm.categories.forEach((folder, folderIndex) => {
				folder.sorting = folderIndex
				promises.push(folder.save({ fields: ['sorting'] }))
				folder.categories.forEach((category, categoryIndex) => {
					category.sorting = categoryIndex
					category.folderId = folder.id
					promises.push(category.save())
				})
			})
			Promise.all(promises).then(() => {
				vm.$store.dispatch('category/update', this.categories)
			})
		},

		contextCategorySelect(option) {
			let vm = this
			vm.contextObject = option.payload
			console.log(vm.contextObject)
			switch (option.method) {
				case 'delete':
					vm.$root.$emit('bv::show::modal', 'modal-delete-category')
					break
			}
		}
	}
}
</script>
