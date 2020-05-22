'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    title: DataTypes.STRING,
    sorting: DataTypes.INTEGER
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};