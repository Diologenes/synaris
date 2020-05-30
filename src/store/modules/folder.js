const db = require('@/database/models')

// default state
const getDefaultState = () => {
	return {
		folders: null,
	}
}

// state
const state = getDefaultState()

// getters
const getters = {
	folders(state) {
		return state.folders
	},
}

// mutations
const mutations = {
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},

	folders(state, value) {
		state.folders = value
	},
}

// actions
const actions = {
	resetStore(context) {
		context.commit('resetStore')
	},

	update(context, value) {
		context.commit('folders', value)
	},

	getAll(context) {
		let vm = this
		return new Promise((resolve) => {
			db.Folder.findAll({
				order: [
					['sorting', 'ASC'],
					[db.Category, 'sorting', 'ASC']
				],
				include: [{ model: db.Category }]
			})
				.then((response) => {
					context.commit('folders', response)
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
