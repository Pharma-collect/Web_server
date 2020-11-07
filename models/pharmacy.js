/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pharmacy', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    has_shop: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    road_nb: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    road: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    post_code: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    boss: {
      type: DataTypes.STRING(80),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pharmacy',
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
    ]
  });
};
