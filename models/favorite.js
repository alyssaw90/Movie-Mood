"use strict";

module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    movieId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return favorite;
};
