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
    app.get('/',(req,res)=>{
        res.send('homePage');
    });
    
    app.use('/public',public);
    app.use('/user',User);
}

module.exports = router;