const db = require('@/database/models')
const Op = db.Sequelize.Op

// default state
const getDefaultState = () => {
	return {
		result: null,
		searchWord: ''
	}
}

// state
const state = getDefaultState()

// getters
const getters = {
	result(state) {
		return state.result
	},
	searchWord(state) {
		return state.searchWord
	},
}

// mutations
const mutations = {
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},
	result(state, value) {
		state.result = value
	},
	searchWord(state, value) {
		if (value !== '') {
			value.trim().replace(/\s{2,}/g, ' ')
		}
		state.searchWord = value
	}
}

// actions
const actions = {
	resetStore(context) {
		context.commit('resetStore')
	},

	resetResult(context) {
		context.commit('result', null)
	},

	setSearchWord(context, value) {
		context.commit('searchWord', value)
	},

	getResult(context) {
		return new Promise((resolve) => {
			let query = {}

			if (context.state.searchWord.length > 0) {
				// if searchword exists

				// clean up searchword(s) and split it into an array
				let searchWordArray = context.state.searchWord.split(' ')

				// build subqueries
				let subQuery = []
				searchWordArray.forEach((searchWord) => {
					searchWord = `%${searchWord}%`
					subQuery.push({
						[Op.or]: [
							{
								title: {
									[Op.like]: searchWord
								}
							},
							{
								description: {
									[Op.like]: searchWord
								}
							}
						]
					})
				})

				// make sure cleaned up array has elements
				if (searchWordArray.length > 0) {
					query[Op.and] = subQuery
				}
			}

			// query
			db.Article.findAll({
				where: query,
				order: [['isFavourite', 'DESC']]
			})
				.then((response) => {
					setTimeout(function() {
						context.commit('result', response)
						resolve(response)
					}, 0)
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
