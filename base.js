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

//for json data add

server.post("/products", (req, res) => {  
    products.push(req.body)
    res.status(201).json({ message: 'new product is addedd.....' })
})

//for data read

server.get("/products", (req, res) => {  
    res.status(200).json(products);
})

//for read specific data

server.get("/products/:id", (req, res) => {  
    // console.log(typeof(id))
    const id = +req.params.id;
    const item = products.find((e) => e.id === id)
    res.status(200).json(item);
})

//for data replace

server.put("/products/:id", (req, res) => {  
    // console.log(typeof(id))
    const id = +req.params.id;
    const itemindex = products.findIndex((e) => e.id === id)
    // const product = products[itemindex]
    products.splice(itemindex,1,{...req.body})
    res.status(200).json({message:'product is replaced....'});
})


//for data update

server.patch("/products/:id", (req, res) => {  
    // console.log(typeof(id))
    const id = +req.params.id;
    const itemindex = products.findIndex((e) => e.id === id)
     const product = products[itemindex]
    products.splice(itemindex,1,{...product,...req.body})
    res.status(200).json({message:'product is updated....'});
})

//for data delete

server.delete("/products/:id", (req, res) => {  
    // console.log(typeof(id))
    const id = +req.params.id;
    const itemindex = products.findIndex((e) => e.id === id)
    //  const product = products[itemindex]
    products.splice(itemindex,1)
    res.status(200).json({message:'product is deleted....'});
})




server.listen(1122, () => {
    console.log('server is created.....')
})








//cookiee and session
// what is api and its types
//git checkout -b as1
//git add.
//git commit - m "basic end points 18/5/24"
//git push -u origin as1