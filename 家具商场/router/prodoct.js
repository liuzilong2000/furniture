// 引入express模块
const express = require('express');
// 引入链接池
const pool = require('../pool.js');
// 创建路由器
const r = express.Router();
// ------------------------展示沙发-------------------
r.get('/v1/exhibition',(req,res)=>{
  // 获取轮播图表信息
  let sql = 'SELECT * FROM exhibition';
  pool.query(sql,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
});

// --------------------------获取用户评论----------------------
r.get('/v1/comment/:num',(req,res)=>{
  let $num = req.params.num;
  // 获取用户评论
  let sql = '';
  if($num == 1){
    sql = `SELECT * FROM comment WHERE cid < 5 ORDER BY xing DESC`;
  }else{
    sql = 'SELECT * FROM comment WHERE cid >= 5 ORDER BY xing DESC';
  }
  pool.query(sql,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
});
// --------------------------添加用户评论----------------------
r.post('/v1/addComment',(req,res)=>{
  let obj = req.body;
  // 添加用户评论
  let sql = 'INSERT INTO comment SET ?';
  pool.query(sql,[obj],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
        res.send('1'); //成功1
    }else{
        res.send('0'); //失败0
    }
  })
});
// 导出
module.exports = r;