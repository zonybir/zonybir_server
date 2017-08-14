const express = require('express'),
      router  = express.Router(),
      db = require('../db');

router.use((req,res,next)=>{
    console.log('entery public router,Time:'+new Date());
    var times=req.session.user?req.session.user.view:0;
    console.log('you hava view this api '+times+' times.');
    if(!req.session.user.canView){
        res.json([123]);
        return;
    }
    next();
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