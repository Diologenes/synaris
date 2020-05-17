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
	// get workspaces
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
	channels(state, value) {
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
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
