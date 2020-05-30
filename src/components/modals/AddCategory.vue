<template>
	<b-modal id="modal-create-new-category" ref="modalCreateNewCategory" centered title="Create new category or group" :ok-disabled="isPending" @shown="resetModal" @ok="handleOk">
		<div v-for="error in errors" :key="error">
			<b-alert variant="danger" :show="error === 'title'">Enter title</b-alert>
			<b-alert variant="danger" :show="error === 'noFolder'">Select a folder for your category</b-alert>
		</div>

		<b-form-group label="Type">
			<b-form-radio-group id="btn-radios-1" v-model="selectedType" :options="options" buttons name="radios-btn-default" button-variant="outline-primary"></b-form-radio-group>
		</b-form-group>
		<b-form-group label="Enter title">
			<b-form-input v-model="title" placeholder="New title ..."></b-form-input>
		</b-form-group>

		<b-form-group v-if="selectedType == 'category'" label="Select a folder">
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
			selectedType: 'category',
			folders: [],
			selectedFolder: '',
			valFolder: 'Select a folder ...',
			options: [
				{ text: 'Category', value: 'category' },
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
			this.selectedType = 'category'
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
			if (vm.selectedType === 'category' && vm.selectedFolder === '') {
				vm.errors.push('noFolder')
			}

			if (vm.isPending === false) {
				if (vm.errors.length === 0) {
					vm.isPending = true
					if (vm.selectedType === 'category') {
						vm.$db.Category.create({ title: vm.title, folderId: vm.selectedFolder, sorting: 999 }).then((response) => {
							vm.isPending = false
							vm.$store.dispatch('folder/getAll')
							vm.handleClose()
						})
					} else if (vm.selectedType === 'folder') {
						vm.$db.Folder.create({ title: vm.title, sorting: 999 }).then((response) => {
							vm.isPending = false
							vm.$store.dispatch('folder/getAll')
							vm.handleClose()
						})
					}
				}
			}
			evt.preventDefault()
		},

		// handle close
		handleClose() {
			this.$root.$emit('bv::hide::modal', 'modal-create-new-category')
		},

		// remove errors
		removeErrors() {
			this.errors = []
		}
	}
}
</script>
