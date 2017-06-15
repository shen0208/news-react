const express = require("express");

module.exports = function(db){
		let router = express.Router();
		router.get("/",function(req,res){
		//console.log(req.query);//query取出id
			let sql = `SELECT * FROM news WHERE ID=${req.query.id}`;
			db.query(sql,function(err,data){
				if(err){
					res.send("database error");
				}else{
					
					res.render("article.ejs",{
						article : data[0]
					})
				
				}
			})
		})
		return router;
}
