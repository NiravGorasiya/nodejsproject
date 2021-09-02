require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const uploadRouter=require("./routes/uploadRouter");
const mongoose=require("mongoose");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL,
{
     useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
});


app.use(uploadRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server running at http://localhost:3000/`);
});