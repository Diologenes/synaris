<template>
	<div class="c-page c-page__default">
		<div class="c-library">
			<!-- library content -->
			<div class="c-library__content">
				<!-- library list -->
				<div class="c-library__list">
					<div class="c-library__list-title">Libraries</div>
					<div class="c-library__list-indicator">
						<div class="c-panelbox">
							<form-panel-box :clickable="true" :primary="true" icon="more" @submit="createChannel()" />
						</div>
					</div>
				</div>

				<draggable v-if="libraries !== null" v-model="libraries" ghostClass="c-library__list--ghost" touchStartThreshold="5" @start="startDrag()" @end="endDrag()">
					<b-link v-for="library in libraries" :key="library.id" router-tag="a" :to="{ name: 'library', params: { libraryId: library.id } }" active-class="active" :class="{ 'c-library__list--is-drag': isDragging }" class="c-library__list c-library__list--clickable">
						<div class="c-library__list-title" :title="library.title">{{ library.title }}</div>
						<div class="c-library__list-indicator">
							<div class="c-panelbox">
								<div class="c-panelbox__item">0</div>
							</div>
						</div>
					</b-link>
				</draggable>
			</div>
		</div>

		<router-view />
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
