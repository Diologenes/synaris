const constants = {
	defaults: {
		store: {
			settings: {
				categoryWindowWidth: '16rem',
				articleListWindowWidth: '25rem',
				filterShowDescription: true,
				filterShowDate: true,
				filterShowTags: true,
				filterOrderBy: 'title',
				filterReverseOrder: false,
				markNewUntilDays: 1
			}
		}
	},
	router: {
		belongsTo: {
			library: 'library'
		}
	}
}

export default constants
