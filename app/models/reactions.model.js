module.exports = (sequelize, Sequelize) => {
  const Reactions = sequelize.define(
    "Reactions",
    {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          isIn: [["LIKE", "DISLIKE"]],
        },
      },
    },
    {
      timestamps: false, // ne pas inclure les champs createdAt et updatedAt
      underscored: true, // utiliser le nommage snake_case pour les colonnes
    }
  );

  return Reactions;
};
