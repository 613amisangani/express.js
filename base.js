// npm init -y
// npm i -D nodemon
// npm i express

const express = require("express")
const server = express();
const morgan = require('morgan');


// server.use((req,res,next)=>{
//     console.log(req.method, req.get('use-agent'));
//      next();
// })

let auth = (req, res, next)=>{
    console.log(req.query);
    //  console.log(req.body)

    // if(req.body.age >= 18){
    if(req.query.age >= 18){

      next();
    }
    else{
        res.send('sorry!you are not allowed this type of action......')
    }
}

server.use(express.json());
// server.use(express.urlencoded({extended:true}))
// server.use(auth);

server.get("/",auth,(req,res)=>{
    res.send("welcome to express server");
})

server.post("/",(req,res)=>{
    res.send({type:'post method'});
})

server.put("/",(req,res)=>{
    res.send({type:'put method',name:'ami'});
})

server.patch("/",(req,res)=>{
    res.send({type:'patch method'});
})

server.delete("/",auth,(req,res)=>{
    res.send({type:'delete method'});
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