const Sequelize = require('sequelize')

class Article extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				title: {
					type: DataTypes.STRING,
					validate: {
						notEmpty: true
					}
				},
				description: {
					type: Sequelize.STRING
				},
				content: {
					type: Sequelize.TEXT
				},
				tags: {
					type: Sequelize.TEXT
				},
				categoryId: {
					type: DataTypes.INTEGER
				},
				sorting: {
					type: DataTypes.INTEGER
				}
			},
			{ sequelize, tableName: 'Articles', modelName: 'article' }
		)
	}
	static associate(models) {
		this.myAssociation = this.belongsTo(models.Category, { onDelete: 'cascade' })
	}
}

module.exports = Article
