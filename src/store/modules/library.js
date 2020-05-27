const db = require('@/database/models')

// default state
const getDefaultState = () => {
	return {
		libraries: null,
		selected: null
	}
}

// state
const state = getDefaultState()

// getters
const getters = {
	// get libraries
	libraries(state) {
		return state.libraries
	},

	// get selected
	selected(state) {
		return state.selected
	}
}

// mutations
const mutations = {
	// resets the state
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},

	// channels
	libraries(state, value) {
		state.libraries = value
	},

	// selected
	selected(state, value) {
		state.selected = value
	}
}

// actions
const actions = {
	// resets the complete store
	resetStore(context) {
		context.commit('resetStore')
	},

	// update channels (used by draggable)
	update(context, value) {
		context.commit('libraries', value)
	},

	getAll(context) {
		let vm = this
		return new Promise((resolve) => {
			db.Folder.findAll({
				order: [
					['sorting', 'ASC'],
					[db.Library, 'sorting', 'ASC']
				],
				include: [{ model: db.Library }]
			})
				.then((response) => {
					context.commit('libraries', response)
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
