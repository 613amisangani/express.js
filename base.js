// npm init -y
// npm i -D nodemon
// npm i express

const express = require("express")
const server = express();
const morgan = require('morgan');
const products = require('./public/data.json');
console.log(products);


 server.use(express.json());  //for the json data
server.use(morgan('dev'))


//crud 

server.post("/products",(req,res)=>{  //for json data add
    products.push(req.body)
    res.status(201).json({message:'new product is addedd.....'})
})

      server.get("/products",(req,res)=>{  //for data read
        res.status(200).json(products);
     })

     server.get("/products/:id",(req,res)=>{  //for read specific data
    // console.log(typeof(id))
        const id = +req.params.id;
        const item = products.find((e)=>e.id === id) 
        res.status(200).json(item);
     })



server.listen(1122,() =>{
    console.log('server is created.....')
})








//cookiee and session
// what is api and its types
//git checkout -b as1
//git add.
//git commit - m "basic end points 18/5/24"
//git push -u origin as1