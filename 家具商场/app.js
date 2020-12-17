// 引入express模块
const express = require('express');
//引入body-parser模块
const bodyParser = require('body-parser');
// 引入user路由器 用户信息
const user = require('./router/user.js');
// 引入index路由器 界面加载时信息
const index = require('./router/index.js');
//引入产品概述网页
const prodoct = require('./router/prodoct.js');
// 创建服务器
const server = express();
server.listen(3000,()=>{
    console.log('running...')
})

// 静态托管
server.use(express.static('./public'));

server.use(bodyParser.urlencoded({
    extended:false
}))
// 用户列表
server.use('/user',user);
// 页面加载时
server.use('',index);
server.use('',prodoct);