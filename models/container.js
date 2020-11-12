/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('container', {
    id: {
      autoIncrement:true, 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    container_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_pharmacy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pharmacy',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'container',
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
        name: "container_pharmacy_id",
        using: "BTREE",
        fields: [
          { name: "id_pharmacy" },
        ]
      },
    ]
  });
};
