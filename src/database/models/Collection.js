const Sequelize = require('sequelize')

class Collection extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				title: DataTypes.STRING,
				sorting: DataTypes.INTEGER
			},
			{ sequelize, tableName: 'Collections', modelName: 'collection' }
		)
	}
	static associate(models) {
		this.myAssociation = this.hasMany(models.Category, { onDelete: 'cascade', hooks: true })
	}
}

module.exports = Collection
