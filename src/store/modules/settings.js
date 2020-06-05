
// default state
const getDefaultState = () => {
	return {
		categoryWindowWidth: localStorage.getItem('categoryWindowWidth') || '16rem',
		articleListWindowWidth: localStorage.getItem('articleListWindowWidth') || '25rem',
		collapsedCollections: JSON.parse(localStorage.getItem('collapsedCollections')) || [],
		filterShowDescription: JSON.parse(localStorage.getItem('filterShowDescription')) || true,
		filterShowDate: JSON.parse(localStorage.getItem('filterShowDate')) || true,
		filterOrderBy: JSON.parse(localStorage.getItem('filterOrderBy')) || 'title',
		filterReverseOrder: JSON.parse(localStorage.getItem('filterReverseOrder')) || false
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
	},

	collapsedCollections(state) {
		return state.collapsedCollections
	},

	filterShowDescription(state) {
		return state.filterShowDescription
	},

	filterShowDate(state) {
		return state.filterShowDate
	},

	filterOrderBy(state) {
		return state.filterOrderBy
	},

	filterReverseOrder(state) {
		return state.filterReverseOrder
	}
}

// mutations
const mutations = {
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},

	categoryWindowWidth(state, value) {
		localStorage.setItem('categoryWindowWidth', value)
		state.categoryWindowWidth = value
	},

	articleListWindowWidth(state, value) {
		localStorage.setItem('articleListWindowWidth', value)
		state.articleListWindowWidth = value
	},

	collapsedCollections(state, value) {
		localStorage.setItem('collapsedCollections', JSON.stringify(value))
		state.collapsedCollections = value
	},

	filterShowDescription(state, value) {
		localStorage.setItem('filterShowDescription', JSON.stringify(value))
		state.filterShowDescription = value
	},

	filterShowDate(state, value) {
		localStorage.setItem('filterShowDate', JSON.stringify(value))
		state.filterShowDate = value
	},

	filterOrderBy(state, value) {
		localStorage.setItem('filterOrderBy', JSON.stringify(value))
		state.filterOrderBy = value
	},

	filterReverseOrder(state, value) {
		localStorage.setItem('filterReverseOrder', JSON.stringify(value))
		state.filterReverseOrder = value
	},
}

// actions
const actions = {
	resetStore(context) {
		context.commit('resetStore')
	},

	categoryWindowWidth(context, value) {
		context.commit('categoryWindowWidth', value)
	},

	articleListWindowWidth(context, value) {
		context.commit('articleListWindowWidth', value)
	},

	modifyCollapsedCollection({ commit, state }, value) {
		let indexExists = state.collapsedCollections.indexOf(value)
		if (indexExists === -1) {
			state.collapsedCollections.push(value)
		} else {
			state.collapsedCollections.splice(indexExists, 1)
		}
		commit('collapsedCollections', state.collapsedCollections)
	},

	filterShowDescription(context, value) {
		context.commit('filterShowDescription', value)
	},

	filterShowDate(context, value) {
		context.commit('filterShowDate', value)
	},

	filterOrderBy(context, value) {
		context.commit('filterOrderBy', value)
	},

	filterReverseOrder(context, value) {
		context.commit('filterReverseOrder', value)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
