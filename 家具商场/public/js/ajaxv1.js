// 封装ajax
function ajax(obj){
    let method = obj.method;     //请求方式
    let url = obj.url;           //请求路径+请求信息
    let json = obj.json || false;//响应数据是否是json
    let data = obj.data || false;//请求信息  post、put 请求使用
    let str = '';
    if(data){
        for(let k in data){
            // `uname=${$name}&upwd=${$pwd}`
            str += `${k}=${data[k]}&`;
        }
        str = str.substr(0,str.length-1);
    }
    let fn = obj.fn;             //响应回调函数
    // 获取对象
    let xhr = new XMLHttpRequest();
    // 创建请求，打开连接
    xhr.open(method,url,true);
    // 判断是否是post，put
    if(method == 'post' || method == 'put'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
    }
    // 发送请求
    xhr.send(str);
    // 接收响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(json){
                var res = JSON.parse(xhr.response)
            }else{
                var res = xhr.response;
            }
            fn(res);
        }
    }
}

// 成功后弹出提示框公共函数
function addToShopping(content){
    let my_alert = document.getElementById('my_alert');
    my_alert.innerHTML = `<p>${content}<p>`;

    my_alert.style.width= '300px';
    my_alert.style.height = '40px';
    my_alert.style.backgroundColor = '#ffbb00';
    my_alert.style.borderRadius = '5px';
    my_alert.style.position = 'fixed';
    my_alert.style.top ='70px';
    my_alert.style.left ='50%';
    my_alert.style.transition = 'opacity 1s';
    my_alert.style.transform = 'translate(-50%)';
    my_alert.style.zIndex = '99999999999999999';
    my_alert.style.opacity = '1';

    let p = my_alert.children[0];
    p.style.textAlign = 'center';
    p.style.lineHeight =  '40px';
    p.style.color = '#fff';

    setTimeout(function(){
        my_alert.style.opacity = '0';
    },1000)

}
