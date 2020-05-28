<template>
	<b-modal id="modal-create-new-library" ref="modalCreateNewLibrary" centered title="Create new library or group" :ok-disabled="isPending" @shown="resetModal" @ok="handleOk">
		<div v-for="error in errors" :key="error">
			<b-alert variant="danger" :show="error === 'title'">Enter title</b-alert>
			<b-alert variant="danger" :show="error === 'noFolder'">Select a folder for your library</b-alert>
		</div>

		<b-form-group label="Type">
			<b-form-radio-group id="btn-radios-1" v-model="selectedType" :options="options" buttons name="radios-btn-default" button-variant="outline-primary"></b-form-radio-group>
		</b-form-group>
		<b-form-group label="Enter title">
			<b-form-input v-model="title" placeholder="New title ..."></b-form-input>
		</b-form-group>

		<b-form-group v-if="selectedType == 'library'" label="Select a folder">
			<b-dropdown id="dropdown-dropup" :text="valFolder" variant="primary">
				<b-dropdown-item @click="changeFolder(folder)" v-for="folder in folders" :key="folder.id">{{ folder.text }}</b-dropdown-item>
			</b-dropdown>
		</b-form-group>
	</b-modal>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			selectedType: 'library',
			folders: [],
			selectedFolder: '',
			valFolder: 'Select a folder ...',
			options: [
				{ text: 'Library', value: 'library' },
				{ text: 'Folder', value: 'folder' }
			],
			isPending: false,
			errors: []
		}
	},
	methods: {
		// this method is used if modal is shown
		resetModal() {
			this.title = ''
			this.selectedType = 'library'
			this.valFolder = 'Select a folder ...'
			this.removeErrors()
			this.folders = this.getFolders()
		},

		changeFolder(folder) {
			this.valFolder = folder.text
			this.selectedFolder = folder.id
		},

		// get groups
		getFolders() {
			let vm = this
			let tmpVal = []
			vm.$db.Folder.findAll({}).then((response) => {
				response.forEach((element) => {
					tmpVal.push({ id: element.dataValues.id, text: element.dataValues.title })
				})
				vm.folders = tmpVal
			})
		},

		// submit the create channel
		handleOk(evt) {
			let vm = this
			vm.removeErrors()

			if (vm.title === '') {
				vm.errors.push('title')
			}
			if (vm.selectedType === 'library' && vm.selectedFolder === '') {
				vm.errors.push('noFolder')
			}

			if (vm.isPending === false) {
				if (vm.errors.length === 0) {
					vm.isPending = true
					if (vm.selectedType === 'library') {
						vm.$db.Library.create({ title: vm.title, folderId: vm.selectedFolder, sorting: 999 }).then((response) => {
							vm.isPending = false
							vm.$store.dispatch('library/getAll')
							vm.handleClose()
						})
					} else if (vm.selectedType === 'folder') {
						vm.$db.Folder.create({ title: vm.title, sorting: 999 }).then((response) => {
							vm.isPending = false
							vm.$store.dispatch('library/getAll')
							vm.handleClose()
						})
					}
				}
			}
			evt.preventDefault()
		},

		// handle close
		handleClose() {
			this.$root.$emit('bv::hide::modal', 'modal-create-new-library')
		},

		// remove errors
		removeErrors() {
			this.errors = []
		}
	}
}
</script>
