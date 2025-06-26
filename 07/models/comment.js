// models/comment.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: DataTypes.TEXT,
    },
    {
      tableName: "comments",
    }
  );
  Comment.associate = function (models) {
    //models: db
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
    });
  };
  return Comment;
};