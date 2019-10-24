let express = require("express"),
    router = express.Router(),
    Email = require("../models/email"),
    sanitizer = require("sanitizer"),
    cookieParser = require("cookie-parser");

router.get("/", function(req, res){
    // particlesJS.load('particles-js', 'particle.js/particles.json', function() {
    //     console.log('particles.js loaded - callback');
    // });
    res.render("main", {email: req.cookies.email});
});

router.post("/new", function(req, res){

    let email = req.body.email;
    email = sanitizer.escape(email);
    email = sanitizer.normalizeRCData(email);
    email = sanitizer.sanitize(email);
    email = sanitizer.unescapeEntities(email);

    Email.findOne({email: email}, function(err, found){
        if(err){
            console.log(err);
        } else {
            if(found == null){
                Email.create({
                    email: email
                }, function(err, newEmail){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Email added: " + email);
                    }
                })
            } else {
                console.log("Email " + email + " already exists");
            }
        }
    });
    res.cookie("email", email);
    res.redirect("/");
});

module.exports = router;