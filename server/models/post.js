module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postBody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
  });

  Post.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Post.hasMany(models.Like, {
      onDelete: "cascade",
    });

    Post.hasMany(models.Comment, {
      onDelete: "cascade",
    });
  };

  return Post;
};
