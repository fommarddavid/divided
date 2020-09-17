'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.Group, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE'
      })
      Expense.belongsTo(models.Member, {
        foreignKey: 'memberId',
        onDelete: 'CASCADE'
      })
    }
  };
  Expense.init({
    name: DataTypes.STRING,
    value: DataTypes.FLOAT,
    groupId: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};