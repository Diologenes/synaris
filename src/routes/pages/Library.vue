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
							<b-link v-for="element in library.Libraries" :key="element.id" router-tag="a" :to="{ name: 'library', params: { libraryId: element.id } }" class="c-library__item" active-class="active">
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

		<!-- modal: new library / group -->
		<b-modal id="modal-create-new-library" centered title="Create new library or group">
			<b-form-group label="Enter title">
				<b-form-input id="input-1" type="email" required placeholder="New title ..."></b-form-input>
			</b-form-group>
			<b-form-group label="Type">
				<b-form-radio-group id="btn-radios-1" v-model="selected" :options="options" buttons name="radios-btn-default" button-variant="outline-primary"></b-form-radio-group>
			</b-form-group>
		</b-modal>
		<!-- modal: new library / group -->
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import _ from 'lodash'

export default {
	components: {
		draggable
	},
	data() {
		return {
			selected: 'first',
			options: [
				{ text: 'Library', value: 'first' },
				{ text: 'Group', value: 'second' }
			],

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
