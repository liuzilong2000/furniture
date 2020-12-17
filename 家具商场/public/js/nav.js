
// -----------------------登录下拉框-------------------------
let nav_top = document.getElementsByClassName('nav-box-top')[0];
//登录 搜索 购物车 记录数值
let dl = 0;
var ss = 0;    
let gw = 0;

// 点击用户图标弹出登录下拉框
// let nav_dl_user = document.getElementById('nav_dl_user');
function nav_dl_use(){
    nav_top.style.overflow = '';
    if(dl == 0){
        nav_dl.style.height = '330px';
        nav_dl.style.padding = '20px';
        nav_dl_user.innerHTML = '<i class="iconfont">&#xe61c;</i>'
        dl = 1;
        if(ss == 1){
            nav_ss_search()
        }
        if(gw == 1){
            nav_gw_shopping()
        }
    }else{
        nav_dl.style.height = '0px';
        nav_dl.style.padding = '0px 20px';
        nav_dl_user.innerHTML = ' <i class="iconfont">&#xe66b;</i>'
        dl = 0;
    }
}


//点击去注册改变样式
// let nav_dl_p = document.getElementById('nav_dl_p')
let dl_p = 0;
nav_dl_p.onclick = function(){
    if(dl_p == 0){
        //点击去注册改变样式
        nav_dl_h2.innerHTML = '注册';
        // 改变按钮的z-index值
        btn_zc.style.zIndex = 999;
        btn_dl.style.zIndex = 99;
        this.innerHTML = '已有账户去登录';
        dl_p = 1;
    }else if(dl_p == 1){
        //点击已有账户去登录改变样式
        nav_dl_h2.innerHTML = '登录';
        // 改变按钮的z-index值
        btn_zc.style.zIndex = 99;
        btn_dl.style.zIndex = 999;
        this.innerHTML = '还没有账户？';
        dl_p = 0;
    }
    
}
// --------------------------------登-录-------------------------------------
let nav_dl_content1 = document.getElementById('nav_dl_content1'); //登录前
let nav_dl_content2 = document.getElementById('nav_dl_content2'); //登录后
let username = document.getElementById('username'); //用户名
let welcome = document.getElementById('welcome');   //欢迎 用户名
let portrait = document.getElementById('portrait'); //头像
btn_dl.onclick = function (){
    // 获取用户输入账户密码
    let $name = uname.value;
    let $pwd = upwd.value;
    // 获取用户输入值得长度
    let $name_l = $name;
    let $upwd_l = $pwd.length;
    let zz = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!zz.test($name_l)){
        dl_name.innerHTML = '请输入正确的邮箱';
        return;
    }
    if($upwd_l < 6 || $upwd_l > 8){
        dl_pwd.innerHTML = '密码请输入6~8位';
        return;
    }
    // 使用封装ajax
    ajax({
        method:'get',
        url:'/user/v1/sign_in/'+$name+'&'+$pwd,
        json:true,
        fn:function(res){
            if(res[0].code == 1){
                localStorage.setItem('login',1)
                localStorage.setItem('name',$name)
                localStorage.setItem('img',res[0].result.avatar)
                addToShopping('登录成功')
                loginOk()
            }else{
                dl_pwd.innerHTML = '密码错误';
            }
        }
    })
}
// 登录成功
function loginOk(){
    let num = localStorage.getItem('login')
    let name = localStorage.getItem('name')
    let img = localStorage.getItem('img')
    if(num != 1){
        nav_dl_content1.style.display='block';
        nav_dl_content2.style.display='none';
        username.innerHTML = name;
        welcome.innerHTML = '';
    }else{
        nav_dl_content1.style.display='none';
        nav_dl_content2.style.display='block';
        username.innerHTML = '昵称: '+name;
        welcome.innerHTML = '欢迎: '+name;
        portrait.children[0].src = img;
    }
}
loginOk()
// 退出登录
let loginOut = document.getElementById('loginOut');
loginOut.onclick = function(){
    localStorage.clear()
    loginOk()
}
// --------------------------------------------注册-------------------------------------------
btn_zc.onclick = function(){
    // 获取用户输入账户密码
    let $name = uname.value;
    let $pwd = upwd.value;
    // 获取用户输入值得长度
    let $name_l = $name;
    let $upwd_l = $pwd.length;
    let zz = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!zz.test($name_l)){
        dl_name.innerHTML = '请输入正确的邮箱';
        return;
    }
    if($upwd_l < 6 || $upwd_l > 8){
        dl_pwd.innerHTML = '密码请输入6~8位';
        return;
    }
    // 使用封装ajax
    ajax({
        method:'post',
        url:'/user/v1/register',
        data:{email:$name,upwd:$pwd},
        fn:function(res){
            if(res == 1){
                addToShopping('注册成功')
                nav_dl_p.onclick()
            }else{
                dl_name.innerHTML = '邮箱已存在';
            }
        }
    })
}

// ------------------------------------输入框公共函数-----------------------------------
// 当输入框获得焦点时提示
uname.onfocus = function (){
    // 获取用户输入账户数
    let $name_l = uname.value;
    let zz = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!zz.test($name_l)){
        dl_name.innerHTML = '请输入正确的邮箱';
    }
    document.onkeyup = function(){
        let $name_l = uname.value;
        let zz = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!zz.test($name_l)){
            dl_name.innerHTML = '请输入正确的邮箱';
        }else{
            dl_name.innerHTML = ' ';
        }
    }
    uname.onblur = function(){
        document.onkeypu = null;
    }
}

// 当输入框获得焦点时提示
upwd.onfocus = function (){
    // 获取用户输入密码数
    let $upwd_l = upwd.value.length;
    if($upwd_l < 6 || $upwd_l > 8){
        dl_pwd.innerHTML = '密码请输入6~8位';
    }
    document.onkeyup = function(){
        let $upwd_l = upwd.value.length;
        if($upwd_l < 6 || $upwd_l > 8){
            dl_pwd.innerHTML = '密码请输入6~8位';
        }else{
            dl_pwd.innerHTML = ' ';
        }
    }
    upwd.onblur = function(){
        document.onkeyup = null;
    }
}
//更换头像
let picInput = document.getElementById('picInput');
let picInput_email = document.getElementById('picInput_email');
let img_form = document.getElementById('img_form');
let submit_btn = document.getElementById('submit_btn');
let portrait_img = document.getElementById('portrait_img');
portrait_img.onclick = function(){
    picInput.click();
}
picInput.onchange = function(){
    // 用户点击选择头像后更改登录用户名
    picInput_email.value = localStorage.getItem('name');
    submit_btn.click();
} 
/** 验证文件是否导入成功  */  
$("#img_form").ajaxForm(function(data){   
    if(data.code=="1"){  
        localStorage.setItem('img',data.avatar)
        let img = localStorage.getItem('img')
        portrait.children[0].src = img;    
    }  
});  


// ------------------------搜索下拉框------------------------

function nav_ss_search(){
    nav_top.style.overflow = '';
    if(ss == 0){
        nav_search.style.height = '61px';
        nav_ss_font.innerHTML = '<i class="iconfont">&#xe61c;</i>'
        ss = 1;
        if(dl == 1){
            nav_dl_use()
        }
        if(gw == 1){
            nav_gw_shopping()
        }
    }else{
        nav_search.style.height = '0px';
        nav_ss_font.innerHTML = ' <i class="iconfont">&#xe636;</i>'
        ss = 0;
    }
}
let nav_search_inp = document.getElementById('nav_search_inp');
let nav_search_bottom = document.getElementById('nav_search_bottom').children[0];
let time_search = ''
// 监听搜索框输入内容
nav_search_inp.oninput = function(){
    // 防抖
    clearTimeout(time_search)
    time_search = setTimeout(function(){
        console.log(nav_search_inp.value)
        if(nav_search_inp.value !== ''){
            // 发送请求
            ajax({
                method:'get',
                url:'/user/v1/search/'+nav_search_inp.value,
                json:true,
                fn:function(arr){
                    let li = '';
                    nav_search.style.height = 55 * arr.length + 61 + 'px';
                    for(var i = 0; i < arr.length; i++){
                        // 创建li标签
                        li += `
                        <li>
                            <div>
                                <div>${arr[i].hname}</div>
                                <div>${arr[i].style}</div>
                            </div>
                        </li>
                        `
                    }
                    nav_search_bottom.innerHTML = li;
                }
            })
        }else{
            nav_search_bottom.innerHTML = '';
            nav_search.style.height = 61 + 'px';
        }
    },500)
    
}
// -----------------------购物车下拉框-------------------------
function nav_gw_shopping(){
    nav_top.style.overflow = '';
	// 获取页面高度
	let document_h = document.documentElement.clientHeight;
    if(gw == 0){
		// 设置下拉框
		if(document_h > 500){
			nav_shopping.style.height = document_h * 0.8 + 'px';
			nav_shopping_center.style.height = document_h * 0.6 + 'px';
		}else{
			nav_shopping.style.height = 400 + 'px';
			nav_shopping_center.style.height = 300 + 'px';
		}
        
        nav_shopping.style.border = '1px solid #ffbb00';
        nav_shopping.style.padding = '15px';
        nav_gw_font.innerHTML = '<i class="iconfont">&#xe61c;</i>';
        nav_shopping_box.style.margin = '0px'; //购物车进 动画
		
        // document.documentElement.style.overflow='hidden';
        gw = 1;
        if(dl == 1){
            nav_dl_use()
        }
        if(ss == 1){
            nav_ss_search()
        }
        // -----------------------购物车-----------------------
        let email = localStorage.getItem('name');
        ajax({
            method:'get',
            url:'/user/v1/shopping/'+email,
            json:true,
            fn:function(arr){
                let total = document.getElementById('total'); //总价
                let zong = 0;
                let nums = 1;  //数量
                let nav_shopping_center = document.getElementById('nav_shopping_center');
                let shoppings = ''
                for(var i = 0; i < arr.length; i++){
                    let uid = arr[i].uid;
                    let price = arr[i].price;   //原价格
                    let price_d = arr[i].price_d;//优惠价格
                    let priceN = 0;
                    let price_dN = 0;
                    if(price_d){
                        price_d =`<p>$ ${(price_d * arr[i].num).toFixed(2)}</p>`
                        priceN = arr[i].price;
                        price = `<p><s>$ ${(price * arr[i].num).toFixed(2)}</s></p>`;
                        price_dN = arr[i].price_d;
                    }else{
                        price_d = `<p>$ ${(price * arr[i].num).toFixed(2)}</p>`
                        price_dN = arr[i].price;
                        price = '';
                    }
                    shoppings += `
                            <li>
                                <!-- 删除x -->
                                <a href="javascript:;" class="nav_shopping_x" >
                                    <i class="iconfont" data-id='${arr[i].uid}'>&#xe61c;</i>
                                </a>
                                <img src="${arr[i].img}" alt="" />
                                <!-- 商品姓名 -->
                                <div class="shopping_name">
                                    <a href="##">
                                        <p>名称:${arr[i].title}</p>
                                    </a>
                                    <p>数量/价格</p>
                                </div>
                                <!-- 商品价格及数量 -->
                                <div class="shopping_price">
                                    <!-- 数量 -->
                                    <div class="nav_shopping_price_num">
                                        <div class="num">${arr[i].num}</div>
                                        <div class="nav_shopping_price_btn">
                                            <button data-uid='${uid}' data-price_d='${arr[i].price_d}' data-price='${arr[i].price}' class="add" onclick="add()">+</button>
                                            <button data-uid='${uid}' data-price='${arr[i].price}' data-price_d='${arr[i].price_d}' class="sub" onclick="sub()">-</button>
                                        </div>
                                        </div>
                                    <div class="price">
                                        ${price_d}
                                        ${price}
                                    </div>
                                </div>
                            </li>
                    `
                    zong += Number(price_dN) * arr[i].num;
                }
                total.innerHTML = '$'+ zong.toFixed(2)
                if(arr.length > 0){
                    nav_shopping_center.innerHTML = shoppings;
                }else{
                    nav_shopping_center.innerHTML = '还没有添加商品';
                }
                // 按钮加减
                let addbtn = document.getElementsByClassName('add'); //加按钮
                let subbtn = document.getElementsByClassName('sub'); //减按钮
                
                for(var i = 0; i < addbtn.length; i++){
                    // 变量所有加按钮添加单击事件
                    addbtn[i].onclick = add;
                    // 变量所有减按钮添加单击事件
                    subbtn[i].onclick = sub;
                }
                function add(e){
                    let num = this.parentElement.previousElementSibling;
                    uid = e.target.dataset.uid;
                    if(Number(num.innerText) < 5){ //最大添加30个
                        num.innerText = Number(num.innerText) + 1;
                        jisuan.call(this,e,num.innerText,1,uid);
                    }else{
                        addToShopping('最多只能添加5个')
                    }
                }
                function sub(e){
                    let num = this.parentElement.previousElementSibling;
                    uid = e.target.dataset.uid;
                    if(Number(num.innerText) > 1){ //不能低于1个
                        num.innerText = Number(num.innerText) - 1;
                        jisuan.call(this,e,num.innerText,0,uid)
                    }else{
                        addToShopping('不能少于1个哟')
                    }
                }
                let time = true;
                function jisuan(E,num,add,uid){
                    let yuan = this.parentElement.parentElement.nextElementSibling.children;
                    let price_d = '';
                    let price = '';
                    
                    // 计算原价
                    if(yuan.length == 1){ //没有优惠价
                        price_d = E.target.dataset.price;//获取原价
                        price_ds = '';
                        prices = price_d * num;
                    }else{ //有优惠价
                        price_d = E.target.dataset.price_d;//获取折扣后的价钱
                        price = E.target.dataset.price;//获取原价
                        price_ds = price_d * num;
                        prices = price * num;
                        //原价
                        this.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild.innerHTML = '$ '+ (price * num).toFixed(2)
                    }
                    // 计算优惠价格
                    this.parentElement.parentElement.nextElementSibling.firstElementChild.innerHTML = '$ '+ (price_d * num).toFixed(2)
                    // 总价
                    if(add == 1){
                        zong += Number(price_d)
                    }else{
                        zong -= Number(price_d)
                    }
                    total.innerHTML = '$'+ zong.toFixed(2)
                    
                    // 防抖
                    clearTimeout(time)
                    time = setTimeout(function(){
                        ajax({
                            method:'put',
                            url:'/user/v1/putShopping',
                            data:{
                                uid:uid,
                                num:num                 //数量
                            },
                            fn:function(res){
                            }
                        })
                    },1000)
                }
                // 删除按钮
                let nav_shopping_x = document.getElementsByClassName('nav_shopping_x');
                for(var i = 0; i < arr.length; i++){
                    nav_shopping_x[i].onclick = function(e){
                        if (confirm("确定删除吗？")) {  
                            // 删除页面
                            this.parentElement.parentElement.removeChild(this.parentElement)
                            // 删完商品后执行
                            if(nav_shopping_center.children.length == 0){
                                nav_shopping_center.innerHTML = '还没有添加商品';
                            }
                            zong -= Number(this.parentElement.children[3].children[1].children[0].innerHTML.substr(1));
                            if(zong < 0){
                                zong = 0;
                            }
                            total.innerHTML = '$'+ zong.toFixed(2)
                            // 删除数据库
                            ajax({
                                method:'delete',
                                url:'/user/v1/Dshopping/'+e.target.dataset.id,
                                json:true,
                                fn:function(arr){
                                }
                            })
                        }
                    }
                }
            }
        });
    }else{
        nav_shopping.style.height = '0px';
        nav_shopping.style.border = 'none';
        nav_shopping.style.padding = '0';
        nav_shopping_box.style.margin = '500px'; //购物车出 动画
        nav_gw_font.innerHTML = '<i class="iconfont">&#xe6cf;</i>';
        // document.documentElement.style.overflow='';
        gw = 0;
    }
}






