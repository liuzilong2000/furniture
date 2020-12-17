var map = new BMapGL.Map('container');
var point = new BMapGL.Point(113.633999, 34.821362);
map.centerAndZoom(point, 15);
// 创建小车图标
var myIcon = new BMapGL.Icon("/images/fox.gif", new BMapGL.Size(150, 80));
// 创建Marker标注，使用小车图标
var pt = new BMapGL.Point(113.633999, 34.821362);
var marker = new BMapGL.Marker(pt, {
	icon: myIcon
});
var opts = {
    width: 200,
    height: 100,
    title: '宜家家具'
};
var infoWindow = new BMapGL.InfoWindow('地址：河南省郑州市惠济区长兴路2号。<br>电话：4008002345', opts);
map.openInfoWindow(infoWindow, point);
// function getInfoContent() {
//     alert(infoWindow.getContent());
// }
// 将标注添加到地图
map.addOverlay(marker);
map.enableScrollWheelZoom(true);

// 点击获取位置
let top_location = document.getElementsByClassName('top_location')[0];
// 地图
let mapH = document.getElementById('map');
top_location.onclick = function(){
    mapH.style.height = 500+'px';
    let time = setInterval(function(){
        window.scrollTo(0, document.body.scrollHeight)
    },15)
    setTimeout(function(){
        clearInterval(time)
    },300)
}