const public = require('./public.js');
const User = require('./user.js');
/*
const multipart = require('connect-multiparty'),
      db = require('../db'),
      multipartMiddleware = multipart();
      */
const router=(app,express)=>{
    app.use('*',(req,res,next)=>{
        next();
    });
    app.use('/public',public);
    app.use('/user',User);
    app.use('*',(req,res)=>{
        res.status(500).json({code:500,message:'未授权',data:{}});
    })
}

module.exports = router;