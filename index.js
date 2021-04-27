const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const userRoutes = require("./routes/users");
const protectedRoutes = require("./routes/protected");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine","pug");

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
/*app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})*/
app.get("/", (req,res,next)=>{
    res.render("index");
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
