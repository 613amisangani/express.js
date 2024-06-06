const Cartservices = require("../services/cart.service");
const Cartservice = new Cartservices();

exports.addNewCart = async (req,res) =>{
    try {
        let results = await Cartservice.addNewCart(req.body ,req.user._id);
        res.status(201).json(results);
        
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
}