const express = require("express");
module.exports = function(db){
	var router = express.Router();
	router.get("/",function(req,res){
		req.session["user_id"] = undefined;
		res.redirect("/");
	})
	return router;
}
