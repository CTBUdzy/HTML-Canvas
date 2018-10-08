//将tools定义为window对象的属性，该属性的值是一个对象
window.tools = {};



/*
*作用：获取鼠标位置
*传参：被监测的canvas对象
*时间：2018-10-8
*/


//获取鼠标位置
window.tools.getMouse = function(element){
	//定义一个Mouse对象
	var mouse = {
		x:0,
		y:0
	};
	//为传入的元素添加mousemove事件
	element.addEventListener("mousemove",function(e){
		var x , y ;
		//在IE中，event对象是座位window对象的一个属性存在
		var e = e || e.event;
		//获取鼠标当前位置，并做兼处理
		if(e.pageX || e.pageY){
			x = e.pageX;
			y = e.pageY;
		}
		//兼容IE8及以下，以及混杂模式下的chrome和safari
		else{
			x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
		}
		//当前的坐标值减去canvas元素的偏移量，则x,y为鼠标在canvas上的位置
		x -= element.offsetLeft;
		y -= element.offsetTop;
		
		mouse.x = x;
		mouse.y = y;
	})
	
	//返回Mouse对象
	return mouse;
}



/*
*作用：获取键盘控制方向
*传参：无
*时间：2018-10-8
*/

window.tools.getKey = function(){
	var key = {};
	window.addEventListener("keydown",function(e){
		//游戏中的上下左右或者wasd
		if(e.keyCode == 38 || e.keyCode == 87){
			key.direction = "up";
		}else if(e.keyCode == 39 || e.keyCode == 68){
			key.direction = "right";
		}else if(e.keyCode == 40 || e.keyCode == 83){
			key.direction = "down";
		}else if(e.keyCode == 37 || e.keyCode == 65){
			key.direction = "left";
		}else{
			key.direction = "";
		}
	});
	return key;
}
























