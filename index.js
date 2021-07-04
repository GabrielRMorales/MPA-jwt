const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const userRoutes = require("./routes/users");
const protectedRoutes = require("./routes/protected");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

app.set("views", path.join(__dirname, "views"));
app.set("view engine","pug");

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(function(req,res,next){
   let token = req.cookies.auth || null;
   if (token && token!="undefined"){       
       jwt.verify(token, process.env.SECRET, function(err, userData){
           if (err) {next(err)}
           res.locals.currentUser = userData;
       })
   }
    next();
})
app.get("/", (req,res,next)=>{
    if (req.cookies.auth!="undefined"){
        res.render("index", {user: res.locals.currentUser});
    } else {
        return res.render("index");
    }
   
})
app.use("/users", userRoutes);

app.use("/protected", protectedRoutes);

app.use((req,res,next)=>{
    let err = new Error();
    err.status = 404;
    next(err);
});

app.use((err,req,res,next)=>{
   return res.send({
       message: err.message || "Internal Server Problem",
       status: err.status || 500
   });
})

app.listen(PORT, ()=>console.log(`Running on port ${PORT}`));
