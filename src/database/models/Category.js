const Sequelize = require('sequelize')

class Category extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				title: DataTypes.STRING,
				folderId: DataTypes.INTEGER,
				sorting: DataTypes.INTEGER
			},
			{ sequelize, tableName: 'Categories', modelName: 'category' }
		)
	}
	static associate(models) {
		this.myAssociation = this.belongsTo(models.Folder, { onDelete: 'cascade' })
	}
}

module.exports = Category
