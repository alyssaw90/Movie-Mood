var request = require("request");
var mood = {
	"happy": 35,
	"adventure": 12, 
	"drama": 18,
	"suspense": 10748,
	"romance": 10749,
	"family": 10751,
	"action": 28,
	"learning": 99
}

module.exports = {
	get_mood:function(req, res){
		res.render("mood");
	},
	get_happy:function(req, res){
		var page = req.query.page || 1;
		var moviesSearchUrl ="http://api.themoviedb.org/3/genre/35/movies?api_key=" + process.env.moviedata + "&page=" + page;
		request(moviesSearchUrl, function(error, response, body){
			var info = JSON.parse(body);
			var data = info.results.map(function(data){
				return data;
			});
			res.render("happy", {data:data, page:page})
		})
	},
	get_drama:function(req, res){
		var page = req.query.page || 1;
		var moviesSearchUrl ="http://api.themoviedb.org/3/genre/18/movies?api_key=" + process.env.moviedata + "&page=" + page;
		request(moviesSearchUrl, function(error, response, body){
			var info = JSON.parse(body);
			var data = info.results.map(function(data){
				return data;
			});
			res.render("drama", {data:data, page:page})
		})
	}
}





