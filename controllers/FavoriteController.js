var db = require("../models/index.js");

module.exports = {
	get_list:function(req, res){
		var added = req.query.added || false;
		db.favorite.findAll().then(function(data){
			res.render("favorite", {list:data})
		})
	},
	post_list:function(req, res){
		db.favorite.findOrCreate({where: req.body}).spread(function(data, created){
			res.send({data:data})
		})
	}
}