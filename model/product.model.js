const mongoose = require('mongoose');

const productSchema = mongoose.Schema ({
    title:String,
    description :{type : String},
    price :{type:Number},
    rating : {type:Number},
    brand :{type :String,
        enum : ['Apple','vivo','oppo','MI']
    },
    catrgory : {type:String},

},
{
    versionKey : false
});

module.exports = mongoose.model('products',productSchema);
