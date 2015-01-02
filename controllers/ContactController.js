module.exports = {
	//Contact and information page
	get_contact:function(req, res){
		var user = req.getUser();
		res.render("contact", {user:user});
	}
}