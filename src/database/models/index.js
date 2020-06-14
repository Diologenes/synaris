import Sequelize from 'sequelize'
import Collection from './Collection'
import Category from './Category'
import Article from './Article'
import electronFileStorage from '@/store/electron/Index'
import dbInstaller from '@/database/installer/Install'

dbInstaller()

const sequelize = new Sequelize({
	dialect: electronFileStorage.get('databaseDialect'),
	storage: electronFileStorage.get('sqlitePath')
})

const models = {
	Collection: Collection.init(sequelize, Sequelize),
	Category: Category.init(sequelize, Sequelize),
	Article: Article.init(sequelize, Sequelize)
}

Object.values(models)
	.filter(model => typeof model.associate === 'function')
	.forEach(model => model.associate(models))

const db = {
	...models,
	Sequelize,
	sequelize
}

export default db
