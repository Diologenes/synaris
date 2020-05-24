<template>
	<div class="c-page c-page__default">
		<div class="c-library">
			<div class="c-library__content">
				<!-- panel section -->
				<div class="c-panel-section">
					<div class="c-panel-section__title">Libraries</div>
				</div>
				<!-- panel section -->

				<!-- draggable -->
				<draggable v-if="libraries !== null" v-model="libraries" ghostClass="c-library__item--ghost" touchStartThreshold="5" @start="startDrag()" @end="endDrag()">
					<!-- group item -->
					<div v-for="library in libraries" :key="library.id" class="c-library__group">
						<!-- group title -->
						<div class="c-library__group-title">{{ library.title }}</div>
						<!-- group title -->

						<!-- group content -->
						<div class="c-library__group-content">
							<b-link v-for="element in library.libraries" :key="element.id" router-tag="a" :to="{ name: 'library', params: { libraryId: element.id } }" class="c-library__item" active-class="active">
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
				</draggable>
				<!-- draggable -->

				<div v-b-modal.modal-create-new-library class="c-create-button c-button c-button--primary c-button--bullseye u-icon--more"></div>
			</div>
		</div>

		<router-view />
		<modal-add-library/>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import _ from 'lodash'
import modalAddLibrary from '@/components/modals/AddLibrary'

export default {
	components: {
		draggable,
		modalAddLibrary
	},
	data() {
		return {
			isDragging: false
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
		// create channel
		createChannel() {
			console.log('submit')
			//Database.addLibrary()
		},

		// start dragging
		startDrag() {
			this.isDragging = true
		},

		// sort channels by drag and drop
		endDrag() {
			let vm = this
			vm.isDragging = false
			if (vm.libraries.length) {
				const idArray = []
				_.forEach(vm.libraries, function(library) {
					idArray.push(library.id)
				})

				// SQL HERE
				//Database.updateLibrarySorting(idArray)
				// SQL HERE
			}
		}
	}
}
</script>
