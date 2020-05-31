const Sequelize = require('sequelize')

class Category extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				title: {
					type: DataTypes.STRING,
					validate: {
						notEmpty: true
					}
				},
				collectionId: {
					type: DataTypes.INTEGER
				},
				sorting: {
					type: DataTypes.INTEGER
				}
			},
			{ sequelize, tableName: 'Categories', modelName: 'category' }
		)
	}
	static associate(models) {
		this.myAssociation = this.belongsTo(models.Collection, { onDelete: 'cascade' })
		this.myAssociation2 = this.hasMany(models.Article, { onDelete: 'cascade' })
	}
}

module.exports = Category
