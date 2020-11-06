/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_pro', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    pharmacy_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pharmacy',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_pro',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_pro_pharmacy_id",
        using: "BTREE",
        fields: [
          { name: "pharmacy_id" },
        ]
      },
    ]
  });
};
