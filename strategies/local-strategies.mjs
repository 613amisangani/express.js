// const passport =require('passport');
// const{ Strategy } = require('passport-local');
// const  User = require('../model/user.model');

// import { mkcol } from '../routes/product.routes';
// import { trusted } from 'mongoose';


// passport.serializeUser((user,done)=>{
//     console.log(`inside serialize User`);
//     console.log(user);
// done(null ,user.id)
// });

// passport.deserializeUser((id,done)=>{
//     console.log(`inside deserialize User`);
//     console.log(`deserialize user id : ${id}`);
// try {
//     const findUser = User.find((User) => User.id === id)
//     if(!findUser) throw new Error("user not found");
//     done(null, findUser)
// } catch (err) {
//     done(err,null);
// }
// })

//  export default passport.use(
//     new Strategy({usernameField:'email'},(username,password,done)=>{
//         console.log(`username: ${username}`);
//         console.log(`password: ${password}`)

//         try {
//             const findUser = mkcol.find((User) => User.email === email);
//             if(!findUser) throw new Error("user not found");
//             if(findUser.password !== password) throw new Error("invelid password");
//             done(null,findUser);
//         } catch (err) {
//             done(err , null)
//         }
    

//     })
// )



const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../model/user.model');

passport.serializeUser((user, done) => {
    console.log(`inside serialize User`);
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(`inside deserialize User`);
    console.log(`deserialize user id : ${id}`);
    try {
        const findUser = User.find((user) => user.id === id);
        if (!findUser) throw new Error("User not found");
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new Strategy({ usernameField: 'email' }, (email, password, done) => {
        console.log(`email: ${email}`);
        console.log(`password: ${password}`);

        try {
            User.findOne({ email: email }, (err, user) => {
                if (err) return done(err);
                if (!user) return done(null, false, { message: 'User not found' });
                if (user.password !== password) return done(null, false, { message: 'Invalid password' });
                return done(null, user);
            });
        } catch (err) {
            done(err, null);
        }
    })
);

module.exports = passport;


