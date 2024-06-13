const express = require('express');
const app = express();

app.set("view engine",'hbs');
// app.set("view engine",'ejs');

app.use(express.json());
app.get('/',(req,res)=>{
    const model = {
        name:'john peter',
        std:10,
        result:'passed',
        subject:{
            maths:35,
            sci : 45,
            eng : 50,
        },
        hobbies:['sports','music','dance'],
    }
    // res.render('index',model);
    res.render('student',model);

})

app.listen(1234, ()=>{
    console.log('server is created')
})