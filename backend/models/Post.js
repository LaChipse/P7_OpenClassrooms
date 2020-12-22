'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    postDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    modifyDAte: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
  });
  Post.associate = function(models) {
    models.Post.belongsTo(models.User, {
    foreignKey: models.User.userId
  });
  models.Post.hasMany(models.Comment,{
    onDelete:"CASCADE"
  })
  }
  return Post;
}