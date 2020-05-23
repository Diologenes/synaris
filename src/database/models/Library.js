const Sequelize = require('sequelize')

class Library extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				title: DataTypes.STRING,
				groupId: DataTypes.INTEGER,
				sorting: DataTypes.INTEGER
			},
			{ sequelize }
		)
	}
	static associate(models) {
		this.myAssociation = this.belongsTo(models.Group)
	}
}

module.exports = Library
