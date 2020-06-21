<template>
	<b-modal
		id="modal-create-new-category"
		ref="modalCreateNewCategory"
		centered
		title="Create new category or collection"
		size="md"
		:hide-header="true"
		:ok-disabled="isPending"
		@shown="resetModal"
		@ok="handleOk"
	>
		<div v-for="error in errors" :key="error">
			<b-alert variant="danger" :show="error === 'title'">Enter title</b-alert>
			<b-alert variant="danger" :show="error === 'noCollection'">Select a collection for your category</b-alert>
		</div>

		<tab-container>
			<tab-item title="category">
				<b-form-group label="Enter title">
					<b-form-input v-model="title" placeholder="New title ..." autofocus></b-form-input>
				</b-form-group>
				<b-form-group label="Select a collection">
					<b-dropdown id="dropdown-dropup" :text="valCollection" variant="primary">
						<b-dropdown-item @click="changeFolder(collection)" v-for="collection in collections" :key="collection.id">{{ collection.text }}</b-dropdown-item>
					</b-dropdown>
				</b-form-group>
			</tab-item>
			<tab-item title="Collection">
				<b-form-group label="Enter title">
					<b-form-input v-model="title" placeholder="New title ..." autofocus></b-form-input>
				</b-form-group>
			</tab-item>
		</tab-container>

		<!-- <b-form-group label="Type">
			<b-form-radio-group
				id="btn-radios-1"
				v-model="selectedType"
				:options="options"
				buttons
				name="radios-btn-default"
				button-variant="outline-primary"
			></b-form-radio-group>
		</b-form-group> -->
	</b-modal>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				selectedType: 'category',
				collections: [],
				selectedCollection: '',
				valCollection: 'Select a collection ...',
				options: [
					{ text: 'Category', value: 'category' },
					{ text: 'Collection', value: 'collection' }
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
				this.valCollection = 'Select a collection ...'
				this.removeErrors()
				this.collections = this.getFolders()
			},

			changeFolder(collection) {
				this.valCollection = collection.text
				this.selectedCollection = collection.id
			},

			// get groups
			getFolders() {
				let vm = this
				let tmpVal = []
				vm.$db.Collection.findAll({})
					.then(response => {
						response.forEach(element => {
							tmpVal.push({ id: element.dataValues.id, text: element.dataValues.title })
						})
						vm.collections = tmpVal
					})
					.catch(err => {
						window.EventBus.fire('notification', { title: 'Error', variant: 'danger', msg: err.original.message })
					})
			},

			// submit the create channel
			handleOk(evt) {
				let vm = this
				vm.removeErrors()

				if (vm.title === '') {
					vm.errors.push('title')
				}
				if (vm.selectedType === 'category' && vm.selectedCollection === '') {
					vm.errors.push('noCollection')
				}

				if (vm.isPending === false) {
					if (vm.errors.length === 0) {
						vm.isPending = true
						if (vm.selectedType === 'category') {
							vm.$db.Category.create({ title: vm.title, collectionId: vm.selectedCollection, sorting: 999 })
								.then(() => {
									vm.isPending = false
									vm.$store.dispatch('collection/getAll')
									vm.handleClose()
								})
								.catch(err => {
									window.EventBus.fire('notification', { title: 'Error', variant: 'danger', msg: err.original.message })
								})
						} else if (vm.selectedType === 'collection') {
							vm.$db.Collection.create({ title: vm.title, sorting: 999 })
								.then(() => {
									vm.isPending = false
									vm.$store.dispatch('collection/getAll')
									vm.handleClose()
								})
								.catch(err => {
									window.EventBus.fire('notification', { title: 'Error', variant: 'danger', msg: err.original.message })
								})
						}
					}
				}
				evt.preventDefault()
			},

			// handle close
			handleClose() {
				this.$nextTick(() => {
					this.$bvModal.hide('modal-create-new-category')
				})
			},

			// remove errors
			removeErrors() {
				this.errors = []
			}
		}
	}
</script>
