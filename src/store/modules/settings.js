import { BFormCheckboxGroup } from "bootstrap-vue"

// default state
const getDefaultState = () => {
	return {
		categoryWindowWidth: localStorage.getItem('categoryWindowWidth') || '16rem',
		articleListWindowWidth: localStorage.getItem('articleListWindowWidth') || '25rem',
		collapsedCollections: JSON.parse(localStorage.getItem('collapsedCollections')) || []
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
	}
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

	modifyCollapsedCollection({commit, state}, value) {
		let indexExists = state.collapsedCollections.indexOf(value)
		if (indexExists === -1) {
			state.collapsedCollections.push(value)
		} else {
			state.collapsedCollections.splice(indexExists, 1)
		}
		commit('collapsedCollections', state.collapsedCollections)
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
