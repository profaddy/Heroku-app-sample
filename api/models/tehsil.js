const mongoose = require("mongoose");

const tehsilSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true}
})

module.exports = mongoose.model("Tehsil",tehsilSchema);