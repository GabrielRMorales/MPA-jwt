const {body, validationResult} = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../passport");

exports.get_register = (req,res,next)=>{
    res.render("register_form");
}

exports.post_register = [
    body("username"),
    body("email"),
    body("password"),
    body("confirmPassword"),
    (req,res,next)=>{
    let errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.render("register_form");
    }    
    User.findOne({email: req.body.email}).exec((err, foundUser)=>{
        if (err){next(err)}
        if (foundUser){
            return res.render("register_form", {errors: ["Sorry, that email is already registered"]});
        } else {
            let user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.hash(user.password, 10, (err, hashPass)=>{
                if(err){next(err);}
                user.password = hashPass;
                user.save((savedUser)=>{
                    if (err){next(err)}
                    res.redirect("/login");
                });
            })
            
        }

    });

}]

exports.get_login = (req,res,next)=>{
    res.render("login_form");
}

exports.post_login = (req,res,next)=>{
   passport.authenticate("local", {session: false}, (err,user,info)=>{
            console.log("post login authenticating...");
            console.log(err);
          
            if (err || !user){
                return res.status(400).json({
                    message: "Something is wrong...",
                    user: user
                });
            }
            console.log("USER");
            console.log(user);
            const token = jwt.sign(user.toJSON(), "secret");
            res.cookie("auth", token);
            res.locals.currentUser = user;
            console.log(res.locals.currentUser);
            return res.render("index");
    
        })(req,res, next);

}

exports.get_logout = (req,res,next)=>{

}