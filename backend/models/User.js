'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    imageUrl: { type: DataTypes.STRING, defaultValue: "https://asbl.cefig.be/wp-content/uploads/2017/05/630729-200.png" },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  User.associate = function (models) {
    models.User.hasMany(models.Post, {
      onDelete: "CASCADE"
    });
    models.User.hasMany(models.Comment, {
      onDelete: "CASCADE"
    })
  };
  return User;
};