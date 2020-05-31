const db = require('@/database/models')

// default state
const getDefaultState = () => {
	return {
		collections: null
	}
}

// state
const state = getDefaultState()

// getters
const getters = {
	collections(state) {
		return state.collections
	}
}

// mutations
const mutations = {
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},

	collections(state, value) {
		state.collections = value
	}
}

// actions
const actions = {
	resetStore(context) {
		context.commit('resetStore')
	},

	update(context, value) {
		context.commit('collections', value)
	},

	getAll(context) {
		let vm = this
		return new Promise((resolve) => {
			db.Collection.findAll({
				order: [
					['sorting', 'ASC'], // order Collections.sorting first
					[db.Category, 'sorting', 'ASC'] // order Categories.sorting second
				],
				group: ['Categories.id'], // group by Categories.id
				include: [
					{
						model: db.Category, // join Categories
						attributes: [
							'id',
							'title',
							'sorting',
							'collectionId',
							[db.sequelize.literal('(SELECT COUNT(*) FROM "Articles" WHERE "Articles"."categoryId" = "categories"."id")'), 'articleCount'] // subquery to get count of articles
						]
					}
				]
			})
				.then((response) => {
					context.commit('collections', response)
					resolve(response)
				})
				.catch((e) => console.error(e))
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
