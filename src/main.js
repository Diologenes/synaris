import './assets/sass/app.scss'
import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
import { router } from './routes/routes'
import BootstrapVue from 'bootstrap-vue'

require('./components/components')
require('./directives/clickOutside')

const db = require('./database/models')

db.Group.findAll({
	where: {},
	include: [{ model: db.Library, as: db.Library.libraries }]
}).then((groups) => {
	console.log('All users:', JSON.stringify(groups, null, 40))
})

// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log('Connection has been established successfully.')

// 		const Model = Sequelize.Model
// 		class Library extends Model {}
// 		Library.init(
// 			{
// 				title: Sequelize.STRING,
// 				parent: Sequelize.INTEGER,
// 				sorting: Sequelize.INTEGER
// 			},
// 			{
// 				sequelize,
// 				modelName: 'library',
// 				underscored: true
// 			}
// 		)

// 		class Group extends Model {}
// 		Group.init(
// 			{
// 				title: Sequelize.STRING,
// 				sorting: Sequelize.INTEGER
// 			},
// 			{
// 				sequelize,
// 				modelName: 'group',
// 				underscored: true
// 			}
// 		)

// 		Group.hasMany(Library)
// 		Library.belongsTo(Group)

// 		// Group.sync({ force: true }).then(() => {
// 		// 	Group.create({ title: 'Basic' })
// 		// 	Group.create({ title: 'Advanced' })
// 		// })

// 		// // Note: using `force: true` will drop the table if it already exists
// 		// Library.sync({ force: true }).then(() => {
// 		//     Library.create({ title: 'PHP', groupId: 1 })
// 		//     Library.create({ title: 'JS', groupId: 2 })
// 		//     Library.create({ title: 'CSS', groupId: 2 })
// 		//     Library.create({ title: 'TYPO3', groupId: 2 })
// 		// })

// 		// Find all users
// 		Group.findAll({
// 			where: {},
// 			include: [{ model: Library, as: Library.libraries }]
// 		}).then((groups) => {
// 			console.log('All users:', JSON.stringify(groups, null, 40))
// 		})
// 	})
// 	.catch((err) => {
// 		console.error('Unable to connect to the database:', err)
// 	})

Vue.use(BootstrapVue)

new Vue({
	store: store,
	router: router,
	render: (h) => h(App)
}).$mount('#app')
