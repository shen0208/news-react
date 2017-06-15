const express = require("express");
module.exports = function(db){
	let router = express.Router();
	router.get("/",function(req,res){
		res.render("reg.ejs",{});
	})
	router.get("/submit",function(req,res){
//		如果是get就是req.query如果是post就是req.body
//		req.query.user,req.query.pass
		let sql = `SELECT * FROM user WHERE username="${req.query.user}"`;
		db.query(sql,function(err,data){
			//如果错误
			if(err){
				res.send("database error reg")
			}else{
				if(data.length === 0){
//					可以注册
					let sql = `INSERT INTO user(ID,username,password,ico)
					VALUES(0,"${req.query.user}","${req.query.pass}","")`;
//					let sql=`INSERT INTO user(ID,username,password,icon) 
//					VALUES(0,"${req.query.user}","${req.query.pass}","")`;
					db.query(sql,(err,data)=>{
						if(err){
							res.send("database error reg2");
							console.log(2)
						}else{
							res.redirect("/login")
						}
					})
				}else{
					
					res.send("用户名已存在");		
				}
			}
		})
	})
	return router;
}
