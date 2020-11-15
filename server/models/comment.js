module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
  });



  //The comments have to be associated to both the users that wrote them, and the post that they are commenting on
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });

    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Comment;
};
