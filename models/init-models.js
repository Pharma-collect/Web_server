var DataTypes = require("sequelize").DataTypes;
var _container = require("./container");
var _order = require("./order");
var _order_detail = require("./order_detail");
var _pharmacy = require("./pharmacy");
var _product = require("./product");
var _qrcode = require("./qrcode");
var _user_client = require("./user_client");
var _user_pro = require("./user_pro");

function initModels(sequelize) {
  var container = _container(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_detail = _order_detail(sequelize, DataTypes);
  var pharmacy = _pharmacy(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var qrcode = _qrcode(sequelize, DataTypes);
  var user_client = _user_client(sequelize, DataTypes);
  var user_pro = _user_pro(sequelize, DataTypes);

  container.belongsTo(pharmacy, { foreignKey: "id_pharmacy"});
  pharmacy.hasMany(container, { foreignKey: "id_pharmacy"});
  order.belongsTo(user_client, { foreignKey: "id_client"});
  user_client.hasMany(order, { foreignKey: "id_client"});
  order.belongsTo(user_pro, { foreignKey: "id_preparator"});
  user_pro.hasMany(order, { foreignKey: "id_preparator"});
  order.belongsTo(container, { foreignKey: "id_container"});
  container.hasMany(order, { foreignKey: "id_container"});
  order.belongsTo(qrcode, { foreignKey: "id_qrcode"});
  qrcode.hasMany(order, { foreignKey: "id_qrcode"});
  order.belongsTo(pharmacy, { foreignKey: "id_pharmacy"});
  pharmacy.hasMany(order, { foreignKey: "id_pharmacy"});
  order_detail.belongsTo(product, { foreignKey: "id_product"});
  product.hasMany(order_detail, { foreignKey: "id_product"});
  order_detail.belongsTo(order, { foreignKey: "id_order"});
  order.hasMany(order_detail, { foreignKey: "id_order"});
  user_pro.belongsTo(pharmacy, { foreignKey: "pharmacy_id"});
  pharmacy.hasMany(user_pro, { foreignKey: "pharmacy_id"});

  return {
    container,
    order,
    order_detail,
    pharmacy,
    product,
    qrcode,
    user_client,
    user_pro,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
