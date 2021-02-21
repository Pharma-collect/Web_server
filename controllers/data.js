const db = require('../models');
const { QueryTypes } = require('sequelize');

exports.getFamousProducts = async function(req, res) {
    const {
        pharmacy_id
    } = req.body;

    if(!pharmacy_id){
        res.status(422).json({
            success: false,
            error: "Information manquante (pharmacy_id)"
        })
    } else {
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

            res.status(500).json({
                success: false,
                error: e
            })
        }

        if(products.length > 0){
            res.status(200).json({
                success: true,
                result: products,
            })
        } else {
            res.status(200).json({
                success: true,
                error: "Aucun produit n'a été acheté",
                result: products,
            })
        }
    }
}

exports.getSalesRevenue = async function(req, res) {
    const {
        pharmacy_id
    } = req.body;

    if(!pharmacy_id){
        res.status(422).json({
            success: false,
            error: "Information manquante"
        })
    } else {
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

            res.status(500).json({
                success: false,
                error: e
            })
        }

        if(!!revenue[0].sales_revenue){
            let final = Math.round(revenue[0].sales_revenue*100)/100;

            res.status(200).json({
                success: true,
                result: {sales_revenue: final},
            })
        } else {
            res.status(200).json({
                success: true,
                error: "Aucun produit n'a été acheté",
                result: {sales_revenue: revenue[0].sales_revenue},
            })
        }
    }
}
