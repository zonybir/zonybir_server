const express = require('express'),
      router  = express.Router(),
      db = require('../db'),
      multipart = require('connect-multiparty'),
      multipartMiddleware = multipart();

router.use((req,res,next)=>{
    var user=req.session.user;
    if(user&&user.id){
        next();
    }else res.json({
        code:403,
        message:'请登录',
        data:[]
    })
    
})

router.get('/type_list',(req,res)=>{
    let user=req.session.user;
    /*db.query(`select class.id,class.name as title,group_concat(type.id,'-',type.name) as children from class,type 
    where class.user_id=${user.id} and class.id=type.class_id group by class.id`,*/
    db.query(`select class.id,class.name as title,group_concat(type.id,"-",type.name) as children from class LEFT JOIN type on class.id=type.class_id where class.user_id=${user.id} group by class.id`,
        (err,resql)=>{
        res.json({
            code:200,
            message:'ok',
            data:resql
        })
    })
})

router.post('/set_item',multipartMiddleware,(req,res)=>{
    let data=JSON.parse(req.body.data);
    console.log(data);
    let sql='insert into details (type_id,user_id,name,price) value ';
    data.map((v,k)=>{
        sql+='('+v.type_id+','+'1,"'+v.detail+'",'+v.amount+'),';
    })
    sql=sql.replace(/\,$/,'');
    db.query(sql,(err,ressql)=>{
        if(!err){
            res.json({
                code:200,
                data:[],
                msg:'添加成功'
            })
        }else{
            res.status(500);
            res.end();
        }
    })
    
})

router.get('/list',(req,res)=>{
    let type=req.query.type,limitSql='to_days(details.add_date)=to_days(now())',user_id=req.session.user.id;
    switch(type){
        case 'week':{
            limitSql=`yearweek(date_format(details.add_date,'%Y-%m-%d')) = yearweek(now())`;
            break;
        }
        case 'month':{
            limitSql=`date_format(details.add_date,'%Y-%m')=date_format(now(),'%Y-%m')`;
            break;
        }
        case 'year':{
            limitSql=`date_format(details.add_date,'%Y')=date_format(now(),'%Y')`;
            break;
        }
    }
    let sql=`select class.name as title,group_concat(type.name,'-',details.name,'-',details.price) as children from class,type,details 
                where details.user_id=class.user_id=${user_id} and ${limitSql} and details.type_id=type.id and type.class_id=class.id
                    group by title order by class.id
                `;
    db.query(sql,(err,ressql)=>{
        res.json({
            code:200,
            mes:'ok',
            data:ressql
        });
    })
    
})

router.post('/add_class',multipartMiddleware,(req,res)=>{
    let class_type=req.body.data;
    if(!class_type){
        res.json({
            code:402,
            message:'请填写分类名称'
        })
        return;
    }
    class_type=class_type.split(',');
    let sql='insert into class (name,user_id) value',
        user=req.session.user;
    class_type.map((v,k)=>{
        sql+=`("${v}",${user.id}),`;
    })
    sql=sql.replace(/\,$/,'');
    db.query(sql,(err,row)=>{
        if(!err) res.json({code:200,message:'添加成功'});
        else res.json({code:402,message:err})
    })
})
module.exports = router;