'use strict';
module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    title: DataTypes.STRING,
    parent: DataTypes.INTEGER,
    sorting: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});
  Library.associate = function(models) {
    // associations can be defined here
  };
  return Library;
};