// const products = require('../public/data.json')
const Product = require('../model/product.model')

exports.CreateProduct = async (req, res) => {  
    let product = await Product.create({...req.body})
    res.status(201).json({ product,message: 'new product is addedd.....' })
}

exports.getAllProduct =  async (req, res) => {  
    const products = await Product.find()
    res.status(200).json(products);
}

// exports.getProduct = (req, res) => {  
//     // console.log(typeof(id))
//     const id = +req.params.id;
//     const item = products.find((e) => e.id === id)
//     res.status(200).json(item);
// }

// exports.replaceProduct = (req, res) => {  
//     // console.log(typeof(id))
//     const id = +req.params.id;
//     const itemindex = products.findIndex((e) => e.id === id)
//     // const product = products[itemindex]
//     products.splice(itemindex,1,{...req.body})
//     res.status(200).json({message:'product is replaced....'});
// }

// exports.updateProduct = (req, res) => {  
//     // console.log(typeof(id))
//     const id = +req.params.id;
//     const itemindex = products.findIndex((e) => e.id === id)
//      const product = products[itemindex]
//     products.splice(itemindex,1,{...product,...req.body})
//     res.status(200).json({message:'product is updated....'});
// }

// exports.deleteProduct = (req, res) => {  
//     // console.log(typeof(id))
//     const id = +req.params.id;
//     const itemindex = products.findIndex((e) => e.id === id)
//     //  const product = products[itemindex]
//     products.splice(itemindex,1)
//     res.status(200).json({message:'product is deleted....'});
// }