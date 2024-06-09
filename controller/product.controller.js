// const products = require('../public/data.json')
// const Product = require('../model/product.model')
const { query } = require('express');
const productServices = require('../services/product.service');
const productService = new productServices();

// add product
exports.CreateProduct = async (req, res) => {  
        let product = await productService.addProduct({...req.body})
        res.status(201).json({ product,message: 'new product is addedd.....' })
    }


    // get all product

exports.getAllProduct =  async (req, res) => {  
    const products = await productService.getAllProduct({isDelete : false});
    res.status(200).json(products);
}

//get single product

exports.getProduct = async (req, res) => {  
    // console.log(typeof(id))
    // const id = req.params.id;
    const id = req.query.brand;

    //  const item =  await Product.findById(id);
     const item =  await productService.getProduct({brand: id})
    if(!item){
        return res.json({message : "product is not found...."});
    }
    res.status(200).json(item);
}





exports.updateProduct = async (req,res) => {
    const id = req.params.id;
    let product = await productService.getProduct(id);
    // console.log(product);
    if(!product){
        return res.json({meassage : 'Product is Not Found...!!!'});
    }
    // product = await ProductModel.findOneAndUpdate({_id:id},{$set : {...req.body}},{new:true});
    product = await productService.updateProduct(id,{...req.body});
    console.log(product);
    res.status(200).json({product, message : "Product is Updated..."});
 };



exports.deleteProduct = async (req, res) => {  
    // console.log(typeof(id))
    const id = req.params.id;
    let product = await productService.getProduct(id);
    // let product = await Product.findById(id);
    if(!product){
        return res.json({message : "product is not found...."});
    }
    //  product = await product.findOneAndUpdate({_id:id},{$set:{...req.body}}, {new:true})
    // product = await productService.deleteProduct(id,{...req.body})

      product = await productService.deleteProduct(id,{...req.body})

    console.log(product)
    res.status(200).json({message:'product is deleted....'});
}