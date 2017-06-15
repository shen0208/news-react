const express = require("express");
module.exports = function(db){
	let router = express.Router();
	router.get("/",function(req,res){
		res.render("follow.ejs",{
			home : "",
			follow : "active",
			column : ""
		});
	})
	return router;
}
