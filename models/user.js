const mongoose=require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
   admin:{
       type:Boolean,
       default:false
   }
});

User.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);