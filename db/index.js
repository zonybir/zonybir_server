var mysql = require('mysql');
var dataconf = require ('./conf.js');

var pool = mysql.createPool({
	host : dataconf.host,
	user : dataconf.user,
	password : dataconf.password,
	database : dataconf.database,
	prefix : dataconf.prefix
});
exports.query = function (sql,callback){
	pool.getConnection(function(err,connection){
		if (err){
			console.log('获取数据库连接错误！');
			console.log(err);
			callback(err,"获取数据库连接错误！");
		}else {
			console.log(sql);
			connection.query(sql,function (err,result){
				if (err){
					console.log(err);
					console.log("执行sql语句错误！");
					callback(err,"执行sql语句错误！");
				}else if (result){			
					callback(err,result);			
				}
			})
			connection.release();
		}
	})
}
