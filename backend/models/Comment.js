'use strict';

const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: DataTypes.STRING,
    });
    Comment.associate = function (models) {
        models.Comment.belongsTo(models.Post, { foreignKey: models.Post.postId });
        models.Comment.belongsTo(models.User, { foreignKey: models.User.userId });
    }
    return Comment;
}