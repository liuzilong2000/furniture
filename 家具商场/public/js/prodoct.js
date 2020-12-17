// 禁止拖动图片
document.ondragstart = function () {
  return false;
};
// 禁止选中文字
document.oncontextmenu = new Function("event.returnValue=false");
document.onselectstart = new Function("event.returnValue=false");
// 页面刷新回到顶部
// $(window).scrollTop(0);
// 引入导航栏
$("#header_nav").load("../nav.html");
// 引入底部
$("#footer").load("../foot.html");
// 引入回到顶部按钮
$("#body_to_top").load("../to_top.html");


(function(){
	// 添加到喜欢 愿望 收藏
	let add_love = document.getElementById('add_love');
	let add_watch = document.getElementById('add_watch');
	let add_collection = document.getElementById('add_collection');
	let love = 0;
	add_love.onclick = function(){
		if(love == 0){
			add_love.style.color = '#ffbb00';
			add_love.innerHTML = `<i class="iconfont mr-1">&#xe711;</i>移除出喜欢列表`;
			love = 1;
		}else{
			add_love.style.color = '#000';
			add_love.innerHTML = `<i class="iconfont mr-1">&#xe711;</i>添加到喜欢列表`;
			love = 0;
		}
	}
	let watch = 0;
	add_watch.onclick = function(){
		if(watch == 0){
			add_watch.style.color = '#ffbb00';
			add_watch.innerHTML = `<i class="iconfont mr-1">&#xe661;</i>移除出愿望清单`;
			watch = 1;
		}else{
			add_watch.style.color = '#000';
			add_watch.innerHTML = `<i class="iconfont mr-1">&#xe661;</i>添加到愿望清单`;
			watch = 0;
		}
		
	}
	let collection = 0;
	add_collection.onclick = function(){
		if(collection == 0){
			add_collection.style.color = '#ffbb00';
			add_collection.innerHTML = `<i class="iconfont mr-1">&#xe626;</i>移除出收藏`;
			collection = 1;
		}else{
			add_collection.style.color = '#000';
			add_collection.innerHTML = `<i class="iconfont mr-1">&#xe626;</i>添加到收藏`;
			collection = 0;
		}
		
	}
	// 颜色大小
	let hot_color = document.getElementById('hot_color');// 获取color盒子
	let hot_size = document.getElementById('hot_size');// 获取大小盒子
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
	
	
	// 右边轮播图
	let btn_left = document.getElementsByClassName('prodoct_grid_btn_left')[0];
	let btn_right = document.getElementsByClassName('prodoct_grid_btn_right')[0];
	let prodoct_grid_right = document.getElementById('prodoct_grid_right');
	
	// 鼠标移入显示按钮移除隐藏按钮
	prodoct_grid_right.onmouseover = function(){
		btn_left.style.transform = 'translate(0,-50%) scale(1)';
		btn_right.style.transform = 'translate(0,-50%) scale(1)';
	}
	prodoct_grid_right.onmouseout = function(){
		btn_left.style.transform = 'translate(0,-50%) scale(0)';
		btn_right.style.transform = 'translate(0,-50%) scale(0)';
	}
	// 禁止轮播图自动播放
	$('.carousel').carousel({
	    interval: 0
	})
})();

function show(){
	// -------------------------简介沙发-------------------------
	ajax({
	    method:'get',
	    url:'/v1/exhibition',
	    json:true,
	    fn:function(arr){
			let exhibition_big = document.getElementById('exhibition_big');
			let arrs = arr.length;
			// 遍历数组获取各个值
			let box = '';
			for(let i = 0; i < arrs; i++){
				let title = arr[i].title;
				let etitle = arr[i].etitle;
				let href = arr[i].href;
				let img = arr[i].img;
				
				box+=`
					<div class="col-6 p-0 exhibition_box">
						<div class="bg-white exhibition_small_box">
							<div><a href="${href}"><img src="${img}" alt=""></a></div>
							<!-- 沙发名称 -->
							<div class="exhibition_title">
								<h4><a href="##" class="text-dark">${title}</a></h4>
								<p>${etitle}</p>
							</div>
						</div>
					</div>
				`;
			}
			exhibition_big.innerHTML = box;
		}
	});



// ----------------------------------------评论---------------------------------------
// 时间格式
Date.prototype.Format = function (fmt) { // author: meizz
	var o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"h+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		"S": this.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
}
	ajax({
	    method:'get',
	    url:'/v1/comment/1',
	    json:true,
	    fn:function(arr){
			function Fncomment(arr){
				let comment_box = document.getElementById('comment_box'); //评论内容区域
				for(let i = 0; i < arr.length; i++){
					let xingxing = '';
					for(var j = 0; j < arr[i].xing; j++){
						xingxing+='<li class="m-1"><i class="iconfont xingxing">&#xe60e;</i></li>';
					}
					for(var j = 0; j < 5 - arr[i].xing; j++){
						xingxing+='<li class="m-1"><i class="iconfont ">&#xe60e;</i></li>'
					}
					// 评论
					let comments = `
						<div class="border-bottom">
							<!-- 评论头部 -->
							<div class="d-flex p-3 pt-4 position-relative">
								<div class="headPortrait">
									<img src="${arr[i].img}" alt="">
								</div>
								<div class="d-flex justify-content-center flex-column pl-3">
									<p>${arr[i].uname}</p>
									<p>${arr[i].time}</p>
								</div>
								<div class=" d-flex justify-content-center flex-column-reverse xingji">
								<ul class="d-flex">
									${xingxing}
								</ul>
								</div>
							</div>
							<!-- 评论内容 -->
							<div class="px-3 pb-4 text_indent">
								<p>${arr[i].content}</p>
							</div>
						</div>
					`;
					comment_box.innerHTML += comments;
				}
			}
			Fncomment(arr)
			// 评论满意度
			let xings = '';
			// 满意度
			let satisfaction = document.getElementById('satisfaction');
			let satisfactions = satisfaction.children;
			for(let i = 0; i < satisfactions.length-1; i++){
				satisfactions[i].onclick = function(){
					let $this = $(this);
					$this.prevAll('li').addClass('xingxing');
					$this.addClass('xingxing')
					$this.nextAll('li').removeClass('xingxing');
					xings = i+1; //记录满意度
					if(i == 0){
						satisfactions[5].innerHTML = '非常不满意';
					}else if(i == 1){
						satisfactions[5].innerHTML = '不满意';
					}else if(i == 2){
						satisfactions[5].innerHTML = '比较满意';
					}else if(i == 3){
						satisfactions[5].innerHTML = '满意';
					}else if(i == 4){
						satisfactions[5].innerHTML = '非常满意';
					}
				}
			}
			satisfactions[4].onclick();
			// 发布评论
			let comment_submit = document.getElementsByClassName('comment_submit')[0];
			let comment_inp = document.getElementById('comment_inp');
			comment_submit.onclick = function(){
				if(localStorage.getItem('login') == 1){
					let inp_value = comment_inp.value; //评论内容
					// 判断用户是否输入内容
					if(inp_value.length>0 && inp_value.length<200){
						let username = localStorage.getItem('name') //用户名
						let userimg = localStorage.getItem('img') //用户名头像
						let time = new Date().Format("yyyy.MM.dd") //评论时间
						// 导入数据库
						ajax({
							method:'post',
							url:'/v1/addComment',
							data:{img:userimg,time:time,content:inp_value,uname:username,xing:xings},
							fn:function(arr){
								// 评论成功在页面呈现
								if(arr == 1){
									let xingxing = '';
									for(var j = 0; j < xings; j++){
										xingxing+='<li class="m-1"><i class="iconfont xingxing">&#xe60e;</i></li>';
									}
									for(var j = 0; j < 5 - xings; j++){
										xingxing+='<li class="m-1"><i class="iconfont ">&#xe60e;</i></li>'
									}
									let comments = `
										<div class="border-bottom">
											<!-- 评论头部 -->
											<div class="d-flex p-3 pt-4 position-relative">
												<div class="headPortrait">
													<img src="${userimg}" alt="">
												</div>
												<div class="d-flex justify-content-center flex-column pl-3">
													<p>${username}</p>
													<p>${time}</p>
												</div>
												<div class=" d-flex justify-content-center flex-column-reverse xingji">
												<ul class="d-flex">
													${xingxing}
												</ul>
												</div>
											</div>
											<!-- 评论内容 -->
											<div class="px-3 pb-4 text_indent">
												<p>${inp_value}</p>
											</div>
										</div>
									`;
									comment_box.innerHTML += comments;
									comment_inp.value = '' //提交后清除输入框
								}
							}
						});
						addToShopping('发布成功')
					}else{
						addToShopping('请输入0~200字')
					}
				}else{	
					addToShopping('请先登录')
				}
			}
			// 点击显示全部评论
			let comment_btn = document.getElementsByClassName('comment_btn')[0];
			comment_btn.onclick = function(){
				ajax({
					method:'get',
					url:'/v1/comment/0',
					json:true,
					fn:function(arr){
						Fncomment(arr)
						comment_btn.innerHTML = '以显示全部';
						comment_btn.onclick = '';
					}
				})
			}
		}
	});
}




