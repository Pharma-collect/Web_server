/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order_detail',
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
        name: "order_detail_product_id",
        using: "BTREE",
        fields: [
          { name: "id_product" },
        ]
      },
      {
        name: "order_detail_order_id",
        using: "BTREE",
        fields: [
          { name: "id_order" },
        ]
      },
    ]
  });
};
