// const products = require('../public/data.json')
const Product = require('../model/product.model')

exports.CreateProduct = async (req, res) => {  
    let product = await Product.create({...req.body,isDelete:false})
    res.status(201).json({ product,message: 'new product is addedd.....' })
}

exports.getAllProduct =  async (req, res) => {  
    const products = await Product.find()
    res.status(200).json(products);
}




exports.getProduct = async (req, res) => {  
    // console.log(typeof(id))
    const id = req.params.id;
    // const id = req.query.id;

     const item =  await Product.findById(id);
    //  const item =  await Product.findOne({brand: id})
    if(!item){
        return res.json({message : "product is not found...."});
    }
    res.status(200).json(item);
}



exports.updateProduct = async (req, res) => {  
    // console.log(typeof(id))
    const id = req.params.id;
    let product = await Product.findById(id);
    if(!product){
        return res.json({message : "product is not found...."});
    }
    // product = await product.findOneAndUpdate({_id:id},{$set:{...req.body}}, {new:true})
     product = await Product.findByIdAndUpdate(id, {$set:{...req.body}}, {new:true})

    console.log(product)
    res.status(200).json({product,message:'product is updated....'});
}

exports.deleteProduct = async (req, res) => {  
    // console.log(typeof(id))
    const id = req.params.id;
    let product = await Product.findById(id);
    if(!product){
        return res.json({message : "product is not found...."});
    }
    // product = await product.findOneAndUpdate({_id:id},{$set:{...req.body}}, {new:true})
     product = await Product.findByIdAndDelete(id)

    console.log(product)
    res.status(200).json({message:'product is deleted....'});
}