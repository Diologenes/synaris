<template>
	<b-modal id="modal-create-new-library" ref="modalCreateNewLibrary" centered title="Create new library or group" :ok-disabled="isPending" @shown="initModal" @ok="handleOk">
		<b-form-group label="Enter title">
			<b-form-input id="input-1" type="email" required placeholder="New title ..."></b-form-input>
		</b-form-group>
		<b-form-group label="Type">
			<b-form-radio-group id="btn-radios-1" v-model="selectedType" :options="options" buttons name="radios-btn-default" button-variant="outline-primary"></b-form-radio-group>
		</b-form-group>
	</b-modal>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			selectedType: 'library',
			options: [
				{ text: 'Library', value: 'library' },
				{ text: 'Group', value: 'group' }
			],
			isPending: false,
			errors: null
		}
	},
	methods: {
		// this method is used if modal is shown
		initModal() {
			this.title = ''
			this.removeErrors()
		},

		// submit the create channel
		handleOk(evt) {
			console.log('handleOk')
			let vm = this
			if (vm.isPending === false) {
				vm.removeErrors()

				vm.$db.Group.findAll({ include: [{ model: vm.$db.Library }] }).then((response) => {
					console.log('RRR', response)
				})

				// vm.isPending = true
				// vm.handleClose()
				// vm.isPending = false
			}
			evt.preventDefault()
		},

		// handle close
		handleClose() {
			this.$root.$emit('bv::hide::modal', 'modal-create-new-library')
		},

		// remove errors
		removeErrors() {
			this.errors = null
		}
	}
}
</script>
