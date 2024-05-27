// npm init -y
// npm i -D nodemon
// npm i express

const express = require("express")
const server = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
// const products = require('./public/data.json');
// console.log(products);
// const UserRoutes = require('./routes/User.routes')


mongoose.connect('mongodb://127.0.0.1:27017/node8to10')
    .then(() => console.log("DB is connected..."))
    .catch((error) => console.log(error));



server.use(express.json());  //for the json data
server.use(morgan('dev'))
const productRoutes = require('./routes/product.routes')


server.use('/api/products', productRoutes);
// server.use('/api/user',UserRoutes);





server.listen(1122, () => {
    console.log('server is created.....')
})








//cookiee and session
// what is api and its types
//git checkout -b as1
//git add.
//git commit - m "basic end points 18/5/24"
//git push -u origin as1
// localhost:1122/api/products