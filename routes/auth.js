var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');

// Our user model
const User           = require("../model/user");

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


router.post("/login", function(req, res) {

  if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }

  if (username === "" || password === "") {
    console.log("FILL FIELDS");
    res.json({message:"fill up the fields"});
    return;
  }

  User.findOne({ "username": username }, (err, user)=> {

  	if(!user){
	    res.json({message:"no such user found"});
	  } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        console.log("idMatch", isMatch);
        if (!isMatch) {
          res.json({message:"passwords did not match"});
        } else {
          var payload = {id: user._id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          console.log("login", user);
          res.json({message: "ok", token: token, user: user});
        }
      });
    }
  });
});

router.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name;
  var role = req.body.role;
  var city = [];
  var age = '';
  var interests = [];
  var description = '';
  var languages = [];
  var image = '';



  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'user exist' });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass,
      name,
      role,
      age,
      interests,
      description,
      languages,
      city: city,
      image,
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        var payload = {id: user._id};
        console.log('user', user);
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: "ok", token: token, user: user});
      	// res.status(200).json(user);
      }
    });
  });
});

router.post("/sendToken", (req, res, next) => {
    console.log(req.body);
    res.json({user: "currentUser"});
});



module.exports = router;
