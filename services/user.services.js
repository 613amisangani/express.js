const User = require('../model/user.model');
//  const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');



// module.exports =  class userServices{

//     async registerUser (firstName, lastName, email, password, mobileNo, profileImage, DOB, gender) 
//      {
//         try {
           
//             let user = await User.findOne({ email: email, isDelete: false });
//             if (user) {
//                 return("You are already registered");
//             }

//             //image store
//             //   let image = "";
//             //  if(req.file)
//               let image = req.file.path.replace(/\\/g,'/')   
    
//             const hasPassword = await bcrypt.hash(password, 10);
    
            
//             user = await User.create({ firstName, lastName,email,  password: hasPassword, mobileNo, profileImage:image, DOB,
//                 gender
//             });
    
//             return user;
//         } catch (error) {
//             throw error;
//         }
//     }



//     async loginUser (email, password){
//         try {
           
//             const user = await User.findOne({ email: email, isDelete: false });
//             if (!user) {
//                 return { message: "User not found" };
//             }
    
//             const matchedPassword = await bcrypt.compare(password, user.password);
//             if (!matchedPassword) {
//                 return { message: "mismached password" };
//             }
     
//             const token = jwt.sign({ userId: user._id },process.env.SECRET_KEY);
    
//             return {token, message: "Login success" };
//         } catch (error) {
//             throw error;
//         }
//     }



//     async getProfile(user) {
//         try {
//             return user;
//         } catch (error) {
//             throw error;
//         }
//     }


//     async updateProfile (user, body) {
//         try {
            
//             if (body.password) {
//                 body.password = await bcrypt.hash(body.password, 10);
//             }
//             const updatedUser = await User.findByIdAndUpdate(user._id,{ $set: { ...body } },  { new: true }
//             );
    
//             return updatedUser;
//         } catch (error) {
//             throw error;
//         }
//     }


//     async changePassword (user, oldPassword, newPassword, confirmPassword) {
//         try {
          
//             if (newPassword !== confirmPassword) {
//                 return { message: "Password mismatch" };
//             }
//             // if(newPassword !== confirmPassword)
//                 //             {
//                 //                 return res.json({message :"password is mismatched...."})
//                 //             }
//             const isMatch = await bcrypt.compare(oldPassword, user.password);
//             if (!isMatch) {
//                 return { message: "Incorrect old password" };
//             }
    
//             const hashedPassword = await bcrypt.hash(newPassword, 10);
    
//             const updatedUser = await User.findByIdAndUpdate(user._id,{ $set: { password: hashedPassword } },{ new: true }
//             );
    
//             return { user: updatedUser, message: "Password changed successfully" };
//         } catch (error) {
//             throw error;
//         }
//     }


//     async deleteUser(user){
//         try {
            
//             const updatedUser = await User.findByIdAndUpdate(  user._id,  { $set: { isDelete: true } }, { new: true }
//             );
//             return { message: "User deleted successfully" };
//         } catch (error) {
//             throw error;
//         }
//     }



// }

module.exports = class UserServices {
    // Create user
    async createUser(body) {
      try {
        return await User.create(body);
      } catch (error) {
        return error.message;
      }
    }
   
    // Get One User
    async findOneUser(body) {
      try {
        return await User.findOne(body);
      } catch (error) {
        return error.message;
      }
    }
  
  
    // Get All User
    async findAllUser(body) {
      try {
        return await User.find(body);
      } catch (error) {
        return error.message;
      }
    }
  
    // Update User
    async updateUser(id, body) {
      try {
        return await User.findByIdAndUpdate(
          id,
          {
            $set: body,
          },
          {
            new: true,
          }
        );
      } catch (error) {
        return error.message;
      }
    }

    //delete user

    async deleteUser(user){
                try {
                    
                    const deleteUser = await User.findByIdAndUpdate(  user._id,  { $set: { isDelete: true } }, { new: true }
                    );
                    return { message: "User deleted successfully" };
                } catch (error) {
                    throw error;
                }
            }

   
  };