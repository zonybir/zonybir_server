const express = require('express'),
      router  = express.Router();

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
    var page=req.query.page*100;
    page = page>0?page-1:page;
    res.json(global.imageArray.slice(page,page+100));
})

module.exports = router;