'use strict';

const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
const Comments = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    commentDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
    modifyDAte: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
    });
Comments.associate = function(models) {
    models.Comment.belongsTo(models.Post, { foreignKey: models.Post.postId });
    models.Comment.belongsTo(models.User, { foreignKey: models.User.userId });
}
    return Comments;
}