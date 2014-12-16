var express = require("express");
var session = require('express-session');
var request = require("request");
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
var db = require("./models/index.js");
var models = require ("./models");
var expressControllers = require('express-controller');
var app = express();



app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
	secret: "ilovewatchingmovies",
	resave: "false",
	saveUninitialized: true
}))
expressControllers
.setDirectory(__dirname + '/controllers')
.bind(app);

app.use(function(req,res,next){
	req.getUser=function(){
		return req.session.user || false;
	}
	next();
});

//Home page with signup and login buttons
app.get('/',function(req,res){
	var user = req.getUser();
	res.render('index', {user:user});
});

//Signup page
app.get("/signup", function(req, res){
	res.render("signup");
});
//Signup page posting to user table
app.post("/signup",function(req,res){
    //do sign up here (add user to database)
    db.user.findOrCreate({
    	where: {email: req.body.email}, 
    	defaults:{email:req.body.email,password:req.body.password,name:req.body.name}
    }).spread(function(user, created){
    	res.redirect("/mood");
    }).catch(function(error){
    	res.send(error)
    	res.redirect('signup')
    })
});

//Login page(finish login portion, can't get information from db)
app.get("/login", function(req, res){
	res.render("login")
})

app.post("/login", function(req, res){
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
					res.redirect("/mood");
				}else{
					res.send("invalid password")
				}
			});
		}else{
			res.send("Unknown user");
		}
	})
});


//Mood page
app.get("/mood", function(req, res){
	res.render("mood");
});

//Happy
app.get("/happy", function(req, res){
	var moviesSearchUrl ="http://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.moviedata;
	request(moviesSearchUrl, function(error, response, body){
		var info = JSON.parse(body);
		res.send(info)
	})
	// res.render("happy")
})

//Adventure
app.get("/adventure", function(req,res){
	res.render("adventure")
})
//Drama
app.get("/drama", function(req, res){
	res.render("drama")
})
//Suspense
app.get("/suspense", function(req, res){
	res.render("suspense")
})
//Romantic
app.get("/romantic", function(req, res){
	res.render("romantic")
})
//Family fun
app.get("/family", function(req,res){
	res.render("family")
})

 app.listen(3000);