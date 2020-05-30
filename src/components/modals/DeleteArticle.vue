<template>
	<b-modal id="modal-delete-article" ref="modalDeleteArticle" centered title="Delete article" @ok="handleOk" ok-title="Delete">
		<span v-if="item"
			>Are you sure you want to delete <b>{{ item.title }}</b
			>?</span
		>
	</b-modal>
</template>

<script>
export default {
	props: {
		item: Object
	},
	methods: {
		async handleOk(evt) {
			let vm = this
			let categoryId = vm.item.categoryId
			let promises = []
			await vm.item.destroy().then(() => {
				promises.push(vm.$store.dispatch('article/getByCategory', { category: categoryId }))
				promises.push(vm.$store.dispatch('collection/getAll'))
			})
			Promise.all(promises).then(() => {
				vm.handleClose()
			})
			evt.preventDefault()
		},

		handleClose() {
			this.$nextTick(() => {
				this.$bvModal.hide('modal-delete-article')
			})
		}
	}
}
</script>
