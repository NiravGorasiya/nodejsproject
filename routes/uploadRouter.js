const express=require("express");
const multer=require("multer");
const uploadRouter =express.Router();
const router =express.Router();
const image= require("../src/model/image");
const fs =require("fs");
const path=require("path");


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const imageFileFilter =(req,file,cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('You can upload only image file!'),false);
    }
    cb(null,true);
};

const upload=multer({storage:storage,fileFilter:imageFileFilter});

router.post("/image",upload.single("image"),async(req,res,next)=>{
   try {
    const imagedata= new image({
        name:req.body.name, 
        desc:req.body.desc,
        image:req.file.filename
    });
    const Imageupload =await imagedata.save();
    return res.status(200).json(Imageupload);
   } catch (error) {
       if(error){
           console.log(error);
       }
      return res.status(401).json(error);
   }
});


router.get("/image",async(req,res)=>{
    try {
        const imageData =await image.find();
       return res.status(201).json(imageData);
    } catch (error) {
        if(error){
            console.log(error);
        }
       return res.status(401).json(error);
    }
});

router.get("/image/:id",async(req,res)=>{
   try {
       const imagedata=await image.findById(req.params.id);
        return res.status(201).json(imagedata);
   } catch (error) {
       if(error){
           console.log(error);
       }
        return res.status(400).json(error);
   }
});

router.patch("/image/:id",upload.single("image"),async(req,res)=>{
  if(!req.params.id){
     return res.status(500).json("error in delete")
  }else{
      console.log("file is received");
      try {
          const imagedata= await image.findById(req.params.id);
          const findimage=imagedata.image;
          if(!req.file){
            fs.unlinkSync("public/images/"+findimage)
          }
          if(req.file){
                const data={
                    name:req.body.name,
                    desc:req.body.desc,
                    image:req.file.filename
                }
                const abc =await image.findByIdAndUpdate(req.params.id,data,{
                    new:true
                });
                res.status(200).send(abc);
            }      
      } catch (error) {
          if(error){
              console.log(error);
          }
          res.status(400).send(error);
          
      }
  }
});


router.delete("/image/:image",async(req,res)=>{
    if(!req.params.image){
       return res.status(500).json("error in delete");
    }else{
      console.log("file received");
      console.log(req.params.image);
        try {
            fs.unlinkSync("public/images/"+req.params.image)
            console.log('successfully deleted /tmp/hello');
            return res.status(200).send('Successfully! Image has been Deleted');
        } catch (error) {
            if(error){
                console.log(error);
            }
            return res.status(400).send(error);
        }
    }
});

var fpath=require("../utlis/mail");

router.post("/changeSendEmailDetails",(req,res)=>{
    const {email,password} =req.body;
    const filePath  = "D:/Node/imageupload/utlis/mail.js";
    fs.readFile(filePath,function read(err,data){
        if(err){
            throw err;
        }
        const fileData  =data.toString();
        const file = fs.openSync(filePath,'r+');
        const reEmail = new RegExp('^.*' + 'user' + '.*$', 'gm');
        const reFrom = new RegExp('^.*' + 'from' + '.*$', 'gm');
        const rePassword = new RegExp('^.*' + 'pass' + '.*$', 'gm');
        const fileDataEmail =  fileData.replace(reEmail,`      user:"${email}",`);
        const fileDataPassword =  fileData.replace(rePassword,`      pass:"${password}",`);
        const fileDatafrom = fileData.replace(reFrom,`    from:"${email}",`);
        fs.writeFile(file,fileDataEmail,'utf8',(err)=>{
            if(err) throw err;
            console.log("I am done 1")
        });
        fs.writeFile(file,fileDataPassword,'utf8',(err)=>{
            if(err) throw err;
            console.log("I am done 2")
        });
        // var logger = fs.createWriteStream(filePath, {
        //     flags: 'a'
        //   });
        // logger.write(fileDataEmail);
        // logger.write(fileDataPassword);
        // logger.write(fileDatafrom);
    });
    res.status(200).json({isSuccess:true,status:200,message:"Send mail function details changes."});
});

module.exports = router;


