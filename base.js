// npm init -y
// npm i -D nodemon
// npm i express

const express = require("express")
const nodemon = require("nodemon")
const server = express();

server.get("/",(req,res)=>{
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

server.delete("/",(req,res)=>{
    res.send({type:'delete method'});
})



// server.get("/friend",(req,res)=>{
//     console.log("ip address --->",rep.ip);
//     console.log("base url --->",rep.i);
//     res.send("<h1>hello</h1>");
// })

// server.get("/hello",(req,res)=>{
//     res.send("server is oll");
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