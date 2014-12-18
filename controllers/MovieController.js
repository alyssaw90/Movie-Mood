var request = require("request");
var mood = {
	"happy": 35,
	"adventure": 12, 
	"drama": 18,
	"indie": 10756,
	"romance": 10749,
	"family": 10751
}

module.exports = {
	get_mood:function(req, res){
		var user = req.getUser()
		res.render("mood", {user:user});
	},
	get_happy:function(req, res){
		var user = req.getUser()
		var page = req.query.page || 1;
		var moviesSearchUrl ="http://api.themoviedb.org/3/genre/35/movies?api_key=" + process.env.moviedata + "&page=" + page;
		request(moviesSearchUrl, function(error, response, body){
			var info = JSON.parse(body);
			var data = info.results.map(function(data){
				return data;
			});
			res.render("happy", {data:data, page:page, user:user})
		})
	},
	get_drama:function(req, res){
		var user = req.getUser()
		var page = req.query.page || 1;
		var moviesSearchUrl ="http://api.themoviedb.org/3/genre/18/movies?api_key=" + process.env.moviedata + "&page=" + page;
		request(moviesSearchUrl, function(error, response, body){
			var info = JSON.parse(body);
			var data = info.results.map(function(data){
				return data;
			});
			res.render("drama", {data:data, page:page, user:user})
		})
	},
	get_adventure:function(req, res){
		var user = req.getUser()
		var page = req.query.page || 1;
		var moviesSearchUrl ="http://api.themoviedb.org/3/genre/12/movies?api_key=" + process.env.moviedata + "&page=" + page;
		request(moviesSearchUrl, function(error, response, body){
			var info = JSON.parse(body);
			var data = info.results.map(function(data){
				return data;
			});
			res.render("adventure", {data:data, page:page, user:user})
		})
	},
	get_indie:function(req, res){
		var user = req.getUser()
		var page = req.query.page || 1;
		var moviesSearchUrl ="http://api.themoviedb.org/3/genre/10756/movies?api_key=" + process.env.moviedata + "&page=" + page;
		request(moviesSearchUrl, function(error, response, body){
			var info = JSON.parse(body);
			var data = info.results.map(function(data){
				return data;
			});
			res.render("indie", {data:data, page:page, user:user})
		})
	},
	get_romance:function(req, res){
		var user = req.getUser()
		var page = req.query.page || 1;
		var moviesSearchUrl ="http://api.themoviedb.org/3/genre/10749/movies?api_key=" + process.env.moviedata + "&page=" + page;
		request(moviesSearchUrl, function(error, response, body){
			var info = JSON.parse(body);
			var data = info.results.map(function(data){
				return data;
			});
			res.render("romance", {data:data, page:page, user:user})
		})
	},
	get_family:function(req, res){
		var user = req.getUser()
		var page = req.query.page || 1;
		var moviesSearchUrl ="http://api.themoviedb.org/3/genre/10751/movies?api_key=" + process.env.moviedata + "&page=" + page;
		request(moviesSearchUrl, function(error, response, body){
			var info = JSON.parse(body);
			var data = info.results.map(function(data){
				return data;
			});
			res.render("family", {data:data, page:page, user:user})
		})
	}
}





