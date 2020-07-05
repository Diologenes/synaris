import Sequelize from 'sequelize'
import Collection from './Collection'
import Category from './Category'
import Article from './Article'
import electronFileStorage from '@/store/electron/Index'

const sequelize = new Sequelize({
	dialect: electronFileStorage.get('databaseDialect'),
	storage: electronFileStorage.get('sqlitePath'),
	logging: true
})

sequelize
	.authenticate()
	.then(() => {
		console.log('Database connection has been established successfully.')
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})

const models = {
	Collection: Collection.init(sequelize, Sequelize),
	Category: Category.init(sequelize, Sequelize),
	Article: Article.init(sequelize, Sequelize)
}

Object.values(models)
	.filter(model => typeof model.associate === 'function')
	.forEach(model => model.associate(models))

const syncOptions = {
	// alter: true
}	
sequelize.sync(syncOptions)

const db = {
	...models,
	Sequelize,
	sequelize
}

export default db
