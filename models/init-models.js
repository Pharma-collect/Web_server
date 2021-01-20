var DataTypes = require("sequelize").DataTypes;
var _container = require("./container");
var _order_global = require("./order_global");
var _order_detail = require("./order_detail");
var _pharmacy = require("./pharmacy");
var _prescription = require("./prescription");
var _product = require("./product");
var _qrcode = require("./qrcode");
var _user_client = require("./user_client");
var _user_pro = require("./user_pro");

function initModels(sequelize) {
  var container = _container(sequelize, DataTypes);
  var order_global = _order_global(sequelize, DataTypes);
  var order_detail = _order_detail(sequelize, DataTypes);
  var pharmacy = _pharmacy(sequelize, DataTypes);
  var prescription = _prescription(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var qrcode = _qrcode(sequelize, DataTypes);
  var user_client = _user_client(sequelize, DataTypes);
  var user_pro = _user_pro(sequelize, DataTypes);

  container.belongsTo(pharmacy, { foreignKey: "id_pharmacy"});
  pharmacy.hasMany(container, { foreignKey: "id_pharmacy"});
  order_global.belongsTo(user_client, { foreignKey: "id_client"});
  user_client.hasMany(order_global, { foreignKey: "id_client"});
  order_global.belongsTo(user_pro, { foreignKey: "id_preparator"});
  user_pro.hasMany(order_global, { foreignKey: "id_preparator"});
  order_global.belongsTo(container, { foreignKey: "id_container"});
  container.hasMany(order_global, { foreignKey: "id_container"});
  order_global.belongsTo(pharmacy, { foreignKey: "id_pharmacy"});
  pharmacy.hasMany(order_global, { foreignKey: "id_pharmacy"});
  order_detail.belongsTo(product, { foreignKey: "id_product"});
  product.hasMany(order_detail, { foreignKey: "id_product"});
  order_detail.belongsTo(order_global, { foreignKey: "id_order"});
  order_global.hasMany(order_detail, { foreignKey: "id_order"});
  prescription.belongsTo(user_client, { foreignKey: "id_client"});
  user_client.hasMany(prescription, { foreignKey: "id_client"});
  prescription.belongsTo(pharmacy, { foreignKey: "id_pharmacy"});
  pharmacy.hasMany(prescription, { foreignKey: "id_pharmacy"});
  prescription.belongsTo(user_pro, { foreignKey: "id_preparator"});
  user_pro.hasMany(prescription, { foreignKey: "id_preparator"});
  prescription.belongsTo(order_global, { foreignKey: "id_order"});
  order_global.hasMany(prescription, { foreignKey: "id_order"});
  product.belongsTo(pharmacy, { foreignKey: "id_pharmacy"});
  pharmacy.hasMany(product, { foreignKey: "id_pharmacy"});
  qrcode.belongsTo(order_global, { foreignKey: "id_order"});
  order_global.hasMany(qrcode, { foreignKey: "id_order"});
  user_pro.belongsTo(pharmacy, { foreignKey: "pharmacy_id"});
  pharmacy.hasMany(user_pro, { foreignKey: "pharmacy_id"});

  return {
    container,
    order_global,
    order_detail,
    pharmacy,
    prescription,
    product,
    qrcode,
    user_client,
    user_pro,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
