const express = require("express");

module.exports = function(db){
	let router = express.Router();
	router.get("/",function(req,res){
		//如果有session种一个，没有就跳转
		if(!req.session["user_id"] && req.url !="/login"){
			//跳转login
			
//			res.redirect("/login")
			 res.redirect('/login');
		}else{
			let sql = `SELECT * FROM user WHERE ID="${req.session.user_id}"`;
			db.query(sql,function(err,data){
				if(err){
					console.log("database error user ID");
				}else{
					console.log(data)
					res.render("user.ejs",{
						user:data[0]
					});
				}
			})
			
		}
	})
	return router;
}
