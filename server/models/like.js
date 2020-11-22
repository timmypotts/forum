module.exports = function (sequelize, DataTypes) {
  var Like = sequelize.define("Like", {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    CommentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  //The comments have to be associated to both the users that wrote them, and the post that they are commenting on
  Like.associate = function (models) {
    Like.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });

    Like.belongsTo(models.Post, {
      foreignKey: {
        allowNull: true,
      },
    });

    Like.belongsTo(models.Comment, {
      foreignKey: {
        allowNull: true,
      },
    });
  };

  return Like;
};
