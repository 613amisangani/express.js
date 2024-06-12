// npm init -y
// npm i -D nodemon
// npm i express
require('dotenv').config();
const express = require("express")
const server = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT;
const path = require('path');
const filePath = path.join(__dirname,'public/images')
// const products = require('./public/data.json');
// console.log(products);



// const passport = require("passport");
// const localStrategies = require('./strategies/local-strategies.mjs');


// app.use(passport.initialize());
// app.use(passport.session());
// app.post('/api/auth',passport.authenticate("local"),(req,res)=>{
// res.sendStatus(200);
// })

// 
// const passport = require('passport');
// // const localStrategies = require('./strategies/local-strategies.mjs');
// import('./strategies/local-strategies.mjs');




// server.use(passport.initialize());
// server.use(passport.session());


// server.post('/api/auth', passport.authenticate("local"), (req, res) => {

//     res.sendStatus(200);
// });


// server.use('/api/auth', (err, req, res, next) => {
//     if (err) {
       
//         res.status(401).send("Authentication failed");
//     } else {
        
//         next();
//     }
// });
// }



mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB is connected..."))
    .catch((error) => console.log(error));



server.use(express.json());  //for the json data
server.use(morgan('dev'))

const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

server.use('/public/images',express.static(filePath));
server.use('/api/products', productRoutes);
server.use('/api/users', userRoutes);
server.use('/api/cart', cartRoutes);
server.use('/api/orders', orderRoutes);





//  server.use('/api/user',cartRoutes);

server.listen(port, () => {
    console.log('server is created.....')
})












//cookiee and session
// what is api and its types
//git checkout -b as1
//git add.
//git commit - m "basic end points 18/5/24"
//git push -u origin as1
// localhost:1122/api/products