var express = require("express");
var session = require('express-session');
var request = require("request");
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
var db = require("./models/index.js");
var expressControllers = require('express-controller');
var app = express();
var flash = require('connect-flash')


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

app.use(flash());


var moods = {
	"happy": 35,
	"adventure": 12,
	"drama": 18,
	"suspense": 10748,
	"romance": 10749,
	"family": 10751
}

//Session middleware
app.use(function(req,res,next){
	req.getUser=function(){
		return req.session.user || false;
	}
	next();
});

//Flash notifications
app.get("*", function(req, res, next){
	var alerts = req.flash();
	res.locals.alerts = alerts;
	next();
});

//Getting movie information
app.get("/info/:id", function(req, res){
	var user = req.getUser();
	var id = req.params.id;
	var url = "http://api.themoviedb.org/3/movie/"+id+"?api_key=" + process.env.moviedata;
	request(url, function(error, response, body){
		// console.log(response.statusCode)
		if (response.statusCode == 200) {
			var info = JSON.parse(body);
			// res.send(body)
			//res.send(user)
			res.render("movieinfo", {info:info, user:user})
		} else {
			console.log(error);
		}
	})
})

//Delete button
app.delete("/favorite/:id", function(req, res){
	var user = req.getUser();
	db.favorite.find({where:{id: req.params.id}}).then(function(deleteCount){
		deleteCount.destroy().success(function(){
			res.send({deleted: deleteCount});
		})
	})
});

// 404 error page
// app.use(function(req, res){
// 	res.status(404);
// 	if (req.accepts('html')){
// 		res.render('404', {url: req.url});
// 		return;
// 	}
// 	if (req.accepts('json')){
// 		res.send({error: 'Not found'});
// 		return;
// 	}
// 	res.type('text').send('Not found');
// });


 app.listen(process.env.PORT || 3000);

