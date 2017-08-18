const public = require('./public.js');
const User = require('./user.js');
const multipart = require('connect-multiparty'),
      db = require('../db'),
      multipartMiddleware = multipart();
const router=(app,express)=>{
    app.use('*',(req,res,next)=>{
        next();
    });
    app.get('/',(req,res)=>{
        res.send('homePage');
    });
    app.post('/login',multipartMiddleware,(req,res)=>{
        var data=req.body;
        if(data.user&&data.password){
            let sql=`select * from user where name="${data.user}" and password=${data.password}`;
            db.query(sql,(err,ressql)=>{
                if(!err&&ressql.length>0){
                    req.session.user=ressql[0];
                    let user_id=ressql[0].id;
                    res.json({
                        code:200,
                        message:'登录成功',
                        data:{
                            name:ressql.name,
                            last_login:ressql.last_login
                        }
                    })
                    db.query(`update user set last_login=CURRENT_TIMESTAMP where id=${user_id}`,()=>{});
                }else{
                    res.json({
                        code:402,
                        message:'用户名或密码错误'
                    })
                }
            })
        }else{
            res.json({
                code:402,
                message:'请填写用户名或密码'
            })
        }
    })
    app.use('/public',public);
    app.use('/user',User);
}

module.exports = router;