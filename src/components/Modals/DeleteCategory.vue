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
		data() {
			return {
				categoryId: null
			}
		},
		methods: {
			handleOk(evt) {
				let vm = this
				vm.categoryId = parseInt(vm.item.id)
				vm.item.destroy().then(() => {
					vm.$store.dispatch('collection/getAll').then(() => {
						this.redirectOnSelfDelete()
						vm.handleClose()
					})
				})
				evt.preventDefault()
			},

			redirectOnSelfDelete() {
				if (this.item.constructor.name === 'category' && this.categoryId === parseInt(this.$route.params.category)) {
					this.$router.push({ name: 'categoryList' })
				} else if (this.item.constructor.name === 'collection') {
					this.$router.push({ name: 'categoryList' })
				}
			},

			handleClose() {
				this.$nextTick(() => {
					this.$bvModal.hide('modal-delete-category')
				})
			}
		}
	}
</script>
