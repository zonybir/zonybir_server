const express = require('express'),
      app = express(),

      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      fs = require('fs'),
      router = require('./routers'),
      db = require('./db');

global.imageArray=[];
global.maxpage=0;
db.query('select * from pages',(err,res)=>{
    if(!err){
        global.imageArray=res;
        global.maxpage=res.length;
        console.log(res);
    }
})


app.set('port',process.env.PORT || 2113);
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.raw({type:'application/vnd.custom-type'}));
app.use(bodyParser.text({type:'text/html'}));

app.use(cookieParser());

const sessionMiddleware = session({
    secret:'zonybir_5211',
    resave:false,
    saveUninitialized:true
});

app.use(sessionMiddleware);

router(app);
app.listen(app.get('port'),()=>{
    console.log('server has started!\n'+new Date());
})