<template>
	<div class="c-page c-page__default">
		<div class="c-library">
			<div class="c-library__wrap">
				<!-- panel section -->
				<div class="c-panel-section">
					<div class="c-panel-section__title">Libraries</div>
				</div>
				<!-- panel section -->

				<!-- scrollbar -->
				<perfect-scrollbar class="c-library__content">
					<!-- group item -->
					<div v-for="(library, libraryIndex) in libraries" :key="library.id" class="c-library__group">
						<!-- group title -->
						<div class="c-library__group-title" @dragover.prevent @dragstart="dragStart('folder', null, libraryIndex)" @drop="dragFinish(null, libraryIndex)" @dragend="dragEnd()" draggable="true">
							{{ library.title }}
						</div>

						<div v-if="library.libraries.length === 0">
							<div class="c-library__dropzone" @dragover.prevent @drop="dragFinish(0, libraryIndex)"></div>
						</div>
						<!-- group title -->

						<!-- group content -->
						<div class="c-library__group-content">
							<div class="c-library__item c-library__dropzone" v-for="(element, elementIndex) in library.libraries" :key="element.id">
								<b-link
									@contextmenu.prevent="$refs.layermenuLibrary.open($event, 'Payload')"
									@dragover.prevent
									@dragstart="dragStart('library', elementIndex, libraryIndex)"
									@drop="dragFinish(elementIndex, libraryIndex)"
									@dragend="dragEnd()"
									draggable="true"
									router-tag="a"
									:to="{ name: 'library', params: { libraryId: element.id } }"
									class="c-library__link"
									active-class="active"
								>
									<div class="c-library__link-title" :title="element.title">{{ element.title }}</div>
									<div class="c-library__link-indicator">
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

				<LayerMenu ref="layermenuLibrary">
					test
				</LayerMenu>

				<div v-b-modal.modal-create-new-library class="c-create-button c-button c-button--primary c-button--bullseye u-icon--more"></div>
			</div>
		</div>

		<router-view />
		<modal-add-library />
	</div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import modalAddLibrary from '@/components/modals/AddLibrary'

export default {
	components: {
		modalAddLibrary
	},
	data() {
		return {
			drag: {
				isDrag: false,
				type: null,
				libraryDragIndex: null,
				folderDragIndex: null
			}
		}
	},
	computed: {
		libraries: {
			get() {
				return this.$store.getters['library/libraries']
			}
		}
	},
	mounted() {
		this.$store.dispatch('library/getAll')
	},
	methods: {
		showLibraryDropzones: _.debounce(() => {
			const identifierClass = 'c-library__dropzone'
			const activeClass = 'c-library__dropzone--is-active'
			let items = window.document.getElementsByClassName(identifierClass)
			items.forEach((element) => {
				element.classList.add(activeClass)
			})
		}, 30),
		hideLibraryDropzones() {
			const identifierClass = 'c-library__dropzone'
			const activeClass = 'c-library__dropzone--is-active'
			let items = window.document.getElementsByClassName(identifierClass)
			items.forEach((element) => {
				element.classList.remove(activeClass)
			})
		},

		dragStart(type, i, folderId) {
			this.$refs.layermenuLibrary.close()
			this.drag.type = type
			switch (this.drag.type) {
				case 'library':
					this.showLibraryDropzones()
					this.drag.libraryDragIndex = i
					this.drag.folderDragIndex = folderId
					break
				case 'folder':
					this.drag.folderDragIndex = folderId
					break
			}
		},
		dragEnd() {
			switch (this.drag.type) {
				case 'library':
					this.hideLibraryDropzones()
					break
				case 'folder':
					break
			}
		},
		dragFinish(libraryDropIndex, folderDropIndex) {
			let vm = this
			let writeData = false
			switch (vm.drag.type) {
				case 'library':
					let elementToMove = vm.libraries[vm.drag.folderDragIndex].libraries[vm.drag.libraryDragIndex]
					// move element in same folder
					if (vm.drag.folderDragIndex === folderDropIndex) {
						// continue if drag and drop is not the same
						if (vm.drag.libraryDragIndex !== libraryDropIndex) {
							vm.libraries[vm.drag.folderDragIndex].libraries.splice(vm.drag.libraryDragIndex, 1)
							vm.libraries[vm.drag.folderDragIndex].libraries.splice(libraryDropIndex, 0, elementToMove)
							writeData = true
						}
					}
					// move element in another folder
					if (vm.drag.folderDragIndex !== folderDropIndex) {
						vm.libraries[vm.drag.folderDragIndex].libraries.splice(vm.drag.libraryDragIndex, 1)
						vm.libraries[folderDropIndex].libraries.splice(libraryDropIndex, 0, elementToMove)
						writeData = true
					}
					break
				case 'folder':
					if (vm.drag.folderDragIndex !== folderDropIndex) {
						let folderToMove = vm.libraries[vm.drag.folderDragIndex]
						vm.libraries.splice(vm.drag.folderDragIndex, 1)
						vm.libraries.splice(folderDropIndex, 0, folderToMove)
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
			vm.libraries.forEach((folder, folderIndex) => {
				folder.sorting = folderIndex
				promises.push(folder.save({ fields: ['sorting'] }))
				folder.libraries.forEach((library, libraryIndex) => {
					library.sorting = libraryIndex
					library.folderId = folder.id
					promises.push(library.save())
				})
			})
			Promise.all(promises).then(() => {
				vm.$store.dispatch('library/update', this.libraries)
			})
		}
	}
}
</script>
