let to_top = document.getElementById('to_top');
// 点击回到顶部
to_top.onclick = function(){
	
	let timer = setInterval(function(){
		if(document.documentElement.scrollTop > 0){
			document.documentElement.scrollTop -= 30;
		}else if(document.documentElement.scrollTop == 0){
			clearInterval(timer);
		}
	},3)
}

