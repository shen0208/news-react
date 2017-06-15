const express = require("express");
const expressStatic = require("express-static");//静态页面托管
const bodyParser = require("body-parser")//post请求
const multer = require("multer");//目录
const cookieParser = require("cookie-parser");//cookie
const cookieSession = require("cookie-session");
const consolidate = require("consolidate");
const mysql = require("mysql");//数据库

//1.创建express服务
const server = express();
server.listen(8001);//端口监测

//2.静态页面托管
server.use(expressStatic("./www"));

//3.post请求设置
//server.use(bodyParser.json())
server.use(bodyParser.urlencoded({//字符
	limit : 1024*2,//大小限制
	extended:false//一般模式
}))
const multerObj = multer({
	dest : "./www/upload"
})
server.use(multerObj.any());

//4.cookie设置
server.use(cookieParser());
//5.session设置
let arr = [];
for(var i=0;i<1000;i++){
	arr.push("shen"+Math.random());
}
server.use(cookieSession({
	name : "user_id",//你的域名是什么名字就是什么名字
	keys :　arr,
	maxAge : 1000*60*60
}));
//06.模板引擎适配
//5.模板引擎适配
server.set('view.engine','html'); //输出类型设置
server.set('views','./views');//设置引擎模板路径
server.engine('html',consolidate.ejs);//输出与引擎匹配
//链接数据库
let db = mysql.createPool({
		host : "localhost",
		user : "root",
		password : "root123",
		database : "20170505"
	})
server.use("/",require("./route/home")(db))
server.use("/article",require("./route/article")(db));
server.use("/follow",require("./route/follow")(db));
server.use("/column",require("./route/column")(db));
server.use("/user",require("./route/user")(db));
server.use("/login",require("./route/login")(db));
server.use("/reg",require("./route/reg")(db));
server.use("/logout",require("./route/logout")(db))
