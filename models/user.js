"use strict";

var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 50],
          msg: "Please enter name between 2 and 20 characters."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Please enter a valid email address."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6,20],
          msg: "Please use a passowrd between 6 and 20 characters."
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
