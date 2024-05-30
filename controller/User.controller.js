const User = require('../model/user.model');

exports.registerUser = async (req,res) =>{
    try {
        const  {firstName , lastName , email , password , mobileNo , profileImage , DOB , gender } = req.body ;
        let user = await User.findOne({email : email , isDelete : false});
        if(user){
            return res.json({message : "you are already registered....."})
        }
        user = await User.create({
            firstName,lastName,email,mobileNo,password,profileImage,DOB,gender
        });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(501).json({message : "internal server error"});
    }
}