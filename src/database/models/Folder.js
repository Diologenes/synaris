const Sequelize = require('sequelize')

class Folder extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				title: DataTypes.STRING,
				sorting: DataTypes.INTEGER
			},
			{ sequelize, tableName: 'Folders', modelName: 'folder' }
		)
	}
	static associate(models) {
		this.myAssociation = this.hasMany(models.Library)
	}
}

module.exports = Folder
