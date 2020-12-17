#编码格式utf8
SET NAMES utf8;
#删除家具数据库如果有
DROP DATABASE IF EXISTS furniture;
#创建家具数据库
CREATE DATABASE furniture CHARSET=UTF8;
#进入家具数据库
USE furniture;


#用户信息表
CREATE TABLE user(
    uid INT PRIMARY KEY AUTO_INCREMENT, #编号
    uname VARCHAR(32),          #用户名
    upwd VARCHAR(32),           #密码
    email VARCHAR(64),          #邮箱
    phone VARCHAR(16),          #电话
    avatar VARCHAR(128) DEFAULT 'images/user-2.jpg',        #头像图片路径
    user_name VARCHAR(32),      #姓名，如王小明
    gender INT                  #性别  0-女  1-男
);


#购物车信息表
CREATE TABLE shopping(
    uid INT PRIMARY KEY AUTO_INCREMENT, #编号
    hgroup INT,                         #家族编号
    price DECIMAL(7,2),                 #原价价格
    price_d DECIMAL(7,2),               #优惠价格
    img VARCHAR(200),                   #图片路径
    title VARCHAR(10),                  #名称
    num INT,                            #数量
    href VARCHAR(128),                  #链接
    email VARCHAR(64)                   #邮箱
);


#评论表
CREATE TABLE comment(
    cid INT PRIMARY KEY AUTO_INCREMENT, #编号
    img VARCHAR(200),                   #图片路径
    uname VARCHAR(32),                  #用户名
    content VARCHAR(2000),              #评论内容
    time VARCHAR(32),                   #评论时间
    xing VARCHAR(1)                     #满意度
); 
#添加
INSERT INTO comment VALUES(NULL,'images/1.jpg','约翰·多伊','沙发既有趣又优雅，既美观又时尚，经年累月都会保持时尚前沿。它是完全填充的，包括背部和外部手臂-结合舒适和价值，使奖励放松。','2020.02.12','5');
INSERT INTO comment VALUES(NULL,'images/2.jpg','赵先生','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.05.02','5');
INSERT INTO comment VALUES(NULL,'images/3.jpg','范先生','劳拉沙发是一个休闲的，当代的收藏品，你的家人一定会喜欢。柔软的枕头和柔软的斜臂创造了放松和舒适的终极组合。','2020.02.15','5');
INSERT INTO comment VALUES(NULL,'images/5.jpg','陈女士','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.04.25','5');
INSERT INTO comment VALUES(NULL,'images/1.jpg','刘先生','沙发既有趣又优雅，既美观又时尚，经年累月都会保持时尚前沿。它是完全填充的，包括背部和外部手臂-结合舒适和价值，使奖励放松。','2020.02.12','5');
INSERT INTO comment VALUES(NULL,'images/2.jpg','孙先生','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.05.02','3');
INSERT INTO comment VALUES(NULL,'images/3.jpg','王多鱼','劳拉沙发是一个休闲的，当代的收藏品，你的家人一定会喜欢。柔软的枕头和柔软的斜臂创造了放松和舒适的终极组合。','2020.02.15','4');
INSERT INTO comment VALUES(NULL,'images/5.jpg','猜猜我是谁','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.04.25','4');
INSERT INTO comment VALUES(NULL,'images/1.jpg','飞天麻瓜','沙发既有趣又优雅，既美观又时尚，经年累月都会保持时尚前沿。它是完全填充的，包括背部和外部手臂-结合舒适和价值，使奖励放松。','2020.02.12','5');
INSERT INTO comment VALUES(NULL,'images/2.jpg','天秀','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.05.02','3');
INSERT INTO comment VALUES(NULL,'images/3.jpg','葫芦娃','劳拉沙发是一个休闲的，当代的收藏品，你的家人一定会喜欢。柔软的枕头和柔软的斜臂创造了放松和舒适的终极组合。','2020.02.15','4');
INSERT INTO comment VALUES(NULL,'images/5.jpg','铠甲勇士','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.04.25','4');
INSERT INTO comment VALUES(NULL,'images/1.jpg','迪迦奥特曼','沙发既有趣又优雅，既美观又时尚，经年累月都会保持时尚前沿。它是完全填充的，包括背部和外部手臂-结合舒适和价值，使奖励放松。','2020.02.12','5');
INSERT INTO comment VALUES(NULL,'images/2.jpg','飞机','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.05.02','3');
INSERT INTO comment VALUES(NULL,'images/3.jpg','不想起名字','劳拉沙发是一个休闲的，当代的收藏品，你的家人一定会喜欢。柔软的枕头和柔软的斜臂创造了放松和舒适的终极组合。','2020.02.15','4');
INSERT INTO comment VALUES(NULL,'images/5.jpg','笔记','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.04.25','4');
INSERT INTO comment VALUES(NULL,'images/1.jpg','是否','沙发既有趣又优雅，既美观又时尚，经年累月都会保持时尚前沿。它是完全填充的，包括背部和外部手臂-结合舒适和价值，使奖励放松。','2020.02.12','5');
INSERT INTO comment VALUES(NULL,'images/2.jpg','发疯先生','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.05.02','3');
INSERT INTO comment VALUES(NULL,'images/3.jpg','法尔范热','劳拉沙发是一个休闲的，当代的收藏品，你的家人一定会喜欢。柔软的枕头和柔软的斜臂创造了放松和舒适的终极组合。','2020.02.15','4');
INSERT INTO comment VALUES(NULL,'images/5.jpg','废物饭','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.04.25','4');
INSERT INTO comment VALUES(NULL,'images/1.jpg','发顺丰','沙发既有趣又优雅，既美观又时尚，经年累月都会保持时尚前沿。它是完全填充的，包括背部和外部手臂-结合舒适和价值，使奖励放松。','2020.02.12','5');
INSERT INTO comment VALUES(NULL,'images/2.jpg','二个儿歌','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.05.02','3');
INSERT INTO comment VALUES(NULL,'images/3.jpg','非法为','劳拉沙发是一个休闲的，当代的收藏品，你的家人一定会喜欢。柔软的枕头和柔软的斜臂创造了放松和舒适的终极组合。','2020.02.15','4');
INSERT INTO comment VALUES(NULL,'images/5.jpg','任何个人','该系列定制了圆形软垫扶手、箱形贴边坐垫和宽松的椅垫。采用硬木框架结构的高密度坐垫提供舒适性。本系列专为舒适和时尚而设计！','2020.04.25','4');











#轮播图片及文字
CREATE TABLE rotation(
    rid INT PRIMARY KEY AUTO_INCREMENT, #编号
    img VARCHAR(200),                   #图片路径
    textbig VARCHAR(20),                #文字标题
    textsmall VARCHAR(128),             #文字详情
    href VARCHAR(128)                   #链接
);

#添加轮播图信息
INSERT INTO rotation VALUES(NULL,'images/gallery-1.jpg','现代前卫风格家具','社会科技和工艺制作水平的不断提升，依靠新材料、新技术加上光与影之间的无穷变化，追求无常规空间解构，在现代家具款式设计上大胆鲜明对比强烈的色彩布置，以及刚柔并举的选材搭配','javascript:;');
INSERT INTO rotation VALUES(NULL,'images/gallery-2.jpg','后现代风格家具','此风格是脱离了旧时代的特色，吸收欧洲古典主义风格，渴望自由个性，带来更新的设计理念，从外框设计和色调组合。','javascript:;');
INSERT INTO rotation VALUES(NULL,'images/gallery-3.jpg','雅致主义现代家具','文艺界、教育界的人士对于现代雅致主义情有独钟。他们在家居生活中注重品位、强调舒适和温馨，但又要求相对简洁的家具设计风格。','javascript:;');


#小轮播图字体图标表
CREATE TABLE fontIcon(
    fid INT PRIMARY KEY AUTO_INCREMENT, #编号
    center VARCHAR(10),                 #图标
    fname VARCHAR(7),                   #图标名字
    href VARCHAR(128)                   #链接
);
#添加小轮播图字体图标
INSERT INTO fontIcon VALUES(NULL,'&#xe613;','多人沙发','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe659;','单人沙发','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe671;','餐桌椅子','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe600;','屏风','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe62e;','厨房家具','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe618;','办公桌','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe61b;','床头柜','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe622;','书架','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe60b;','装饰花瓶','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe605;','桌子','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe608;','高脚凳子','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe662;','床','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe612;','衣柜','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe60f;','地毯','javascript:;');
INSERT INTO fontIcon VALUES(NULL,'&#xe614;','双人沙发','javascript:;');


#热门产品
CREATE TABLE hot(
    hid INT PRIMARY KEY AUTO_INCREMENT, #编号
    hgroup INT,                         #家族编号
    hname VARCHAR(10),                  #家具名字
    img VARCHAR(200),                   #图片路径
    href VARCHAR(128),                  #链接
    price DECIMAL(6,2),                 #原价价格
    price_d DECIMAL(6,2),               #优惠价格
    pnew BOOLEAN                        #是否为新产品（1 是   0 不是）
);

#添加热门产品数据
INSERT INTO hot VALUES(NULL,1,'弗兰仕','images/product-1.png','javascript:;',1999,1888,0);
INSERT INTO hot VALUES(NULL,2,'三达','images/product-2.png','javascript:;',2999.99,1899,1);
INSERT INTO hot VALUES(NULL,3,'联嘉','images/product-3.png','javascript:;',1999,'',0);
INSERT INTO hot VALUES(NULL,4,'韩狮奥','images/product-4.png','javascript:;',4999,3888.99,0);
INSERT INTO hot VALUES(NULL,5,'斯曼诺','images/product-5.png','javascript:;',1999,'',0);
INSERT INTO hot VALUES(NULL,6,'诗妮斯','images/product-6.png','javascript:;',2699,2099,1);

#全部产品
CREATE TABLE whole(
    wid INT PRIMARY KEY AUTO_INCREMENT, #编号
    hgroup INT,                         #家族编号
    style VARCHAR(10),                  #产品类型
    hname VARCHAR(10),                  #家具名字
    img VARCHAR(200),                   #图片路径
    href VARCHAR(128),                  #链接
    price DECIMAL(6,2),                 #原价价格
    price_d DECIMAL(6,2),               #优惠价格
    pnew BOOLEAN                        #是否为新产品（1 是   0 不是）
);

INSERT INTO whole VALUES(NULL,1,'沙发','弗兰仕','images/product-1.png','javascript:;',1999,1888,0);
INSERT INTO whole VALUES(NULL,2,'沙发','三达','images/product-2.png','javascript:;',2999.99,1899,1);
INSERT INTO whole VALUES(NULL,3,'沙发','联嘉','images/product-3.png','javascript:;',1999,'',0);
INSERT INTO whole VALUES(NULL,4,'沙发','韩狮奥','images/product-4.png','javascript:;',4999,3888.99,0);
INSERT INTO whole VALUES(NULL,5,'沙发','斯曼诺','images/product-5.png','javascript:;',1999,'',0);
INSERT INTO whole VALUES(NULL,6,'沙发','诗妮斯','images/product-6.png','javascript:;',2699,2099,1);



#屏风
CREATE TABLE screen(
    sid INT PRIMARY KEY AUTO_INCREMENT, #编号
    img VARCHAR(200),                   #图片路径
    href VARCHAR(128),                  #链接
    center VARCHAR(10),                 #图标
    fname VARCHAR(7)                    #图标名字
);
#添加屏风
INSERT INTO screen VALUES(NULL,'images/gallery-1.jpg','javascript:;','&#xe608;','高脚凳子');
INSERT INTO screen VALUES(NULL,'images/gallery-2.jpg','javascript:;','&#xe671;','餐桌椅子');
INSERT INTO screen VALUES(NULL,'images/gallery-3.jpg','javascript:;','&#xe659;','单人沙发');
INSERT INTO screen VALUES(NULL,'images/gallery-4.jpg','javascript:;','&#xe662;','床');
INSERT INTO screen VALUES(NULL,'images/blog-2.jpg','javascript:;','&#xe605;','桌子');


#理念
CREATE TABLE diesa(
    did INT PRIMARY KEY AUTO_INCREMENT, #编号
    img VARCHAR(200),                   #图片路径
    href VARCHAR(128),                  #链接
    time VARCHAR(20),                   #时间
    title VARCHAR(20),                  #标题
    center VARCHAR(100)                 #内容
);
#添加理念
INSERT INTO diesa VALUES(NULL,'images/project-1.jpg','javascript:;','2020年02月18日','创造完美的画廊墙','宜家能够将自己的成本和价格保持在较低水平，方法就是征募它的顾客&他们的时间、他们的汽车、他们成为室内设计师的雄心，以及他们对自己木工手艺的膨胀信心。');
INSERT INTO diesa VALUES(NULL,'images/project-2.jpg','javascript:;','2019年03月08日','创造完美的画廊墙','宜家能够将自己的成本和价格保持在较低水平，方法就是征募它的顾客&他们的时间、他们的汽车、他们成为室内设计师的雄心，以及他们对自己木工手艺的膨胀信心。');
INSERT INTO diesa VALUES(NULL,'images/project-3.jpg','javascript:;','2029年10月21日','创造完美的画廊墙','宜家能够将自己的成本和价格保持在较低水平，方法就是征募它的顾客&他们的时间、他们的汽车、他们成为室内设计师的雄心，以及他们对自己木工手艺的膨胀信心。');


#博客
CREATE TABLE blog(
    bid INT PRIMARY KEY AUTO_INCREMENT, #编号
    img VARCHAR(200),                   #图片路径
    href VARCHAR(128),                  #链接
    time VARCHAR(20),                   #时间
    title VARCHAR(20)                   #标题
);
#添加博客
INSERT INTO blog VALUES(null,'images/blog-1.jpg','javascript:;','2020,08,12','很快成为规则的三个技巧');
INSERT INTO blog VALUES(null,'images/blog-2.jpg','javascript:;','2020,07,21','当你开始或重新开始的时候装饰');
INSERT INTO blog VALUES(null,'images/blog-8.jpg','javascript:;','2020,09,11','你最喜欢的餐椅是什么？');


#关于我们
CREATE TABLE followus(
    bid INT PRIMARY KEY AUTO_INCREMENT, #编号
    img VARCHAR(200),                   #图片路径
    href VARCHAR(128)                   #链接
);
#添加
INSERT INTO followus VALUES(NULL,'images/square-1.jpg','javascript:;');
INSERT INTO followus VALUES(NULL,'images/square-2.jpg','javascript:;');
INSERT INTO followus VALUES(NULL,'images/square-3.jpg','javascript:;');
INSERT INTO followus VALUES(NULL,'images/square-4.jpg','javascript:;');
INSERT INTO followus VALUES(NULL,'images/square-5.jpg','javascript:;');
INSERT INTO followus VALUES(NULL,'images/square-6.jpg','javascript:;');




#产品大概页
CREATE TABLE exhibition(
	eid INT PRIMARY KEY AUTO_INCREMENT, #编号
	title VARCHAR(20),                  #标题
	etitle VARCHAR(20), 				#英文标题
	img VARCHAR(200),                   #图片路径
	href VARCHAR(128)                   #链接
);
#添加
INSERT INTO exhibition VALUES(NULL,'弗兰仕','Franz','images/product-1.png','javascript:;');
INSERT INTO exhibition VALUES(NULL,'三达','Sanda','images/product-2.png','javascript:;');
INSERT INTO exhibition VALUES(NULL,'联嘉','Lianjia','images/product-3.png','javascript:;');
INSERT INTO exhibition VALUES(NULL,'韩狮奥','Han Shiao','images/product-4.png','javascript:;');