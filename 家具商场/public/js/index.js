
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
function show(){
    // -----------------------------------轮播图------------------------ 
    ajax({
        method:'get',
        url:'/v1',
        json:true,
        fn:function(arr){
            // 获取各个盒子
            let rotation = document.getElementById('rotation');  //轮播图盒子
            let rotation_ul = document.getElementById('rotation_ul');  //图片盒子
            let rotation_ol =document.getElementById('rotation_ol');   //获取圆点盒子
            let rotation_text_title = document.getElementById('rotation_text_title'); //文字头
            let rotation_text_details = document.getElementById('rotation_text_details'); //文字体  
            let rotation_btn_left =document.getElementById('rotation_btn_left');   //获取左右按钮
            let rotation_btn_right =document.getElementById('rotation_btn_right'); 
            let rotation_btn =document.getElementById('rotation_btn');  //按钮盒子
        
            // 动态生成图片
            let str_length = arr.length;     //获得数据的数量
            for(let i = 0; i < str_length; i++){
                // 创建ul_li标签
                let ul_li = document.createElement('li');
                // 把图片放进li标签里面
                ul_li.innerHTML = '<img src="'+arr[i].img+'" alt="'+arr[i].textbig+'">';
                // 把li标签放入轮播图ul中
                rotation_ul.appendChild(ul_li);
                // 动态创建轮播图索引小圆点
                let ol_li = document.createElement('li');
                rotation_ol.appendChild(ol_li);
            }
            let timer = '';
            // 获取第一个小圆点 默认让第一个高亮显示
            rotation_ol.children[0].className = 'gaoliang';
            // 鼠标进入显示按钮
            rotation.onmouseover = function(){
                rotation_btn.style.display = 'block';
            }
             // 鼠标移除隐藏按钮
            rotation.onmouseout = function(){
                rotation_btn.style.display = 'none';
            }
            // 点击按钮切换图片
            // 右
            let direction = true; //设置点击的方向  true-右 false-左
            rotation_btn_right.onclick = function(){
                direction = true;
                switch_img();  //调用图片切换函数
                // 点击按钮移除原有的定时器 开启新的定时器
                clearInterval(timer);
                timer = setInterval(function(){
                    rotation_btn_right.onclick(); 
                },6000)
            }
            // 左
            rotation_btn_left.onclick = function(){
                direction = false;
                switch_img();  //调用图片切换函数

                // 点击按钮移除原有的定时器 开启新的定时器
                clearInterval(timer);
                timer = setInterval(function(){
                    rotation_btn_right.onclick(); 
                },6000)
            }
        
            // 图片切换
            var img_num = -1;    //图片计数器
            let ul_lis = rotation_ul.children; 
            let ul_li_length = ul_lis.length;//图片数量
            let ol_lis = rotation_ol.children;
            
            function switch_img(){
                // 图片 小圆点 初始状态
                for(var i = 0; i < ul_li_length; i++){
                    ul_lis[i].style.zIndex = 0;
                    ul_lis[i].style.transform= 'scale(1.5)';
                    ul_lis[i].style.opacity= '0';
                    ol_lis[i].className = '';
                }
                //设置点击的方向  true-右 false-左
                if(direction){
                    img_num++;
                }else{
                    img_num--;
                }
                
                // 图片计数器判断到是否到最后
                if(img_num == ul_li_length){
                    img_num = 0;
                }
                if(img_num < 0){
                    img_num = ul_li_length-1;
                }
                // 图片 小圆点 文字 切换
                ul_lis[img_num].style.zIndex = 1;
                ul_lis[img_num].style.transform = 'scale(1)';
                ul_lis[img_num].style.opacity= '1';
                ol_lis[img_num].className = 'gaoliang';
                rotation_text_title.innerHTML = arr[img_num].textbig;
                rotation_text_details.innerHTML = arr[img_num].textsmall;
            }
            switch_img();
            // 设置定时器自动点击右箭头实现轮播效果
            timer = setInterval(function(){
                rotation_btn_right.onclick(); 
            },6000)
        }
     });


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

    // -----------------------------------热门产品-------------------------------
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
                let hid = arr[i].hgroup;    //家族编号
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
                            <li class='li col-lg-4 col-12 col-md-6 d-flex justify-content-center'>
								<div class='hot_li_box'>
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
									        <a href="javascript:;" class='hot_blook'  hname='${name}' himg='${img}' hprice='${price}' hprice_d='${price_d}'>                                      
									            <i data-hgroup=${hid} class="iconfont">&#xe661;</i>
									        </a>
									    </div>
									</div>
									<!-- 图片 -->
									<a href="javascript:;" class="hot_img"  hname='${name}' himg='${img}' hprice='${price}' hprice_d='${price_d}'>
									    <img data-hgroup=${hid} src="${img}" alt="">
									</a>
									<!-- 新品标签 -->
									${pnew}
									<!-- 购物车 -->
									<a href="javascript:;" ></a>
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
			let rotation = document.getElementById('rotation');  //轮播图盒子
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
                    hot_details_img.style.height = '330px';
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

    //-------------------------------------屏风----------------------------------------
    ajax({
        method:'get',
        url:'/v1/screen',
        json:true,
        fn:function(arr){
            // 获取每一个图片盒子li
            let screen_box = document.getElementById('screen_box');
            let lis_length = arr.length;
            

            let box = '';
            for(let i = 0; i < lis_length; i++){
                box+= `
                        <li style='background-image:url(../${arr[i].img})'>
                            <a href="${arr[i].href}" >
                                <div  class="screen_text">
                                    <i class="iconfont">${arr[i].center}</i>
                                    <p>${arr[i].fname}</p>
                                </div>
                            </a>
                        </li>
                `;
            }
            screen_box.innerHTML = box;
            // 给每一个li设置宽度 平均刚好可以沾满整个父元素
            let lisw = 100 / lis_length + '%';
            let lis = screen_box.children;
            for(let i = 0; i < lis_length; i++){
                lis[i].style.width = lisw;
                lis[i].onmouseover = live;
                lis[i].onmouseout = out;
            } 
            // 当鼠标进入宽边大移出变回 字体消失
            let screen_text = document.getElementsByClassName('screen_text');
            
            function live(){
                for(let i = 0; i < lis_length; i++){
                    lis[i].style.width = lisw;
                }
                this.children[0].style.opacity='0';
                this.style.width = '50%';
            }
            function out(){
                for(let i = 0; i < lis_length; i++){
                    lis[i].style.width = lisw;
                    this.children[0].style.opacity='1';
                }
            }
        }
    });

    // ------------------------------------理念---------------------------------------
    ajax({
        method:'get',
        url:'/v1/diesa',
        json:true,
        fn:function(arr){
            let arr_length = arr.length;
            // 获取盒子
            let diesa_body = document.getElementById('diesa_body');
            let lis = '';
            for(let i = 0; i < arr_length; i++){
                lis+=`
                        <li class='col-12 col-md-4 p-lg-4 p-md-1'>
							<div class='diesa_box_big'>
								<div class="diesa_box">
									<div>
										<img src="${arr[i].img}" alt="">
									</div>
								    <div class="diesa_text">
								        <p>${arr[i].time}</p>
								        <p>${arr[i].title}</p>
								        <div>
								            <p>${arr[i].center}</p>
								        </div>
								    </div>
								</div>
								<a href="${arr[i].href}"><button class="btn_">阅读更多</button></a>
							</div>
                        </li>
                `;
            }
            diesa_body.innerHTML = lis;
        }
    });
	// ------------------------------------------------博客--------------------------------------
	ajax({
		method:'get',
		url:'/v1/blog',
		json:true,
		fn:function(arr){
			// 获取内容盒子
			let blog_body = document.getElementById('blog_body');
			// 向内容盒子添加内容
			let arr_length = arr.length;
			let center_box = '';
			for(let i = 0; i < arr_length; i++){
				// 获取数据
				let img = arr[i].img;
				let url = arr[i].href;
				let timer = arr[i].time.split(',');
				let title = arr[i].title;
				// 处理时间格式
				let year = timer[0];
				let month = timer[1];
				let day = timer[2];
				
				// d-flex flex-column justify-content-center
				center_box += `
					<div class="col-md-4 col-12 px-3 blog_box_big  mb-5">
						<div class="blog_box">
							<div>
							    <img src="${img}" alt="">
							</div>
							<div class="blog_title p-2 d-flex">
							    <div class='blog_time mx-2 pr-2'>
							        <span>${day}</span>
							        <strong>${month}</strong>
							        <span>${year}</span>
							    </div>
							    <div class="h4 blog_centent d-flex align-items-center">
									<div>${title}</div>
								</div>
							</div>
							<div class="p-2 blog_btn_box">
							    <button class="btn_ w-100 py-2">阅读更多</button>
							</div>
						</div>
					</div>
				`;
			}
			blog_body.innerHTML = center_box;
		}
	});
	ajax({
		method:'get',
		url:'/v1/followus',
		json:true,
		fn:function(arr){
			// 获取装图片的盒子
			let followus_box_img = document.getElementById('followus_box_img');
			// 将图片添加到盒子里
			let imgs = '';
			let arr_length = arr.length;
			for(let i = 0; i < arr_length; i++){
				let img = arr[i].img;
				let url = arr[i].href;
				imgs+=`
					<div><a href='${url}'><img src="${img}" alt=""></a></div>
				`;
			}
			followus_box_img.innerHTML = imgs;
		}
	});
}


