/*
* 功能：绘制小球
* 时间：2018-10-8
*/
function Ball(x,y,radius,color){
	this.x = x || 0;
	this.y = x || 0;
	this.radius = radius || 15;
	this.color = color || "red";
	this.scaleX = 1;
	this.scaleY = 1;
}

Ball.prototype = {
	//绘制描边小球
	atroke:function(cxt){
		cxt.save();
		cxt.scale(this.scaleX,this.scaleY);   //scale() 方法为画布的当前变换矩阵添加一个缩放变换。缩放通过独立的水平和垂直缩放因子来完成。例如，传递一个值 2.0 和 0.5 将会导致绘图路径宽度变为原来的两倍，而高度变为原来的 1/2。指定一个负的 sx 值，会导致 X 坐标沿 Y 轴对折，而指定一个负的 sy 会导致 Y 坐标沿着 X 轴对折。
		cxt.strokeStyle = this.color;
		cxt.beginPath();
		cxt.arc(this.x,this.y,this.radius,0,360*Math.PI/180);
		cxt.closePath();
		cxt.stroke();
		cxt.restore();  //restore() 方法将绘图状态置为保存值。
	},
	//绘制填充小球
	fill:function(cxt){
		cxt.save();
		cxt.scale(this.scaleX,this.scaleY);
		cxt.fillStyle = this.color;
		cxt.beginPath();
		cxt.arc(this.x,this.y,this.radius,0,360*Math.PI/180);
		cxt.closePath();
		cxt.fill();
		cxt.restore();
	}
}