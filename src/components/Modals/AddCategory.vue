<template>
	<b-modal
		id="modal-create-new-category"
		ref="modalCreateNewCategory"
		centered
		title="Create new category or collection"
		size="md"
		:hide-header="true"
		:ok-disabled="isPending"
		ok-title="Create"
		@shown="resetModal"
		@ok="handleOk"
	>
		<div v-for="error in errors" :key="error">
			<b-alert variant="danger" :show="error === 'title'">Enter title</b-alert>
			<b-alert variant="danger" :show="error === 'noCollection'">Select a collection for your category</b-alert>
		</div>

		<tab-container @change="changeSelectedType">
			<tab-item title="Category" value="category">
				<b-form-group label="Enter title">
					<b-form-input v-model.trim="categoryTitle" placeholder="New Category ..." autofocus></b-form-input>
				</b-form-group>
				<b-form-group label="Select a collection">
					<form-select-box @change="changeSelectedCollection" :options="collections" />
				</b-form-group>
			</tab-item>
			<tab-item title="Collection" value="collection">
				<b-form-group label="Enter title">
					<b-form-input v-model.trim="collectionTitle" placeholder="New collection ..." autofocus></b-form-input>
				</b-form-group>
			</tab-item>
		</tab-container>
	</b-modal>
</template>

<script>
	export default {
		data() {
			return {
				categoryTitle: '',
				collectionTitle: '',
				selectedType: 'category',
				collections: [],
				selectedCollection: null,
				isPending: false,
				errors: []
			}
		},
		methods: {
			// this method is used if modal is shown
			resetModal() {
				this.categoryTitle = ''
				this.collectionTitle = ''
				this.selectedType = 'category'
				this.selectedCollection = null
				this.removeErrors()
				this.collections = this.getFolders()
			},

			// get groups
			getFolders() {
				let vm = this
				let tmpVal = []
				vm.$db.Collection.findAll({})
					.then(response => {
						response.forEach(element => {
							tmpVal.push({ value: element.id, label: element.title })
						})
						vm.collections = tmpVal
					})
					.catch(err => {
						window.EventBus.fire('notification', { title: 'Error', variant: 'danger', msg: err.original.message })
					})
			},

			changeSelectedCollection(option) {
				this.selectedCollection = option.value
			},

			changeSelectedType(option) {
				this.selectedType = option.value
			},

			// submit the create channel
			handleOk(evt) {
				let vm = this
				vm.removeErrors()
				if (vm.isPending === true) {
					return
				}

				if (this.selectedType === 'collection' && this.collectionTitle !== '') {
					vm.isPending = true
					vm.$db.Collection.create({ title: vm.collectionTitle, sorting: 999 })
						.then(() => {
							vm.isPending = false
							vm.$store.dispatch('collection/getAll')
							vm.handleClose()
						})
						.catch(err => {
							window.EventBus.fire('notification', { title: 'Error', variant: 'danger', msg: err.original.message })
						})
				}

				if (this.selectedType === 'category' && this.categoryTitle !== '' && this.selectedCollection !== null) {
					vm.isPending = true
					vm.$db.Category.create({ title: vm.categoryTitle, collectionId: vm.selectedCollection, sorting: 999 })
						.then(() => {
							vm.isPending = false
							vm.$store.dispatch('collection/getAll')
							vm.handleClose()
						})
						.catch(err => {
							window.EventBus.fire('notification', { title: 'Error', variant: 'danger', msg: err.original.message })
						})
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
