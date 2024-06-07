const { query } = require("express");
const { getAllCarts } = require("../controller/cart.controller");
const Cart = require("../model/card.model");
const { default: mongoose } = require("mongoose");

module.exports = class Cartservices{

    // add product
    async addNewCart(body ,userId){
        try {
            let userCarts = await Cart.findOne({user : userId});
            if(!userCarts){
                return await Cart.create({
                    user : userId,
                    products : [
                        {
                            productId : body.productId,
                            quantity : body.quantity || 1 ,
                        },
                    ],
                });
            } else {
                let findproductIndex = userCarts.products.findIndex(
                    (item) => String(item.productId) === body.productId
                );
                if(findproductIndex !== -1){
                    userCarts.products[findproductIndex].quantity += body.quantity || 1;
                }
                else{
                    userCarts.products.push({
                        productId : body.productId,
                        quantity : body.quantity || 1

                    });
                }
                return await userCarts.save();
            }
            
        } catch (err) {
            console.log(err);
            return err.message ; 
        }
    }



    // get one or all product

    async getAllCarts(query,userID){
        try {
            let cartItem = 
            query.cartId && query.cartId !== ""
            ?[
                {

                    $match : {_id : new mongoose.Types.ObjectId(query.cartId)},
                },
            ]
            : [];

            let loginUser = 
            query.me && query.me === "true"
            ?[
                {
                    $match : {user : userID},
                },
            ]
            : [];
            let pipeline = [
                {
                    $match : {isDelete : false},
                },
                ...loginUser,
                ...cartItem,
                {
                    $lookup : {
                        from : "users",
                        localField : "user",
                        foreignField : "_id",
                        as : "user",
                        pipeline : [
                            {
                                $project : {
                                    firstName : 1,
                                    lastName : 1,
                                    email : 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set : { user : {$first : "$user"}},
                },
                {
                    $unwind : "$products"
                },
                {
                    $lookup : {
                        from : "products",
                        localField : "products.productId",
                        foreignField : "_id",
                        as : "products.productId",
                        pipeline : [
                            {
                                $project : {
                                    title : 1,
                                    price : 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set : {"products.productId" : {$first: "$products.productId"}},
                },
            ];

            let carts = await Cart.aggregate(pipeline);
            return carts;
            
        } catch (err) {
            console.log(err);
            return err.message ; 
        }
    }


 // update user

  async updateUser(body, userId){
    try {
        let userCarts = await Cart.findOne({user : userId});
        // if(!userCarts){
        //     res.json({message : "user carts not found"});
        // }
        let findproductIndex = userCarts.products.findIndex(
            (item) => String(item.productId) === body.productId
        );
        if(findproductIndex !== -1){
            userCarts.products[findproductIndex].quantity = body.quantity || 1;
        }
        else{
            userCarts.products.push({
                productId : body.productId,
                quantity : body.quantity || 1

            });
        }
        return await userCarts.save();
        
    }  catch (err) {
        console.log(err);
        return err.message ; 
    }
   
}


 async removeCart(query,userID){
    try {
        let removeCart = await Cart.findOneAndUpdate(
            {
                user :userID
            },
            {
                $pull:
                {
                    products:{
                        productId : new mongoose.Types.ObjectId(query.productId)
                    }

                }
            },
            {
                new : true
            }
        )
        return removeCart;
        
    }  catch (err) {
        console.log(err);
        return err.message ; 
    }
 }

}

