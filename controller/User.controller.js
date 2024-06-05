const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req,res) =>{
    try {
        const  {firstName , lastName , email , password , mobileNo , profileImage , DOB , gender } = req.body ;
        let user = await User.findOne({email : email , isDelete : false});
        if(user){
            return res.json({message : "you are already registered....."})
        }
        let hasPassword = await bcrypt.hash(password ,10)
        user = await User.create({
            firstName,lastName,email,mobileNo,password : hasPassword,profileImage,DOB,gender
        });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(501).json({message : "internal server error"});
    }
}



exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email : email, isDelete:false});
        if(!user){
            res.status(404).json({message : "user is not found...."});
        }
        let matchedPassword = await bcrypt.compare(password , user.password);
        if(!matchedPassword){
            return res.json({message : "password is not matched..."})
        }
        let token = jwt.sign({userId : user._id,},process.env.SECRET_KEY);
        res.json({token,message:"login success...."})
        
    } catch (err) {
        console.log(err);
        res.status(501).json({message : "internal server error"});  
    }
}



exports.getProfile = async (req,res) =>{
    try {
        let userProfile = req.user ;
        res.json(userProfile);
        
    } catch (err) {
        console.log(err);
        res.status(501).json({message : "internal server error"});  
    }
}


exports.updateProfile = async (req,res) =>{
    try {
        let user = req.user;
        if(req.body.password){
            req.body.password = await bcrypt.hash( req.body.password ,10)
        }

        user = await User.findByIdAndUpdate(
            user._id ,{ $set:{...req.body}}, {new:true}
        );
        res.json({user , message:"update user"})
    } catch (err) {
        console.log(err);
        res.status(501).json({message : "internal server error"});  
    }
}

exports.changePassword = async (req, res) =>{
    try {
        const {oldPassword , newPassword , confirmPassword} = req.body;
        if(oldPassword === newPassword){
            return res.json({message :"this password is already exist"})
           
        }
        if(newPassword !== confirmPassword)
            {
                return res.json({message :"password is mismatched...."})
            }
            
             const password = await User.findByIdAndUpdate(
               req.user._id ,{ $set:{password:await bcrypt.hash( newPassword,10)}}, {new:true}
            );
            // const hasPassword = await bcrypt.hash( newPassword,10)
            //  hasPassword = confirmPassword;

            res.json({password, message:"change password"})
        
    }  catch (err) {
        console.log(err);
        res.status(501).json({message : "internal server error"});  
    }
}






exports.deleteUser = async (req,res) =>{
    try {

        let user = req.user;
        user = await User.findByIdAndUpdate(
            user._id ,{ $set:{isDelete : true}}, {new:true}
        )
        res.json({message : "delete user"})
        
    } catch (err) {
        console.log(err);
        res.status(501).json({message : "internal server error"});  
    }
}
