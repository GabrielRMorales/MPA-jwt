const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/secret", (req,res,next)=>{
    let token = req.headers.authorization || req.cookies.auth;
    if (token){
        jwt.verify(token, process.env.SECRET, function(err, tokenData){
            if (err){next(err)}
            console.log("USER DATA:");
            console.log(req.user);
            console.log(res.locals.currentUser);
            console.log("TOKEN DATA:");
            console.log(tokenData);            
        })
        res.send("you unlocked the secret data!")
    } else {
        return res.status(403).send("NO TOKEN");
    }
   
});

module.exports = router;