const express = require("express");
const cartRoutes = express.Router();
const {
    CreateUser,
    getAllUser,
    getUser,
    updateUser,
    replaceUser,
    deleteUser,

} = require('../controller/cart.controller');

cartRoutes.post('/',CreateUser);

cartRoutes.get('/',getAllUser);

cartRoutes.get('/:id',getUser);

cartRoutes.put('/:id',replaceUser);

cartRoutes.patch('/:id',updateUser);

cartRoutes.delete('/:id',deleteUser);

module.exports = cartRoutes;











