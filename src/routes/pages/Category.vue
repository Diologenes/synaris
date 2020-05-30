<template>
	<div>Article</div>
</template>

<script>
export default {
	components: {},

	beforeRouteEnter(to, from, next) {
		next((vm) => {
			next()
			console.log('enter', to.params.category)

			// vm.$db.Collection.findAll({
			// 	order: [
			// 		['title', 'ASC'],
			// 		[db.Category, 'sorting', 'ASC']
			// 	],
			// 	include: [{ model: db.Category }]
			// })

			// vm.getCollection(to.params.category).then(() => {
			// })
		})
	},
	beforeRouteUpdate(to, from, next) {
		let vm = this
		console.log(to.params.category)
		// this.getCollection(to.params.collectionId).then(() => {
		// 	vm.scrollTop()
		// })
		next()
	},
	mounted() {},
	methods: {}
}
</script>
