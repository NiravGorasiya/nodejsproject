const mongooes = require("mongoose");
mongooes.connect("mongodb://localhost:27017/Userregister", { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
})
    .then(() => console.log("connection successfully......"))
    .catch((err) => console.log(err));	

    mongoose.connect(process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            console.log('connected')
        });    

mongodb+srv://admin:7AdR6t6dOI5wDDd8@cluster0.m2dbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
