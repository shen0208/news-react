const express = require("express");
module.exports = function(db){
	let router = express.Router();
	router.get("/",function(req,res){
		res.render("column.ejs",{
			home : "",
			follow : "",
			column : "active"
		});
	})
	return router;
}
