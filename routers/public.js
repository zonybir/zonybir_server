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
    res.send('/info_list');
})

router.get('/list',(req,res)=>{
    var page=req.query.page*10,
        max_page
    if(page>=global.maxpage) page=global.maxpage-10;
    res.json(global.imageArray.slice(page,page+10));
})

router.get('/image_page',(req,res)=>{
    var id=req.query.id;
    db.query(`select * from images where page_id='${id}'`,(err,row)=>{
        if(err) res.json({code:500,msg:row});
        else res.json({code:200,list:row})
    })
})

module.exports = router;