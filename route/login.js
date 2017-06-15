const express = require("express");
module.exports = function(db){
	let router = express.Router();
	router.get("/",function(req,res){
		res.render("login.ejs",{});
	})
	router.post("/submit",function(req,res){
//		console.log("收到了",req.body);
		let sql = `SELECT * FROM user WHERE username="${req.body.user}"`
		db.query(sql,function(err,data){
			if(err){
				res.send("login data error");
			}else{
				console.log(data);
//				返回时一个数组,判断数组的长度为0的时候就是没有数据所以登录不成功
				if(data.length == 0){
					res.send("登录失败");
				}else{
//					校验密码
					if(data[0].password == req.body.pass){
						//redirect跳转
						req.session.user_id = data[0].ID;
						res.redirect("/user");
					}else{
						res.send("登录失败");
					}
				}
			}
		})
	})
	return router;
}
