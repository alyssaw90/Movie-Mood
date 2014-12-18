var bcrypt = require('bcrypt');
var db = require("../models/index.js");

module.exports = {
	get_login:function(req, res){
		var user = req.getUser()
		res.render("login")
	},
	post_login:function(req, res){
		var user = req.getUser()
		db.user.find({where:{email:req.body.email}}).then(function(userObj){
			if(userObj){
				bcrypt.compare(req.body.password,userObj.password, function(err, match){
					if (match === true){
						req.session.user = {
							id: userObj.id,
							email: userObj.email,
							name: userObj.name
						}
						res.redirect("/movie/mood");
					}else{
						req.flash("danger", "Incorrect Password");
						res.redirect("login");
					}
				});
			}else{
				req.flash('danger', 'Unknown user.');
				res.redirect("login");
			}
		})
	},
	get_signup:function(req, res){
		var user = req.getUser()
		res.render("signup");
	},
	post_signup:function(req,res){
		var user = req.getUser()
		db.user.findOrCreate({
			where: {email: req.body.email}, 
			defaults:{email:req.body.email,password:req.body.password,name:req.body.name}
		}).spread(function(user, created){
			if(user){
				req.session.user = {
					id: user.id,
					email: user.email,
					name: user.name
				};
			}
			res.redirect("/movie/mood");
		}).catch(function(error){
			res.flash("danger", "ERROR");
			res.redirect('signup')
		})
	},
	get_logout:function(req,res){
		delete req.session.user;
		req.flash("info", "You have been logged out.");
		res.redirect("/")
	}
}