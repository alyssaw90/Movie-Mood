"use strict";

module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    movieId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.favorite.belongsTo(models.user)
      }
    }
  });

  return favorite;
};
