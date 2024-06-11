const express = require("express");
const orderRoutes = express.Router();
const{createNewOrder,getAllOrder}= require('../controller/order.controller');
const verifyToken = require("../helpers/verifyToken");

orderRoutes.post("/",verifyToken,createNewOrder);
orderRoutes.get("/",verifyToken,getAllOrder);


module.exports = orderRoutes;
