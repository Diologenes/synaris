// default state
const getDefaultState = () => {
	return {
		channels: null,
		selected: null
	}
}

// state
const state = getDefaultState()

// getters
const getters = {

	// get workspaces
	channels(state) {
		return state.channels
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
		state.channels = value
	},

	// selected
	selected(state, value) {
		state.selected = value
	}

}

// actions
const actions = {

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
