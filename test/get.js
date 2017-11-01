const https=require('https'),
        http=require('http'),
        fs=require('fs');
let option={
    hostname: 'www.zonybir.com',
    port: 80,
    path: `/`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': 'post_data.length',
        'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        'Accept':'*/*',
        'Accept-Encoding':'gzip, deflate, br',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Referer':'https://www.v4qd.com',
        'Connection':'keep-alive'
    }
}
//AAyidong/index.html

var httsRq=http.request(option,(respon)=>{
    let data='';
    respon.on('data',(d)=>{
        data+=d;
    })
    respon.on('end',()=>{
        fs.writeFile('message.html', data, 'utf8', (err)=>{
            if(err){
                console.log(err);
            }
            else console.log('get ok');
        });
    })
})
httsRq.on('error',(e)=>{
    console.log(1);
    console.log(e);
})
httsRq.end();
/*
http.get('http://www.v45qd.com/', (res) => {
    console.log('状态码：', res.statusCode);
    console.log('请求头：', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  
  }).on('error', (e) => {
    console.error(e);
  }).end();*/