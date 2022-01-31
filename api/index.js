const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");


const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const mailRouter = require("./routes/mail");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname,"/images")))

const connect = mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
connect.then((db)=>{
    console.log("Connected to MongoDB")
})
.catch(err=>console.log("not connected"));



// UPLOAD IMAGES 
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"images");
    },
    filename:(req, file, cb)=>{
        // cb(null, file.originalname); SI ça ne marche pas donc cette methode est parfaite
        cb(null, req.body.name);
    }
});


const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};


const upload = multer({storage:storage, fileFilter:imageFileFilter});
app.post("/api/upload", upload.single("file"), (req, res) =>{
    res.status(200).json("File has been uploaded");
});


// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/mail", mailRouter);

app.listen("5000",()=>{
    console.log("Back-end is runing");
})