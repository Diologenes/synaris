
// default state
const getDefaultState = () => {
	return {
		categoryWindowWidth: localStorage.getItem('categoryWindowWidth') || '16rem',
		articleListWindowWidth: localStorage.getItem('articleListWindowWidth') || '25rem'
	}
}

// state
const state = getDefaultState()

// getters
const getters = {
	categoryWindowWidth(state) {
		return state.categoryWindowWidth
	},
	articleListWindowWidth(state) {
		return state.articleListWindowWidth
	}
}

// mutations
const mutations = {
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},

	categoryWindowWidth(state, value) {
		state.categoryWindowWidth = value
	},
	articleListWindowWidth(state, value) {
		state.articleListWindowWidth = value
	}
}

// actions
const actions = {
	resetStore(context) {
		context.commit('resetStore')
	},

	categoryWindowWidth(context, value) {
		context.commit('categoryWindowWidth', value)
		localStorage.setItem('categoryWindowWidth', value)
	},
	articleListWindowWidth(context, value) {
		context.commit('articleListWindowWidth', value)
		localStorage.setItem('articleListWindowWidth', value)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
