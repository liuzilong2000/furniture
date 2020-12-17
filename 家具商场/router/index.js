// 引入express模块
const express = require('express');
// 引入链接池
const pool = require('../pool.js');
// 创建路由器
const r = express.Router();
// -------------------------轮播图------------------------ 
r.get('/v1/',(req,res)=>{
  // 获取轮播图表信息
  let sql = 'SELECT * FROM rotation';
  pool.query(sql,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
});

 // --------------------轮播图下面小轮播图-------------------
r.get('/v1/fontIcon',(req,res)=>{
  // 获取轮播图表信息
  let sql = 'SELECT * FROM fontIcon';
  pool.query(sql,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
});

//------------------------热门家具--------------------------
r.get('/v1/hot',(req,res)=>{
  //获取热门家具表信息
  let sql = 'SELECT * FROM hot';
  pool.query(sql,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
})

//-----------------------屏风-------------------------------
r.get('/v1/screen',(req,res)=>{
  // 获取屏风表信息
  let sql = 'SELECT * FROM screen';
  pool.query(sql,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
})

// ----------------------理念----------------------------------
r.get('/v1/diesa',(req,res)=>{
  // 获取理念表信息
  let sql = 'SELECT * FROM diesa';
  pool.query(sql,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
})

// ----------------------博客-------------------------------
r.get('/v1/blog',(req,res)=>{
  // 获取理念表信息
  let sql = 'SELECT * FROM blog';
  pool.query(sql,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
})

//--------------------关于我们------------------------
r.get('/v1/followus',(req,res)=>{
  // 获取理念表信息
  let sql = 'SELECT * FROM followus';
  pool.query(sql,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
})



// 导出
module.exports = r;