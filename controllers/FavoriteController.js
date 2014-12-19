var db = require("../models/index.js");

module.exports = {
	//Favorite list
	get_list:function(req, res){
		var user = req.getUser()
		var added = req.query.added || false;
		db.favorite.findAll({where:{userId:user.id}}).then(function(data){
			res.render("favorite", {list:data, user:user})
		})
	},
	post_list:function(req, res){
		var user = req.getUser()
		db.favorite.findOrCreate({where:{userId:user.id,movieId:req.body.movieId,title:req.body.title}}).spread(function(data, created){
			res.send({data:data, user:user})
		})
	}
}