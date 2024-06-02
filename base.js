// npm init -y
// npm i -D nodemon
// npm i express
require('dotenv').config();
const express = require("express")
const server = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT;
// const products = require('./public/data.json');
// console.log(products);



mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB is connected..."))
    .catch((error) => console.log(error));



server.use(express.json());  //for the json data
server.use(morgan('dev'))
const productRoutes = require('./routes/product.routes');

const userRoutes = require('./routes/user.routes');

server.use('/api/products', productRoutes);
server.use('/api/users', userRoutes);

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