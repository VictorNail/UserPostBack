module.exports = (sequelize, Sequelize) => {
  const Reports = sequelize.define(
    "Reports",
    {
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "posts",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      reason: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false, // ne pas inclure les champs createdAt et updatedAt
    }
  );

  return Reports;
};
