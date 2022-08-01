'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    static associate(models) {
      Task.belongsTo(models.User, {
        as: "user",
        foreignKey: 'userId',
      });
    }

  }
  Task.init({
    uuid: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      allowNull: false
    },
    name: { type: DataTypes.STRING },
    done: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    },

  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true
  });

  return Task;
};