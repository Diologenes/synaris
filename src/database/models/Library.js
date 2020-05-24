const Sequelize = require('sequelize')

class Library extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				title: DataTypes.STRING,
				folderId: DataTypes.INTEGER,
				sorting: DataTypes.INTEGER
			},
			{ sequelize, tableName: 'Libraries', modelName: 'library' }
		)
	}
	static associate(models) {
		this.myAssociation = this.belongsTo(models.Folder)
	}
}

module.exports = Library
