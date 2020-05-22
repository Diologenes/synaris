const Sequelize = require('sequelize')

class Group extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				title: DataTypes.STRING,
				sorting: DataTypes.INTEGER
			},
			{ sequelize }
		)
	}
	static associate(models) {
		this.myAssociation = this.hasMany(models.Library)
	}
}

module.exports = Group
