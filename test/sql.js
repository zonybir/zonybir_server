const db = require('../db');

db.query('insert into details (type_id,user_id,name,price) value (?,?,?,?),(?,?,?,?),(?,?,?,?)',[31,31,'测试1','11.5',31,31,'测试2','11.5',31,31,'测试3','11.5'],(err,res)=>{
    if(!err){
        console.log(res);
    }else console.log(err);
})