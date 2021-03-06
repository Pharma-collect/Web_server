const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');


//routes declaration
const user_client_routes = require("./routes/user_client");
const user_pro_routes = require("./routes/user_pro");
const pharmacy_routes = require("./routes/pharmacy");
const container_routes = require("./routes/container");
const order_routes = require("./routes/order");
const product_routes = require("./routes/product");
const order_detail_routes = require("./routes/order_detail");
const upload_routes = require("./routes/upload");
const prescription_routes = require("./routes/prescription");
const data_routes = require("./routes/data");


const app = express(); //create express application

//principal middleware element
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname,'tmp'),
}));

//routes utilisation
app.use('/api/user_client', user_client_routes);
app.use('/api/user_pro', user_pro_routes);
app.use('/api/pharmacy', pharmacy_routes);
app.use('/api/container', container_routes);
app.use('/api/order', order_routes);
app.use('/api/product', product_routes);
app.use('/api/order_detail', order_detail_routes);
app.use('/api/upload', upload_routes)
app.use('/api/get_file', express.static("uploads"));
app.use('/api/prescription', prescription_routes);
app.use('/api/data', data_routes);





module.exports = app;
