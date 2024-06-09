const express = require("express");
const productRoutes = express.Router();
const {
    CreateProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../controller/product.controller');

//crud 

//for json data add

productRoutes.post("/", CreateProduct);

//for data read

productRoutes.get("/", getAllProduct);

// //for read specific data

 productRoutes.get("/single" ,getProduct);
//  productRoutes.get("/:id" ,getProduct);



// //for data update

productRoutes.put("/:id", updateProduct);
// productRoutes.put("/", updateProduct);


// //for data delete

 productRoutes.delete("/:id", deleteProduct);

module.exports = productRoutes;
