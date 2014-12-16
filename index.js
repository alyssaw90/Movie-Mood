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

var moods = {
	"happy": 35,
	"adventure": 12, 
	"drama": 18,
	"suspense": 10748,
	"romance": 10749,
	"family": 10751,
	"action": 28,
	"learning": 99
}


app.use(function(req,res,next){
	req.getUser=function(){
		return req.session.user || false;
	}
	next();
});


//Mood page
app.get("/mood", function(req, res){
	res.render("mood");
});

//Happy
app.get("/happy", function(req, res){
	//List of genres
	//var moviesSearchUrl ="http://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.moviedata;
	var moviesSearchUrl ="http://api.themoviedb.org/3/genre/35/movies?api_key=" + process.env.moviedata;
	request(moviesSearchUrl, function(error, response, body){
		var info = JSON.parse(body);
		res.send(info)
	})
	// res.render("happy")
})


 app.listen(3000);