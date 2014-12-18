"use strict";

var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6,20],
          msg: "Please use a passowrd between 6 and 20 characters"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.favorite)
      }
    },
    hooks: {
      beforeCreate: function(data, garbage, sendback){
        var pwdToEncrypt = data.password;
        bcrypt.hash(pwdToEncrypt, 10 , function(err,hash){
          data.password = hash
          sendback(null, data)
        })
      }
    }
});

  return user;
};
