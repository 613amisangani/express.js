// npm init -y
// npm i -D nodemon
// npm i express

const express = require("express")
const server = express();
const morgan = require('morgan');
// const path = require('path');  for static
// const filepath = path.join(__dirname,'public')  for static


// server.use((req,res,next)=>{
//     console.log(req.method, req.get('use-agent'));
//      next();
// })

let auth = (req, res, next)=>{
    // console.log(req.query);
     console.log(req.body)

    if(req.body.age >= 18){
    // if(req.query.age >= 18){

      next();
    }
    else{
        res.send('sorry!you are not allowed this type of action......')
    }
}
// server.use(express.static(filepath)); for static

// server.use(express.json());  for the json data
// server.use(express.urlencoded({extended:true})) //for the form data
// server.use(auth);  for throughout application
server.use(morgan('short'))

// server.get("/",auth,(req,res)=>{
//     res.send("index");
// })
// server.get("/data",auth,(req,res)=>{
//     res.send(`${filepath}/data.json`);
// })

// server.post("/",(req,res)=>{
//     res.send({type:'post method'});
// })

server.put("/",(req,res)=>{
    res.send({type:'put method',name:'ami'});
})

// server.patch("/",(req,res)=>{
//     res.send({type:'patch method'});
// })

// server.delete("/",auth,(req,res)=>{
//     res.send({type:'delete method'});
// })





server.listen(1122,() =>{
    console.log('server is created.....')
})








//cookiee and session
// what is api and its types
//git checkout -b as1
//git add.
//git commit - m "basic end points 18/5/24"
//git push -u origin as1