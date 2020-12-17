'use strict';
// function imgdragstart(){return false;}
// for(i in document.images)document.images[i].ondragstart=imgdragstart;
// 禁止拖动图片
document.ondragstart = function() {
    return false;
};
// 禁止选中文字
document.oncontextmenu=new Function("event.returnValue=false"); 
document.onselectstart=new Function("event.returnValue=false"); 
// 页面刷新回到顶部
$(window).scrollTop(0);
// 引入导航栏
$('#header_nav').load('../nav.html');
// 引入底部
$('#footer').load('../foot.html');
// 引入回到顶部按钮
$('#body_to_top').load('../to_top.html');




 // ------------------------------轮播图下面小轮播图--------------------------------
    ajax({
       method:'get',
       url:'/v1/fontIcon',
       json:true,
       fn:function(arr){
            let rotation_samll = document.getElementById('rotation_samll');
            let rotation_samll_box = document.getElementById('rotation_samll_box');
            //遍历出响应数据的图标，标题，URL
            let arr_length = arr.length;
            let label = '';
            for(let i = 0; i < arr_length; i++){
                // 图标
                let lcon = arr[i].center;
                // 标题
                let tit = arr[i].fname;
                // URL
                let url = arr[i].href;
                // 动态创建li a i p 标签
                label += `
                            <li>
                                <a href="${url}">
                                    <i class="iconfont">${lcon}</i>
                                    <p>${tit}</p>
                                </a>
                            </li>
                        `
                // 添加到ul中
                rotation_samll.innerHTML = label;
            }
            // 获取li的宽度
            let liw = rotation_samll.children[0].offsetWidth;
            // 设置ul的宽度
            rotation_samll.style.width = liw * arr_length + 'px';
            // 设置显示区域的宽度
            rotation_samll_box.style.width = liw * 6 +'px';
            // 获取ul最大移动距离
            let max_px = liw * arr_length - liw * 6;
            

            // 拖动移动
            rotation_samll.onmousedown = function(e){
                // 获取鼠标在页面的位置
                let pageX = e.pageX;
                // 获取字体图标盒子ul的位置
                let boxX = rotation_samll.offsetLeft;
                // 获取鼠标在盒子中的位置
                let box_pageX = pageX - boxX;
                // 鼠标按下拖动box跟随移动
                rotation_samll.onmousemove = function(e){
                    // 获取鼠标在页面的位置
                    pageX = e.pageX;
                    
                    rotation_samll.style.left = pageX - box_pageX + 'px';

                    // 判断当滑动出去的时候停止
                    if(rotation_samll.offsetLeft >= 100){
                        rotation_samll.style.left = 100 + 'px';
                    }else if(Math.abs(rotation_samll.offsetLeft) >= max_px + 100){
                        rotation_samll.style.left = -max_px -100  + 'px';
                    }

                     // 鼠标松开结束拖动
                     rotation_samll.onmouseup = function(){
                        rotation_samll.onmousemove = null;
                         // 判断当滑动出去的时候停止
                         if(rotation_samll.offsetLeft >= 0){
                            rotation_samll.style.left = 0 + 'px';
                        }

                        // 判断滑动方向
                        if(boxX < rotation_samll.offsetLeft &&  rotation_samll.offsetLeft < 0){  // 右
                            //-（ul滑出的距离/li的宽度）* li 的宽
                            rotation_samll.style.left = -(Math.round(Math.abs(pageX - box_pageX) / liw)) * liw + 'px';
                        }else if(boxX > rotation_samll.offsetLeft){ //左
                            //-（（ul滑出的距离/li的宽度））* li 的宽
                            rotation_samll.style.left = -(Math.round(Math.abs(pageX - box_pageX) / liw)) * liw + 'px';
                        }
                        boxX = rotation_samll.offsetLeft
                        
                         // 判断当滑动出去的时候停止
                        if(Math.abs(boxX) >= max_px){
                            rotation_samll.style.left = -max_px + 'px';
                        }
                        index =  rotation_samll.offsetLeft / liw;
                    }
                    document.onmouseup = function(){
                        rotation_samll.onmouseup();
                    }
                }
            }
            // 点击按钮滚动
            // 获取两个按钮
            let btn_left = document.getElementById('rotation_samll_btnLeft');
            let btn_right = document.getElementById('rotation_samll_btnRight');
            let rotation_bottom = document.getElementById('rotation_bottom');
            var index = 0;

            // 鼠标进入显示按钮 停止定时器
            rotation_bottom.onmouseover = function(){
                btn_left.style.visibility = 'visible';
                btn_right.style.visibility = 'visible';
                clearInterval(timer_s);
            }
             // 鼠标移除隐藏按钮 开启定时器
             rotation_bottom.onmouseout = function(){
                btn_left.style.visibility = 'hidden';
                btn_right.style.visibility = 'hidden';
                timer_s = setInterval(function(){
                    btn_right.onclick(); 
                },6000)
            }

            btn_right.onclick = function(){
                document.onmouseup = null;
                // 判断是否到最后一个如果是则直接到第一个
                if(index <= -arr_length + 6){
                    index = 0;
                    // 重新设置步进
                    let bu = 60;
                    animate(rotation_samll,liw * index,bu);
                }else{
                    index--;
                    animate(rotation_samll,liw * index)
                }
            }
            btn_left.onclick = function(){
                document.onmouseup = null;
                 // 判断是否到第一个如果是则直接到最后一个
                 if(index >= 0){
                    index = -arr_length + 6;
                    // 重新设置步进
                    let bu = 60;
                    animate(rotation_samll,liw * index,bu);
                }else{
                    index++;
                    animate(rotation_samll,liw * index)
                }
            }
            // 设置定时器自动点击右箭头实现轮播效果
            let timer_s = setInterval(function(){
                btn_right.onclick(); 
            },6000)
            
            // 移动函数
            function animate(element, target,bu=10){
                if(element.time){
                        clearInterval(element.time);
                        element.time = null;
                    }
                element.time = setInterval(function(){
                    
                    // 停止的距离
                    
                    // 步进
                    var step = bu;
                    var current = element.offsetLeft;
                    if(current > target){
                        step = - Math.abs(step);
                    }
                if( Math.abs(current - target) < Math.abs(step)){
                    clearInterval(element.time);
                    element.style.left = target + 'px';
                    // 退出函数
                    return;
                }
                    element.style.left = element.offsetLeft + step +'px';
                },10);
            }
        }
    });




//--------------------------------------------------------选择模块----------------------------------------
let choice_head = document.getElementsByClassName('choice_head');

for(var elem of choice_head){
	elem.setAttribute('kai','true');
	elem.onclick = none;
}
function none(){
	if(this.getAttribute('kai') == 'true'){
		// 改头部孩子的第二个span
		this.children[1].style.transform='rotate(-180deg)';
		// 下一个兄弟元素身体消失
		this.nextElementSibling.style.height = '0px';
		this.nextElementSibling.style.padding = '0px 10px';
		// 改当前元素自身自定义元素 
		this.setAttribute('kai','false');
	}else{
		// 改头部孩子的第二个span
		this.children[1].style.transform='rotate(0deg)';
		// 下一个兄弟元素身体出现
		this.nextElementSibling.style.height = 'auto';
		this.nextElementSibling.style.padding = '20px 10px';
		// 改当前元素自身自定义元素 
		this.setAttribute('kai','true');
	}
	
}

// -------价格滑动模块--------
let choice_slideBar = document.querySelectorAll('#choice_slideBar>div');
let choice_slide = document.querySelectorAll('#choice_slide>div');
let choice_slidebox = document.querySelectorAll('#choice_slide');
let choice_slideBar_box = document.querySelector('.choice_slide');
// let choice_slideBar_num = document.querySelectorAll('#choice_slideBar>div>div'); //价格
// 分别为两个滑动模块绑定事件
for(let elem of choice_slideBar){
	elem.onmousedown = move;
}

function move(e){
	// 获取鼠标在按钮中的位置
	let centerX = e.offsetX;
	// 获取线条的位置
	let choice_slideBar_boxX = choice_slideBar_box.offsetLeft;
	// 鼠标在页面的位置
	let pageX = e.pageX;
	// 获取元素在盒子中的位置
	let documentX = this.offsetLeft;
	// 当鼠标移动时
	document.onmousemove = (e)=>{
		// 获取鼠标在界面中的位置
		var pageX1 = e.pageX;
		// 判断有没有超过最小值或者最大值
		this.style.left = pageX1 - pageX + documentX + 'px';
		
		if(this.offsetLeft < 0){
			this.style.left = 0 + 'px';
		}else if(this.offsetLeft > choice_slideBar_box.clientWidth * 0.84){
			this.style.left = choice_slideBar_box.clientWidth * 0.84 + 'px';
		}
		// 价格范围
		this.children[0].innerHTML = `$${Math.round((this.offsetLeft / (choice_slideBar_box.clientWidth * 0.84))*100)*40}`;
		// 如果其中一个值小于500或者大于3000 就把最大和最小范围值隐藏
		choice_slide[0].style.visibility = 'visible';
		choice_slide[1].style.visibility = 'visible';
		if(choice_slideBar[0].children[0].textContent.slice(1) <= 500 || choice_slideBar[1].children[0].textContent.slice(1) <= 500){
			choice_slide[0].style.visibility = 'hidden';
		}
		if(choice_slideBar[0].children[0].textContent.slice(1) >= 3000 || choice_slideBar[1].children[0].textContent.slice(1) >= 3000){
			choice_slide[1].style.visibility = 'hidden';
		}
	}
	// 鼠标弹起停止移动
	document.onmouseup = function(){
		document.onmousemove = null;          
	}
}
// 鼠标弹起停止移动
document.onmouseup = function(){
	document.onmousemove = null;
};
	
// 可利用性
let  choice_slide_btn1 = document.getElementsByClassName('choice_slide_btn1');
choice_slide_btn(choice_slide_btn1)
let  choice_slide_btn2 = document.getElementsByClassName('choice_slide_btn2');
choice_slide_btn(choice_slide_btn2)
let  choice_slide_btn3 = document.getElementsByClassName('choice_slide_btn3');
choice_slide_btn(choice_slide_btn3)
let  choice_slide_btn4 = document.getElementsByClassName('choice_slide_btn4');
choice_slide_btn(choice_slide_btn4)
// 点击切换选择
function choice_slide_btn(btn){
    for(var i = 0; i < btn.length; i++){
        btn[i].onclick = bian
    }

    function bian(){
        for(var i = 0; i < btn.length; i++){
            btn[i].innerHTML = ''
        }
        this.innerHTML = '<i class="iconfont">&#xe626;</i>'
    }
}



ajax({
    method:'get',
    url:'/v1/hot',
    json:true,
    fn:function(arr){
        let hot_ul = document.getElementById('hot_ul'); //盒子
        // 获取热门产品的个数
        let arrs = arr.length;
        let label = '';
        for(let i = 0; i < arrs; i++){
            let hid = arr[i].hgroup;     //家族编号
            let name = arr[i].hname;    //名称
            let img = arr[i].img;       //图片
            let url = arr[i].href;      //路径
            let price = arr[i].price;   //原价格
            let price_d = arr[i].price_d;//优惠价格
            let pnew = arr[i].pnew;     //是否为新产品 1 是   0 不是
            //判断是否有优惠价格 如果有则把原价加删除线 显示优惠价格
            if(price_d){
                price = `
                    <span><s>$${price.toFixed(2)}</s></span>
                `;
                price_d = `
                    <span>$${price_d.toFixed(2)}</span>
                `
            }else{
                price = `
                    <span>$${price.toFixed(2)}</span>
                `;
                price_d = '';
            }
            // 判断是否是新产品
            if(pnew == 1){
                pnew = `
                    <div class="hot_labels">
                        <i class="iconfont">&#xe667;</i>
                    </div>
                `;
            }else{
                pnew = ''; 
            }

            // 动态创建li标签
             label += `
                        <li class='li col-lg-6 col-12 col-md-6 d-flex justify-content-center'>
                            <div class='hot_li_box w-100'>
                                <div class="hot_title">
                                    <a href="${url}" class="hot_name">${name}</a>
                                    <div class="hot_price">
                                        ${price}
                                        ${price_d}
                                    </div>
                                    <!-- 收藏查看 -->
                                    <div class="hot_collection">
                                        <a href="javascript:;" class='collection'>
                                            <i class="iconfont">&#xe711;</i>
                                        </a>
                                        <a href="javascript:;" class='hot_blook' hname='${name}' himg='${img}' hprice='${price}' hprice_d='${price_d}'>                                      
                                            <i data-hgroup=${hid} class="iconfont">&#xe661;</i>
                                        </a>
                                    </div>
                                </div>
                                <!-- 图片 -->
                                <a href="javascript:;" class="hot_img"   hname='${name}' himg='${img}' hprice='${price}' hprice_d='${price_d}'>
                                    <img data-hgroup=${hid} src="${img}" alt="">
                                </a>
                                <!-- 新品标签 -->
                                ${pnew}
                                <!-- 购物车 -->
                                <a href="javascript:;">
                                    <div class="hot_shopping addTo">
                                        <i class="iconfont">&#xe6cf;</i>
                                    </div>
                                </a>
                            </div>
                        </li>
                    `
            hot_ul.innerHTML = label;
        }
        let collection = document.getElementsByClassName('collection');
        for(let i = 0; i < collection.length; i++){
            //给收藏绑定点击事件
            collection[i].onclick = gaoliang;
        }
        // 添加和删除收藏
        function gaoliang(){
            if(this.style.transform == ''){
                this.style.backgroundColor = '#e71d36';
                this.style.transform = 'scale(1)';
            }else if(this.style.transform == 'scale(1)'){
                this.style.backgroundColor = '';
                this.style.transform = '';
            }
        }
        // 点击添加购物车
        let addTo = document.getElementsByClassName('addTo');
        
        for(let i = 0; i < addTo.length; i++){
            addTo[i].onclick = function(){
                let email = localStorage.getItem('name');
                if(email != null){ //判断是否登录
                    ajax({
                        method:'post',
                        url:'/user/v1/addShopping',
                        data:{
                            price:arr[i].price,       //原价
                            hgroup:arr[i].hgroup,     //编号名称
                            price_d:arr[i].price_d,   //优惠价
                            img:arr[i].img,           //图片
                            title:arr[i].hname,       //名字
                            num:1,                    //数量
                            href:arr[i].href,         //链接
                            email:email               //用户名
                        },
                        fn:function(res){
                            if(res == 1){
                                addToShopping('添加成功')
                            }else if(res == 0){
                                addToShopping('添加失败')
                            }else if(res == 2){
                                addToShopping('最多只能添加5个')
                            }
                        }
                    })
                }else{
                    addToShopping('请先登录')
                }
            }
        }
        // ---------------------------弹出详情页面---------------------------
        let hot_details = document.getElementById('hot_details');// 获取弹出页面
        let hot_details_box = document.getElementById('hot_details_box');// 获取弹出页面
        let hot_details_x = document.getElementById('hot_details_x');// 弹出页面关闭x
        let hot_details_img = document.getElementById('hot_details_img').children[0]// 获取详情图片
        let hot_color = document.getElementById('hot_color');// 获取color盒子
        let hot_size = document.getElementById('hot_size');// 获取大小盒子
        let hot_details_name = document.getElementById('hot_details_name');// 获取名字盒子
        let hot_price = document.getElementById('hot_price');// 获取家具原价
        let hot_price_d = document.getElementById('hot_price_d');// 获取家具优惠价
        let hot_blook = document.getElementsByClassName('hot_blook'); // 获取眼字体图标
        let hot_img = document.getElementsByClassName('hot_img'); // 获取热门图片
        let hot_foot_buy = document.getElementById('hot_foot_buy'); // 添加购物车按钮
        // 给每一个眼字体图标绑定单击事件
        for(let i = 0; i < arrs; i++){
            hot_blook[i].onclick = blook;
            hot_img[i].onclick = blook;
        }
        // 单击眼字体图标或者图片显示
        let price = ''; 
        let price_d = ''; 
        let img = ''; 
        let hname = ''; 
        let hgroup = '';
        let href = 'javascript:;'; 
        function blook(e){
            hot_details.style.display = 'block';
            hot_details_name.innerHTML = this.getAttribute('hname');
            hname =  hot_details_name.innerHTML;
            hot_details_img.src = this.getAttribute('himg');
            img = hot_details_img.src
            hgroup = e.target.dataset.hgroup;
            // 显示位置
			let wHeight = document.documentElement.clientHeight;
            // 根据页面高度缩放大小
            if(wHeight > 800){
                hot_details_box.style.transform = 'translate(-50%) scale(1)'
                hot_details_box.style.top = '60px'
            }else if(wHeight > 700){
                hot_details_box.style.transform = 'translate(-50%) scale(0.9)'
                hot_details_box.style.top = '35px'
            }else if(wHeight > 600){
                hot_details_box.style.transform = 'translate(-50%) scale(0.8)'
                hot_details_box.style.top = '-5px'
            }else if(wHeight > 500){
                hot_details_box.style.transform = 'translate(-50%) scale(0.6)'
                hot_details_box.style.top = '-35px'
            }else{
                hot_details_box.style.transform = 'translate(-50%) scale(0.5)'
                hot_details_box.style.top = '-65px'
            }
            // 判断是有优惠
            if(this.getAttribute('hprice_d') != ''){
                hot_price.innerHTML = this.getAttribute('hprice');
                price = hot_price.innerText.slice(1);
                hot_price_d.innerHTML = this.getAttribute('hprice_d');
                price_d = hot_price_d.innerText.slice(1);
            }else{
                hot_price_d.innerHTML = this.getAttribute('hprice');
                price = hot_price_d.innerText.slice(1);
                price_d = '';
            }
            
            setTimeout(function(){
                hot_details_img.style.height = '350px';
            },300)
        }
        // 单击x关闭页面
        hot_details_x.onclick = function(){
            hot_details.style.display = 'none';
            hot_details_img.style.height = '0';
        }
        // 获取color个数
        let hot_colors = hot_color.children.length;
        // 获取大小个数
        let hot_sizes = hot_size.children.length;
        // 默认第一个选中
        hot_color.children[0].className = 'color';
        hot_size.children[0].className = 'color';
        hot_size.children[0].style.padding = '0';
        // 分别绑定单击事件
        for(let i = 0; i < hot_colors; i++){
            hot_color.children[i].onclick = colors;
        }
        for(let i = 0; i < hot_sizes; i++){
            hot_size.children[i].onclick = sizes;
        }
        function colors(){
            // 先清除所有其他选定颜色的边框
            for(let i = 0; i < hot_colors; i++){
                hot_color.children[i].className = ' ';
            }
            this.className = 'color';
        }
        function sizes(){
            // 先清除所有其他选定颜色的边框
            for(let i = 0; i < hot_sizes; i++){
                hot_size.children[i].className = ' ';
                hot_size.children[i].style.padding = '2px'
            }
            this.className = 'color';
            this.style.padding = '0';
        }
        hot_foot_buy.onclick = function(){
            let email = localStorage.getItem('name');
            if(email != null){ //判断是否登录
                ajax({
                    method:'post',
                    url:'/user/v1/addShopping',
                    data:{
                        price:price,       //原价
                        hgroup:hgroup,     //编号名称
                        price_d:price_d,   //优惠价
                        img:img,           //图片
                        title:hname,       //名字
                        num:1,             //数量
                        href:href,         //链接
                        email:email        //用户名
                    },
                    fn:function(res){
                        if(res == 1){
                            addToShopping('添加成功')
                        }else if(res == 0){
                            addToShopping('添加失败')
                        }else if(res == 2){
                            addToShopping('最多只能添加5个')
                        }
                    }
                })
            }else{
                addToShopping('请先登录')
            }
        }
    }
});


// 底部按钮分页
let body_bottom_ul = document.getElementById('body_hot_ul');
let body_bottom_li = body_bottom_ul.children;
for(var i = 0; i < body_bottom_li.length; i++){
    body_bottom_li[i].onclick = bgBlack;
}
// 点击函数
function bgBlack(){
    for(var i = 0; i < body_bottom_li.length; i++){
        body_bottom_li[i].className = '';
    }
    this.className = 'bgBlack'
}




// ------------------------------------------------------导航栏--------------------------------
let center_nav_btn = document.getElementsByClassName('center_nav_btn')[2]; //导航栏搜索按钮
let section_box = document.getElementById('section_box'); //侧边栏 
let cha = document.getElementById('cha'); //侧边栏关闭按钮 

let section_box_width = section_box.offsetWidth;
// section_box.style.right = -section_box_width+'px';
// 实时获取页面宽度
window.onresize = function(){
    if(document.body.clientWidth < 992){
        section_box.style.right = -500+'px';
        // section_box.style.display = 'none';
    }else{
        // section_box.style.display = 'block';
        section_box.style.right = 0+'px';
    }
};

// 点击弹出侧边栏
center_nav_btn.onclick = function(){
    section_box.style.right = 0+'px';
    // section_box.style.display = 'block';
}

cha.onclick = function(){
    section_box.style.right = -500+'px';
}
