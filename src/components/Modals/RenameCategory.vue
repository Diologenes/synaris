<template>
	<b-modal id="modal-rename-category" ref="modalRenameCategory" centered title="Rename ..." @ok="handleOk" ok-title="Save">
		<b-form-group label="Enter a new title">
			<b-form-input v-model="computedTitle" placeholder="Enter title ..." @keydown.enter.native="handleOk" autofocus></b-form-input>
		</b-form-group>
	</b-modal>
</template>

<script>
	export default {
		props: {
			item: Object
		},
		data() {
			return {
				title: ''
			}
		},
		computed: {
			computedTitle: {
				get() {
					let val = ''
					if (this.item !== null) {
						val = this.item.title
						this.title = val
					}
					return val
				},
				set(value) {
					this.title = value
				}
			}
		},
		methods: {
			handleOk(evt) {
				let vm = this
				if (vm.computedTitle !== vm.title) {
					if (vm.title !== '') {
						vm.item.title = vm.title
						vm.item
							.save()
							.then(() => {
								vm.$store.dispatch('collection/getAll').then(() => {
									vm.handleClose()
								})
							})
							.catch(err => {
								window.EventBus.fire('notification', { title: 'Error', variant: 'danger', msg: err.original.message })
							})
					}
				} else {
					vm.handleClose()
				}
				evt.preventDefault()
			},

			handleClose() {
				this.$nextTick(() => {
					this.$bvModal.hide('modal-rename-category')
				})
			}
		}
	}
</script>
