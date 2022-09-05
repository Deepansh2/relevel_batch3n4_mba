const Theatre = require("../models/theatre.model")


exports.addTheatre = async (req,res) =>{


    const theatreObj = {
        name : req.body.name,
        description : req.body.description,
        city : req.body.city,
        pinCode : req.body.pin,
        showTypes : req.body.showTypes,
        numberOfSeats : req.body.numberOfSeats
    }

    try{
    const theatreCreated = await Theatre.create(theatreObj);
    if(!theatreCreated){
        res.status(400).send({
            message : "Theatre dosen't exist"
        })
    }
    res.status(201).send(theatreCreated);
}catch(err){
    console.log("Error while dbOperation",err.message);
    res.status(500).send({
        message : "Internal server error"
    })
}
}

exports.getAllTheatre = async (req,res) =>{

    const theatres = await Theatre.find();

    res.status(200).send(theatres);
}


exports.getOneTheatre = async (req,res) =>{

    try{
    const theatre = await Theatre.findOne({_id:req.params.id});

    res.status(200).send(theatre)
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : "Internal server error"
        })
    }

}



exports.updateTheatre =  async(req,res) =>{


    try{
    
    const theatre = await Theatre.findOne({_id:req.params.id});

    if(!theatre){
        res.status(400).send({
            message : "Theatre doesn't exist"
        })
    }

    theatre.name = req.body.name != undefined ? req.body.name : theatre.name;
    theatre.description = req.body.description != undefined ? req.body.description : theatre.description;
    theatre.city = req.body.city != undefined ? req.body.city : theatre.city;
    theatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : theatre.pinCode;
    theatre.showTypes = req.body.showTypes != undefined ? req.body.showTypes : theatre.showTypes;
    theatre.numberOfSeats = req.body.numberOfSeats != undefined ? req.body.numberOfSeats : theatre.numberOfSeats;

    const updatedTheatre = await theatre.save();
    res.status(200).send(updatedTheatre);
}catch(err){
    console.log("error while dbOperation",err.message);
    res.status(500).send({
        message : "Internal server error"
    })
}

}




exports.deleteTheatre = async (req,res) =>{

    try{
    const theatre = await Theatre.deleteOne({_id:req.params.id});

    res.status(200).send(theatre);
    }catch(err){
        console.log("error while dbOperation",err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}