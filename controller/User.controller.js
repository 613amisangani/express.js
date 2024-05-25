const user = require('../public/cast.json')

exports.CreateUser = (req, res) => {  
    user.push(req.body)
    res.status(201).json({ message: 'new user is addedd.....' })
}

exports.getAllUser = (req, res) => {  
    res.status(200).json(user);
}

exports.getUser = (req, res) => {  
    // console.log(typeof(id))
    const id = +req.params.id;
    const item = user.find((e) => e.id === id)
    res.status(200).json(item);
}


exports.replaceUser = (req, res) => {  
    // console.log(typeof(id))
    const id = +req.params.id;
    const itemindex = user.findIndex((e) => e.id === id)
    // const product = products[itemindex]
    user.splice(itemindex,1,{...req.body})
    res.status(200).json({message:'user is replaced....'});
}

exports.updateUser = (req, res) => {  
    // console.log(typeof(id))
    const id = +req.params.id;
    const itemindex = user.findIndex((e) => e.id === id)
     const use = user[itemindex]
    user.splice(itemindex,1,{...use,...req.body})
    res.status(200).json({message:'user is updated....'});
}


exports.deleteUser = (req, res) => {  
    // console.log(typeof(id))
    const id = +req.params.id;
    const itemindex = user.findIndex((e) => e.id === id)
    //  const product = products[itemindex]
    user.splice(itemindex,1)
    res.status(200).json({message:'user is deleted....'});
}





