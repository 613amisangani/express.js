const express = require("express");
const UserRoutes = express.Router();
const {
    CreateUser,
    getAllUser,
    getUser,
    updateUser,
    replaceUser,
    deleteUser,

} = require('../controller/User.controller');

UserRoutes.post('/',CreateUser);

UserRoutes.get('/',getAllUser);

UserRoutes.get('/:id',getUser);

UserRoutes.put('/:id',replaceUser);

UserRoutes.patch('/:id',updateUser);

UserRoutes.delete('/:id',deleteUser);

module.exports = UserRoutes;











