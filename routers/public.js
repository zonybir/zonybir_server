const express = require('express'),
      router  = express.Router();

router.use((req,res,next)=>{
    console.log('entery public router,Time:'+new Date());
    var times=req.session.user?req.session.user.view:0;
    console.log('you hava view this api '+times+' times.');
    next();
})

router.get('/info_list',(req,res)=>{
    res.send('/info_list');
})

module.exports = router;