const router = express.Router();
const {body, validationResult} = require("express-validator");
const User = "../models/user";
const bcrypt = require("bcrypt");

router.get_register = (req,res,next)=>{
    res.render("register_form");
}

router.post_register = [
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
                username,
                email,
                password
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

router.get_login = (req,res,next)=>{

}

router.post_login = (req,res,next)=>{

}

module.exports = router;