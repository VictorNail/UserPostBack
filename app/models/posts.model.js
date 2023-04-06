module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("Posts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      content: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    }, {
      timestamps: false // ne pas inclure les champs createdAt et updatedAt
    });
  
    return Posts;
  };