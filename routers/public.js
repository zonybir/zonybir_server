const express = require('express'),
      router  = express.Router();

router.use((req,res,next)=>{
    console.log('entery public router,Time:'+new Date());
    var times=req.session.user?req.session.user.view:0;
    console.log('you hava view this api '+times+' times.');
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
    var page = req.query.page || 1;
    page=page*100;
    res.json({
        code:200,
        message:'ok',
        data:{
            count:1000,
            page:req.query.page || 1,
            list:[
                {count:13,name:'zhongwen',id:78},
                {count:13,name:'zhongwen',id:738},
                {count:13,name:'zhongwen',id:798},
                {count:13,name:'zhongwen',id:708},
                {count:13,name:'zhongwen',id:782}
            ]
        }
    })
})
router.get('/detail',(req,res)=>{
    var page = req.query.page || 1;
    page=page*100;
    res.json({
        code:200,
        message:'ok',
        data:{
            count:1000,
            page:req.query.page || 1,
            list:[
                {count:13,name:'zhongwen',id:78},
                {count:13,name:'zhongwen',id:738},
                {count:13,name:'zhongwen',id:798},
                {count:13,name:'zhongwen',id:708},
                {count:13,name:'zhongwen',id:782}
            ]
        }
    })
})
router.use('*',(req,res)=>{
    res.json({
        code:404,
        message:'not funde pages',
        data:[]
    })
})
module.exports = router;