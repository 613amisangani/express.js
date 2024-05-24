const express = require("express");
const productRoutes = express.Router();
const {
    CreateProduct,
    getAllProduct,
    getProduct,
    replaceProduct,
    updateProduct,
    deleteProduct,
} = require('../controller/product.controller');

//crud 

//for json data add

productRoutes.post("/", CreateProduct);

//for data read

productRoutes.get("/", getAllProduct);

//for read specific data

productRoutes.get("/:id" ,getProduct);

//for data replace

productRoutes.put("/id", replaceProduct);


//for data update

productRoutes.patch("/:id", updateProduct);

//for data delete

productRoutes.delete("/:id", deleteProduct);

module.exports = productRoutes;
