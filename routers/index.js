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
    app.get('/login',(req,res)=>{
        console.log(req.query.pwd);
        var pwd=req.query.pwd;
        if(pwd=='bunengkan67520000'){
            req.session.user.canView=true;
            res.send('ok');
        }else{
            req.session.user.canView=false;
            res.send('请登录');
        }
    })
    app.use('/public',public);
}

module.exports = router;