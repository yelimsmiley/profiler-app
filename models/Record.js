// models/Record.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Record', {
      core: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  };
  