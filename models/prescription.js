/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prescription', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('pending','ready','container','finish'),
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
    id_pharmacy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pharmacy',
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
    detail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image_url: {
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
    tableName: 'prescription',
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
        name: "prescription_client_id",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
      {
        name: "prescription_pharmacy_id",
        using: "BTREE",
        fields: [
          { name: "id_pharmacy" },
        ]
      },
      {
        name: "prescription_pro_id",
        using: "BTREE",
        fields: [
          { name: "id_preparator" },
        ]
      },
    ]
  });
};
