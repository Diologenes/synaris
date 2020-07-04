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
		data() {
			return {
				articleId: null,
				categoryId: null
			}
		},
		methods: {
			async handleOk(evt) {
				let vm = this
				vm.articleId = vm.item.id
				vm.categoryId = vm.item.categoryId
				let promises = []
				await vm.item.destroy().then(() => {
					promises.push(vm.$store.dispatch('article/getByCategory', { category: vm.categoryId }))
					promises.push(vm.$store.dispatch('collection/getAll'))
				})
				Promise.all(promises).then(() => {
					vm.redirectOnSelfDelete()
					vm.handleClose()
				})
				evt.preventDefault()
			},

			redirectOnSelfDelete() {
				if (this.articleId === this.$route.params.article) {
					this.$router.push({ name: 'articleList', params: { category: this.categoryId } })
				}
			},

			handleClose() {
				this.$nextTick(() => {
					this.$bvModal.hide('modal-delete-article')
				})
			}
		}
	}
</script>
