// const User = require('../model/user.model');
const userServices = require('../services/user.services');
const userService = new userServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.registerUser = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        mobileNo,
        profileImage,
        DOB,
        gender, 
      } = req.body;
      
      let user = await userService.findOneUser({ email: email, isDelete: false });
  
  
      if (user) {
        return res.json({ message: "You are Already Registered....." });
      }

      let image = "";
      if(req.file)
        image = req.file.path.replace(/\\/g,'/')
  
      // Encrypt Password
      let hashPassword = await bcrypt.hash(password, 10);
      // console.log(hashPassword);
  
      // Create New User
      user = await userService.createUser({
        firstName,
        lastName,
        email,
        password: hashPassword,
        mobileNo,
        profileImage : image,
        DOB,
        gender,
      });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  
  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      
      let user = await userService.findOneUser({ email: email, isDelete: false });
      // console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      let matchedPassword = await bcrypt.compare(password, user.password);
      
  
      if (!matchedPassword) {
        return res.json({ message: "Password is Not Matched...." });
      }
  
      let token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.json({ token, message: "Login Success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  
  exports.getProfile = async (req, res) => {
    try {
      let userProfile = req.user;
      res.json(userProfile);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  
  exports.updateProfile = async (req, res) => {
    try {
      let user = req.user;
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      user = await userService.updateUser(
        user._id,
        { ...req.body } );
      res.json({user, message: "Update Success"});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  exports.changePassword = async (req,res) => {
      try {
          let user = req.user;
          const { oldPassword, newPassword, confirmPassword } = req.body;
  
          if(oldPassword === newPassword){
              res.json({message: "Your Password Allready Used...."});
          }
          if(newPassword !== confirmPassword){
              res.json({message: "newPassword An confirmPassword Doesn't Match...."});
          }
          let hashPassword = await bcrypt.hash(newPassword, 10);
  
          user = await userService.updateUser(
            user._id,
            { password: hashPassword }
          );
          res.json({user, message: "Update Success"});
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Internal Server Error" });
        } 
  }
  
  
  exports.deleteUser = async (req, res) => {
        try {
            const result = await userService.deleteUser(req.user);
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

// exports.registerUser = async (req, res) => {
//     try {
//         const { firstName, lastName, email, password, mobileNo, profileImage, DOB, gender } = req.body;
//         let image  = "";
//         if(req.file){
//                 image = req.file.path.replace(/\\/g,'/')   
//         }
//         const user = await userService.registerUser(firstName, lastName, email, password, mobileNo, profileImage, DOB, gender);

//         res.status(201).json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }
    


// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const login = await userService.loginUser(email, password);

//         res.json(login);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }



// exports.getProfile = async (req, res) => {
//     try {
//         const userProfile = await userService.getProfile(req.user);
//         res.json(userProfile);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }


// exports.updateProfile = async (req, res) => {
//     try {
//         const user = await userService.updateProfile(req.user, req.body);
//         res.json({ user, message: "User profile updated" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }


// exports.changePassword = async (req, res) => {
//     try {
//         const { oldPassword, newPassword, confirmPassword } = req.body;
//         const result = await userService.changePassword(req.user, oldPassword, newPassword, confirmPassword);
//         res.json(result);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }


// exports.deleteUser = async (req, res) => {
//     try {
//         const result = await userService.deleteUser(req.user);
//         res.json(result);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }
