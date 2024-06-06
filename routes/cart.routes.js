const express = require('express');
const cartRoutes =  express.Router();
const {addNewCart} = require('../controller/cart.controller');
const verifyToken = require('../helpers/verifyToken');

cartRoutes.post("/add-cart",verifyToken,addNewCart);





module.exports = cartRoutes;