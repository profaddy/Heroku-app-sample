const express = require("express");
const router = express.Router();
const Tehsil = require("../models/tehsil");
const User  =require("../models/user");
const Stock = require("../models/stock")
const mongoose = require("mongoose");
const formatResponse = require("../utils/formatResponse");

router.get(("/"),(req, res, next) => {
    Tehsil.find().exec().then(result => {
        res.status(200).json(formatResponse(true,"tehsil retrieved successfully",{tehsils:result}));
    }).catch(error => {
        res.status(500).json(formatResponse(false,`error occured while retrieving tehsil: ${error}`))
    });
});

router.post(("/"),async (req, res, next) => {
    try{
    const findRecordWithReqName = await Tehsil.findOne({name:req.body.name});
    if(findRecordWithReqName !== null){
        throw("Tehsil already exists");
    }
    const tehsil = new Tehsil({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name
    });
    let users = await User.find();
    const savedTehsil = await tehsil.save()
    const stock = await users.map((user) => {
            return {
                tehsil_id:tehsil._id,
                user_id:user._id,
                user_name:user.name,
                tehsil_name:tehsil.name,
                bag_value:0
            }
        })
        const createdStock = await Stock.collection.insert(stock);
        res.status(201).json(formatResponse(true,"tehsil created successfully",{createdTehsil:savedTehsil}));
}catch(error){
    res.status(500).json(formatResponse(false,`${error}`));        

}
});

router.delete(("/:tehsilId"),(req, res, next) => {
    const id = req.params.tehsilId;
    Tehsil.findByIdAndRemove(id).exec().then(response => {
        res.status(200).json({
            message:"tehsil deleted successsfully",
            id: response.id
        });
    }).catch(error => {
        res.status(500).json(formatResponse(false,`error while deleting tehsil: ${error}`));
    })
});

module.exports = router;
