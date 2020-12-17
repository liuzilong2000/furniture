function animate(element, target){
	if(element.time){
			clearInterval(element.time);
			element.time = null;
		}
	element.time = setInterval(function(){
		
		// 停止的距离
		
		// 步进
		var step = 30;
		var current = element.offsetLeft;
		if(current > target){
			step = - Math.abs(step);
		}
	if( Math.abs(current - target) < Math.abs(step)){
		clearInterval(element.time);
		element.style.left = target + 'px';
		// 退出函数
		console.log(element.style.left);
		return;
	}
		element.style.left = element.offsetLeft + step +'px';
		console.log(element.style.left);
	},0.01);
}



(function(){
	//------------------当页面滚动时改变导航栏颜色-------------------
	let nav = document.getElementsByClassName('nav');
	let nav_box = nav[0];
	window.onscroll = function() {//鼠标的滚动事件
	    let y = getPageScroll();//对象的解构赋值——ES6新增
		// let document_w = document.body.clientWidth; //获取页面宽度
		// if(document_w > 992){
			// 改变颜色
			let o  = y / 800;
			nav_box.style.backgroundColor = 'rgba(19,19,19,'+o+')';
			// console.log(document_w)
			// if(document_w > 992){
			// 	nav_box_right.style.backgroundColor = 'rgba(19,19,19,'+o+')';
			// }
			
		// }
	    
	    // 改变样式
	    if(y > 10){
	        nav_top.style.height = '0px';
	        nav_top.style.border = 'none';
	        nav_top.style.overflow = 'hidden';
	        // 关闭导航栏下拉框
	        if(dl == 1){
	            nav_dl_use();
	        }else if(ss == 1){
	            nav_ss_search()
	        }else if(gw == 1){
	            nav_gw_shopping()
	        }
	        
	    }else{
	        nav_top.style.height = '35px';
	        nav_top.style.borderBottom = '1px solid rgb(218, 216, 216)';
	    }
		// 回到顶部按钮
		let to_top = document.getElementById('to_top');
		if(y>50){
			to_top.style.opacity = 1;
		}else if(y<50){
			to_top.style.opacity = 0;
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	    function getPageScroll() {//获取网页滚动距离的方法
	        let y;
	        if (window.pageXOffset){//查看有无pageXOffset属性：IE9以及IE9以上的浏览器
	            y = window.pageYOffset;
	        }else if (document.compatMode ==  "BackCompat"){//混杂（怪异）模式下浏览器
	            y = document.body.scrollTop;
	        }else {//标准模式下浏览器
	            y = document.documentElement.scrollTop;
	        }
	        return y
	    }
	}
})();

