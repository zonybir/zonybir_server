const public = require('./public.js');
const router=(app,express)=>{
    app.use('*',(req,res,next)=>{
        if(!req.session.user){
            req.session.user={
                name:'zonybir'+Math.random(),
                view:1
            }
        }else req.session.user.view++;
        next();
    });
    app.get('/',(req,res)=>{
        res.send('homePage');
    });
    app.use('/public',public);
}

module.exports = router;