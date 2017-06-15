const express = require("express");
module.exports = function(db){
	let router = express.Router();
	router.get("/",function(req,res,next){
		//读取banner数据
	
		let sql = "SELECT * FROM banner";
		//	query取出数据库信息
			db.query(sql,(err,data)=>{
				if(err){
					res.send("database error banner");//响应
				}else{
		//			console.log(data);
					res.banner = data;
					next();
				}
			})
	
	})
	router.get("/",function(req,res){
		//读取banner数据
		
		let sql = "SELECT * FROM news";
		//	query取出数据库信息
		db.query(sql,(err,data)=>{
			if(err){
				res.send("database error banner");//响应
			}else{
				res.news = data;
	//			console.log(data);
				res.render("index.ejs",{
					banner : res.banner,
					news : res.news,
					home : "active",
					follow : "",
					column : ""
				});//渲染index.ejs
			}
		})
		
	})
	return router;
}
