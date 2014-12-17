var bcrypt = require('bcrypt');
var db = require("../models/index.js");
var models = require ("../models");

module.exports = {
	get_login:function(req, res){
		res.render("login")
	},
	post_login:function(req, res){
		db.user.find({where:{email:req.body.email}}).then(function(userObj){
			if(userObj){
				bcrypt.compare(req.body.password,userObj.password, function(err, match){
					if (match === true){
						// res.send("correct password")
						req.session.user = {
							id: userObj.id,
							email: userObj.email,
							name: userObj.name
						};
						res.redirect("/movie/mood");
					}else{
						res.send("invalid password")
					}
				});
			}else{
				res.send("Unknown user");
			}
		})
	},
	get_signup:function(req, res){
		res.render("signup");
	},
	post_signup:function(req,res){
	    //do sign up here (add user to database)
	    db.user.findOrCreate({
	    	where: {email: req.body.email}, 
	    	defaults:{email:req.body.email,password:req.body.password,name:req.body.name}
	    }).spread(function(user, created){
	    	res.redirect("/movie/mood");
	    }).catch(function(error){
	    	res.send(error)
	    	res.redirect('signup')
	    })
	},
	get_logout:function(req,res){
		delete req.session.user;
		res.send("Logged out")
		res.redirect("/")
	}
}