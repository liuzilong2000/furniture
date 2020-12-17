exports.__esModule = true;
// 引入express模块
const express = require('express');
const fs = require('fs');
//加载Multer模块
const multer = require('multer');
// 引入链接池
const pool = require('../pool.js');
// 创建用户路由器
const r = express.Router();
// ======================================================================

let storage = multer.diskStorage({
    //用于设置上传时目录的相关规则
	destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    //用于设置上传时文件名称的相关规则
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({
    storage:storage
});
// ==========================================================================


// --------------------------------用户登录-----------------------------
r.get('/v1/sign_in/:email&:upwd',(req,res)=>{
    // 获得用户输入的账号和密码
    let $email = req.params.email;
    let $upwd = req.params.upwd;
    // 查询数据库是否有该用户
    let sql = 'SELECT uname,email,avatar FROM user WHERE email = ? AND upwd = ?';
    pool.query(sql,[$email,$upwd],(err,result)=>{
        if(err) throw err;
        if(result[0]){
            res.send([{code:'1',result:result[0]}]); //有返回1
        }else{
            res.send([{code:'0'}]); //没有返回0
        }
    })
})
// --------------------------------用户注册-------------------------------
r.post('/v1/register',(req,res)=>{
    // 获得用户输入的账号和密码
    let obj = req.body;
    // 查询数据库是否有该用户
    let sql = 'SELECT * FROM user WHERE email = ?';
    pool.query(sql,[obj.email],(err,result)=>{
        if(err) throw err;
        if(result[0]){
            res.send('2'); //有返回2
        }else{
            // 向数据库添加该用户
            let sql = 'INSERT INTO user SET ?';
            pool.query(sql,[obj],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send('1'); //注册成功1
                }else{
                    res.send('0'); //注册失败0
                }
            })
        }
    })
})
//--------------------------------修改头像----------------------------------
r.post('/v1/userUpdata',upload.array('img',40),(req,res,next)=>{
    // 获得用户传入的头像
    var files = req.files;
    var obj = req.body;
    if(!files[0]){
        res.send('0')
    }else{
        let sql = 'UPDATE user SET avatar=? WHERE email=?';
        pool.query(sql,['uploads/'+files[0].filename,obj.log_type],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({code:'1',avatar:'uploads/'+files[0].filename}); //成功1
            }else{
                res.send('0'); //失败0
            }
        })
    }
})
// ------------------------------------搜索框搜索----------------------------
r.get('/v1/search/:value',(req,res)=>{
    // 获得用户输入的账号
    let value = '%'+req.params.value+'%';
    let sql = `SELECT hname,href,style FROM whole WHERE concat(hname,style) LIKE ?`;
    pool.query(sql,[value],(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})
// ---------------------------------购物车--------------------------------
r.get('/v1/shopping/:email',(req,res)=>{
    // 获得用户输入的账号
    let email = req.params.email;
    let sql = 'SELECT uid,price,price_d,img,title,num,href FROM shopping WHERE email=?';
    pool.query(sql,[email],(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})
// --------------------------------删除商品------------------------------
r.delete('/v1/Dshopping/:uid',(req,res)=>{
    let $uid = req.params.uid;
    let sql = 'DELETE FROM shopping WHERE uid=?';
    pool.query(sql,[$uid],(err,data)=>{
        if(err) throw err;
        res.send('1');
    })
})
// -------------------------------添加购物车------------------------------
r.post('/v1/addShopping',(req,res)=>{
    let obj = req.body;
    console.log(obj)
    // 判断购物车中是否已经添加过此商品
    let sql = 'SELECT hgroup,num FROM shopping WHERE hgroup=? AND email=?';
    pool.query(sql,[obj.hgroup,obj.email],(err,result)=>{
        if(err) throw err;
        if(result[0]){
            obj.num = result[0].num + 1;
            // 一个商品最多只能添加5个
            if(obj.num <= 5){
                sql = 'UPDATE shopping SET num=? WHERE hgroup=? AND email=?';
                pool.query(sql,[obj.num,obj.hgroup,obj.email],(err,result)=>{
                    if(err) throw err;
                    if(result.affectedRows>0){
                        res.send('1'); //成功1
                    }else{
                        res.send('0'); //失败0
                    }
                })
            }else{
                res.send('2'); //超出2
            }
            
        }else{
            sql = 'INSERT INTO shopping SET ?';
            pool.query(sql,[obj],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send('1'); //成功1
                }else{
                    res.send('0'); //失败0
                }
            })
        }
    })
    
    
})
// -----------------------------修改购物车---------------------------------
r.put('/v1/putShopping',(req,res)=>{
    // 获得用户输入的账号和密码
    let obj = req.body;
    let sql = 'UPDATE shopping SET num=? WHERE uid=?';
    pool.query(sql,[obj.num,obj.uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send('1'); //成功1
        }else{
            res.send('0'); //失败0
        }
    })
})



module.exports = r;