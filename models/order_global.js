/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_global', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('pending','ready','container','finish'),
      allowNull: true
    },
    total_price: {
      type: DataTypes.FLOAT,
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
    id_pharmacy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pharmacy',
        key: 'id'
      }
    },
    id_prescription: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'prescription',
        key: 'id'
      }
    },
    detail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    order_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'order_global',
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
        name: "order_client_id",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
      {
        name: "order_container",
        using: "BTREE",
        fields: [
          { name: "id_container" },
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
        name: "order_pharmacie_id",
        using: "BTREE",
        fields: [
          { name: "id_pharmacy" },
        ]
      },
      {
        name: "order_prescription",
        using: "BTREE",
        fields: [
          { name: "id_prescription" },
        ]
      },
    ]
  });
};
