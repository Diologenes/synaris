<template>
	<b-modal id="modal-delete-category" ref="modalDeleteCategory" centered title="Delete category" @ok="handleOk" ok-title="Delete category">
		<span v-if="item"
			>Are you sure you want to delete <b>{{ item.title }}</b> and all its content?</span
		>
	</b-modal>
</template>

<script>
export default {
	props: {
		item: Object
	},
	methods: {
		handleOk(evt) {
			let vm = this
			vm.item.destroy().then(() => {
				vm.$store.dispatch('collection/getAll').then(() => {
					vm.handleClose()
				})
			})
			evt.preventDefault()
		},

		handleClose() {
			this.$nextTick(() => {
				this.$bvModal.hide('modal-delete-category')
			})
		}
	}
}
</script>
