const mongoose =require("mongoose");

const imageSchema =new mongoose.Schema({
       name:{
           type:String,
           required:true
       },
       desc:{
           type:String,
           required:true
       },
       image:[String]
});

module.exports=new mongoose.model('Image',imageSchema);