const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    uid:String,
    eid:String,
    pwd:String,
    gwd:String,
    dwd:Date,
    iid:String
})
module.exports=mongoose.model('User',userSchema)