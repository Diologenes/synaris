<template>
	<div class="c-page c-page__default">
		<div class="c-library">
			<div class="c-library__content">
				<!-- panel section -->
				<div class="c-panel-section">
					<div class="c-panel-section__title">Libraries</div>
				</div>
				<!-- panel section -->

				<!-- group item -->
				<div v-for="(library, libraryIndex) in libraries" :key="library.id" class="c-library__group">
					<!-- group title -->
					<div class="c-library__group-title" @dragstart="dragStart(libraryIndex, $event)" @dragover.prevent @dragend="dragEnd" @drop="dragFinish(libraryIndex, $event, libraryIndex)" draggable="true">
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
								@dragover.prevent
								@dragstart="dragStart(elementIndex, libraryIndex)"
								@drop="dragFinish(elementIndex, libraryIndex)"
								@dragend="dragEnd"
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
					<!-- group item -->
				</div>
				<!-- group -->

				<div v-b-modal.modal-create-new-library class="c-create-button c-button c-button--primary c-button--bullseye u-icon--more"></div>
			</div>
		</div>

		<router-view />
		<modal-add-library />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import modalAddLibrary from '@/components/modals/AddLibrary'

export default {
	components: {
		modalAddLibrary
	},
	data() {
		return {
			drag: {
				isDrag: false,
				libraryDragIndex: null,
				folderDragIndex: null
			}
		}
	},
	computed: {
		libraries: {
			get() {
				return this.$store.getters['library/libraries']
			},
			set(value) {
				this.$store.dispatch('library/update', value)
			}
		}
	},
	mounted() {
		this.$store.dispatch('library/getAll')
	},
	methods: {
		changeDraggableItems(type) {
			const identifierClass = 'c-library__dropzone'
			const activeClass = 'c-library__dropzone--is-active'
			let items = window.document.getElementsByClassName(identifierClass)
			items.forEach((element) => {
				if (type === 'add') {
					element.classList.add(activeClass)
				} else if (type === 'remove') {
					element.classList.remove(activeClass)
				}
			})
		},
		// dragStart: function(i, folderId) {},

		dragStart: function(i, folderId) {
			this.changeDraggableItems('add')
			this.drag.libraryDragIndex = i
			this.drag.folderDragIndex = folderId
		},
		dragEnd: function() {
			this.changeDraggableItems('remove')
		},
		dragFinish: function(libraryDropIndex, folderDropIndex) {
			let elementToMove = this.libraries[this.drag.folderDragIndex].libraries[this.drag.libraryDragIndex]
			// move element in same folder
			if (this.drag.folderDragIndex === folderDropIndex) {
				if (this.drag.libraryDragIndex !== libraryDropIndex) {
					this.libraries[this.drag.folderDragIndex].libraries.splice(this.drag.libraryDragIndex, 1)
					this.libraries[this.drag.folderDragIndex].libraries.splice(libraryDropIndex, 0, elementToMove)
				}
			}
			// move element in another folder
			if (this.drag.folderDragIndex !== folderDropIndex) {
				this.libraries[this.drag.folderDragIndex].libraries.splice(this.drag.libraryDragIndex, 1)
				this.libraries[folderDropIndex].libraries.splice(libraryDropIndex, 0, elementToMove)
			}
		}
	}
}
</script>
