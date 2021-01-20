const db = require('../models');
const { QueryTypes } = require('sequelize');

exports.getFamousProducts = async function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    let products;

    try {
        products = await db.sequelize.query(
                "SELECT id_product, title, price, description, image_url, id_pharmacy, SUM(quantity) as total_qty\n" +
                "FROM order_detail, product \n" +
                "WHERE order_detail.id_product = product.id AND id_pharmacy = "+pharmacy_id+" \n" +
                "GROUP BY id_product\n" +
                "ORDER BY total_qty DESC \n" +
                "LIMIT 5", { type: QueryTypes.SELECT }
            );
    } catch (e) {
        console.log(e)
    }

    if(products.length > 0){
        res.json({
            success: true,
            result: products,
        })
    } else {
        res.json({
            success: true,
            error: "Aucun produit n'a été acheté",
            result: products,
        })
    }
}

exports.getSalesRevenue = async function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    let revenue;

    try {
        revenue = await db.sequelize.query(
            "SELECT SUM(total_price) as sales_revenue \n" +
            "FROM order_global \n"+
            "WHERE id_pharmacy = "+pharmacy_id+"\n"+
            "LIMIT 1", { type: QueryTypes.SELECT }
        );
    } catch (e) {
        console.log(e)
    }

    if(!!revenue[0].sales_revenue){
        let final = Math.round(revenue[0].sales_revenue*100)/100;

        res.json({
            success: true,
            result: {sales_revenue: final},
        })
    } else {
        res.json({
            success: true,
            error: "Aucun produit n'a été acheté",
            result: {sales_revenue: revenue[0].sales_revenue},
        })
    }
}
