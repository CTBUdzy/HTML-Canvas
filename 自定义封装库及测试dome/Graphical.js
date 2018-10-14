/*
* 功能：绘制小球
* 时间：2018-10-8
*/
function Ball(x,y,radius,color){
	this.x = x || 0;
	this.y = y || 0;
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
	},
	////返回外接矩形的左上角坐标和宽高
	getRect:function(){
		var rect = {
			x:this.x-this.radius,
			y:this.y-this.radius,
			width:2*this.radius,
			height:2*this.radius
		};
		return rect;
	}
}

/*
* 功能：绘制箭头
* 传入参数： x:箭头中心x轴坐标
			y：箭头中心y轴坐标
			color:颜色
			angle:旋转角度
* 时间：2018-10-8
*/
function Arrow(x, y, color, angle) {
    //箭头中心x坐标，默认值为0
    this.x = x || 0;
    //箭头中心y坐标，默认值为0
    this.y = y || 0;
    //颜色，默认值为“#FF0099”
    this.color = color || "#FF0099";
    //旋转角度，默认值为0
    this.angle = angle || 0;
}
Arrow.prototype = {
    stroke: function (cxt) {
        cxt.save();
        cxt.translate(this.x, this.y);
        cxt.rotate(this.angle);
        cxt.strokeStyle = this.color;
        cxt.beginPath();
        cxt.moveTo(-20, -10);
        cxt.lineTo(0, -10);
        cxt.lineTo(0, -20);
        cxt.lineTo(20, 0);
        cxt.lineTo(0, 20);
        cxt.lineTo(0, 10);
        cxt.lineTo(-20, 10);
        cxt.closePath();
        cxt.stroke();
        cxt.restore();
    },
    fill: function (cxt) {
        cxt.save();
        cxt.translate(this.x, this.y);
        cxt.rotate(this.angle);
        cxt.fillStyle = this.color;
        cxt.beginPath();
        cxt.moveTo(-20, -10);
        cxt.lineTo(0, -10);
        cxt.lineTo(0, -20);
        cxt.lineTo(20, 0);
        cxt.lineTo(0, 20);
        cxt.lineTo(0, 10);
        cxt.lineTo(-20, 10);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
    }
};

