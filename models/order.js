/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    detail: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_client',
        key: 'id'
      }
    },
    id_preparator: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_pro',
        key: 'id'
      }
    },
    id_container: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'container',
        key: 'id'
      }
    },
    id_qrcode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'qrcode',
        key: 'id'
      }
    },
    id_pharmacy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pharmacy',
        key: 'id'
      }
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order',
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
        name: "order_qr_id",
        using: "BTREE",
        fields: [
          { name: "id_qrcode" },
        ]
      },
      {
        name: "order_client_id",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
      {
        name: "order_preparator",
        using: "BTREE",
        fields: [
          { name: "id_preparator" },
        ]
      },
      {
        name: "order_pharmacie_id",
        using: "BTREE",
        fields: [
          { name: "id_pharmacy" },
        ]
      },
      {
        name: "order_container",
        using: "BTREE",
        fields: [
          { name: "id_container" },
        ]
      },
    ]
  });
};
