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
					<div class="c-library__group-title" @dragstart="dragStart(libraryIndex, $event)" @dragover.prevent @dragenter="dragEnter(libraryIndex, $event)" @dragleave="dragLeave(libraryIndex, $event)" @dragend="dragEnd" @drop="dragFinish(libraryIndex, $event, libraryIndex)" draggable="true">
						{{ library.title }}
					</div>
					<!-- group title -->

					<!-- group content -->
					<div class="c-library__group-content">
						<b-link
							@dragstart="dragStart(elementIndex, $event)"
							@dragover.prevent
							@dragenter="dragEnter(libraryIndex, $event)"
							@dragleave="dragLeave(libraryIndex, $event)"
							@dragend="dragEnd"
							@drop="dragFinish(elementIndex, $event, libraryIndex)"
							draggable="true"
							v-for="(element, elementIndex) in library.libraries"
							:key="element.id"
							router-tag="a"
							:to="{ name: 'library', params: { libraryId: element.id } }"
							class="c-library__item"
							active-class="active"
						>
							<div class="c-library__item-title" :title="element.title">{{ element.title }}</div>
							<div class="c-library__item-indicator">
								<div class="c-panelbox">
									<div class="c-panelbox__item">0</div>
								</div>
							</div>
						</b-link>
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
			isDragging: false,
			draggedId: null
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
			let items = window.document.getElementsByClassName('c-library__item')
			items.forEach((element) => {
				if (type === 'add') {
					element.classList.add('c-library__item--is-drop')
				} else if (type === 'remove') {
					element.classList.remove('c-library__item--is-drop')
				}
			})
		},

		dragStart: function(i, event) {
			console.log('dragStart', i, event)
			this.changeDraggableItems('add')
			this.draggedId = i
		},
		dragEnter: function(i, event) {
			console.log('dragEnter', event)
		},
		dragLeave: function(i, event) {
			// console.log('dragLeave', i, event)
		},
		dragEnd: function(event) {
			this.changeDraggableItems('remove')
		},
		dragFinish: function(i, event, folderId) {
			console.log('dragFinish / drop', this.draggedId, i, folderId)
			console.log('dragFinish / drop ::', this.libraries)
		}
	}
}
</script>
