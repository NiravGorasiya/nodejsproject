const express = require('express');
const app = express();
const multer = require("multer");
const path = require("path");

var bodyParser = require('body-parser')


// storage engine 
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({dest:'uploads/'}).single("demo_image");

// const upload = multer({
//   storage: storage,
  
// })

app.use(urlencodedParser)
app.use('/profile', express.static('upload/images'));
app.post("/upload", upload.single('profile'), (req, res) => {
  res.json({
            success: 1,
            profile_url: `http://localhost:4000/profile/${req.file.filename}`
})
})

app.post("/image", (req, res) => {
  upload(req, res, (err) => {
   if(err) {
     res.status(400).send("Something went wrong!");
   }
   res.send(req.file);
 });
});

app.listen(4000, () => {
    console.log("server up and running");
})