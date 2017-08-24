const express = require('express'),
      router  = express.Router(),
      multipart = require('connect-multiparty'),
      db = require('../db'),
      https=require('https'),
      multipartMiddleware = multipart();

router.use((req,res,next)=>{
    next();
})
router.post('/login',multipartMiddleware,(req,res)=>{
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

router.post('/wechat_login',multipartMiddleware,(req,res)=>{
    var wechat_code=req.body.code;
    if(wechat_code){
        let option={
            hostname: 'api.weixin.qq.com',
            port: 443,
            path: `/sns/jscode2session?appid=wx68ca906a75e5c74c&secret=13a95d9ecdbdd50377b71f8b464eafcc&js_code=${wechat_code}&grant_type=authorization_code`,
            method: 'GET'
        }
        https.request(option,(respon)=>{
            res.json({
                code:200,
                data:respon
            })
        })
    }else{
        global.sentInfo(402,'非法登陆');
    }
})

router.get('/info_list',(req,res)=>{
    res.json({
        code:200,
        message:'ok',
        data:[{count:13,name:'zhongwen',id:78},{count:13,name:'zhongwen',id:738},{count:13,name:'zhongwen',id:798},{count:13,name:'zhongwen',id:708},{count:13,name:'zhongwen',id:782}]
    })
})

router.get('/list',(req,res)=>{
    var reqPage=req.query.page,
        page=reqPage*10,
        max_page=0;
    if(page>=global.maxpage) page=global.maxpage-10;
    res.json({
        code:200,
        mes:'ok',
        data:{
            count:global.maxpage,
            page:reqPage,
            list:global.imageArray.slice(page,page+10)
        }
    });
})

router.get('/image_page',(req,res)=>{
    var id=req.query.id;
    db.query(`select * from images where page_id='${id}'`,(err,row)=>{
        if(err) res.json({code:500,msg:row});
        else res.json({code:200,list:row})
    })
})
module.exports = router;