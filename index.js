var express = require("express");
var session = require('express-session');
var request = require("request");
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
var db = require("./models/index.js");
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

app.get("/info/:id", function(req, res){
	var id = req.params.id
	var url = "http://api.themoviedb.org/3/movie/"+id+"?api_key=" + process.env.moviedata; 
	request(url, function(error, response, body){
		// console.log(response.statusCode)
		if (response.statusCode == 200) {
			var info = JSON.parse(body);
			// res.send(body)
			res.render("movieinfo", info)
		} else {
			console.log(error);
		}
	})
})

app.delete("/favorite/:id", function(req, res){
	db.favorite.find({where:{id: req.params.id}}).then(function(deleteCount){
		deleteCount.destroy().success(function(){
			res.send({deleted: deleteCount});
		})
	})
});




 app.listen(3000);

