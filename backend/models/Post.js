'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    avatar: DataTypes.STRING,
  });
  Post.associate = function (models) {
    models.Post.belongsTo(models.User, {
      foreignKey: models.User.userId
    });
    models.Post.hasMany(models.Comment, {
      onDelete: "CASCADE"
    })
  }
  return Post;
}