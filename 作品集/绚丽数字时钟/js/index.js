var WINDOW_WIDTH; //画布宽度
var WINDOW_HEIGHT; //画布高度
var RADIUS = 7; //每个原的半径
var d = 1; //每个圆外的边距
var MARGIN_TOP; //数字距离画布上边的距离
var MARGIN_LEFT; //数字距离画布左边你的距离
var endTime = new Date(); //设置截止时间
var curShowTimeSeconds; //当前要显示的时间
var balls = []; //存放爆炸的小球
var statu = 1; //当前时钟显示的是哪种状态：1:倒计时，2：当前时间
var interface = "setup";

const colors = ["#33bb5e5", "#099cc", "#aa66cc", "#9933cc", "#99cc00", "#669900", "#ffbb33", "#ff8800", "ff4444", "#cc00cc"]; //爆炸小球的颜色
window.onload = function () {

    geyData();



    if (WINDOW_WIDTH < 600) {
        var models = document.getElementsByClassName('models');
        for (var i = 0; i < models.length; i++) {
            models[i].style.width = "80%";
        }
        console.log(document.getElementsByClassName('models'));
    }

    setData(0, 0, 0); //设置各项参数
    var cav = document.getElementById('Timecanvas');
    cav.style.display = 'none';

    events(cav);

    if (cav.getContext('2d')) {
        var cxt = cav.getContext('2d');
        cav.width = WINDOW_WIDTH;
        cav.height = WINDOW_HEIGHT;

        curShowTimeSeconds = getcurShowTimeSeconds(); //刷新时间
        setInterval(function () {
            geyData();
            cav.width = WINDOW_WIDTH;
            cav.height = WINDOW_HEIGHT;
            render(cxt); //绘制时间小球
            update(); //更新时间
        }, 50);
    } else {
        alert("当前浏览器不支持canvas，请更换浏览器");
    }
};

//切换时钟界面和操控界面
function switchTimeSetup(witch) {
    var setup = document.getElementById('main_content');
    var Timecanvas = document.getElementById("Timecanvas");
    if (witch == 'ShowTime') {
        setup.style.display = 'none';
        Timecanvas.style.display = 'block';
        interface = "ShowTime";
    }
    if (witch == 'setup') {
        setup.style.display = 'flex';
        Timecanvas.style.display = 'none';
        interface = "setup";
    }
    while (balls.length) {
        balls.pop(); //删除掉画布外的小球
    }
}

//设置各个参数的值
function geyData() {
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight - 5;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
}

//设置参数值
function setData(h, m, s) {
    var nowTime = new Date();
    endTime.setTime(nowTime.getTime() + (h * 3600 + m * 60 + s) * 1000); //设置结束时间
}

//数据的改变
function update() {
    var nextShowTimeSeconds = getcurShowTimeSeconds();

    //接下来应该显示的时间
    var nexthours = parseInt(nextShowTimeSeconds / 3600);
    var nextminutes = parseInt((nextShowTimeSeconds - nexthours * 3600) / 60);
    var nextseconds = nextShowTimeSeconds % 60;

    //当前显示的时间
    var curhours = parseInt(curShowTimeSeconds / 3600);
    var curminutes = parseInt((curShowTimeSeconds - curhours * 3600) / 60);
    var curseconds = curShowTimeSeconds % 60;

    if (nextseconds != curseconds) { //判断哪些数字发生了变化
        if (parseInt(curhours / 10) != parseInt(nexthours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curhours / 10)); //发生变化的数字，将其加入到爆炸小球队列
        }
        if (parseInt(curhours % 10) != parseInt(nexthours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + d), MARGIN_TOP, parseInt(curhours % 10));
        }
        if (parseInt(curminutes / 10) != parseInt(nextminutes / 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + d), MARGIN_TOP, parseInt(curminutes / 10));
        }
        if (parseInt(curminutes % 10) != parseInt(nextminutes % 10)) {
            addBalls(MARGIN_LEFT + 69 * (RADIUS + d), MARGIN_TOP, parseInt(curminutes % 10));
        }
        if (parseInt(curseconds / 10) != parseInt(nextseconds / 10)) {
            addBalls(MARGIN_LEFT + 79 * (RADIUS + d), MARGIN_TOP, parseInt(curseconds / 10));
        }
        if (parseInt(curseconds % 10) != parseInt(nextseconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + d), MARGIN_TOP, parseInt(curseconds % 10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
        if (statu == 1) {
            if (nexthours < 10) {
                nexthours = '0' + nexthours;
            }
            if (nextminutes < 10) {
                nextminutes = '0' + nextminutes;
            }
            if (nextseconds < 10) {
                nextseconds = '0' + nextseconds;
            }
            document.getElementById("Endtime").innerHTML = nexthours + ":" + nextminutes + ":" + nextseconds;
        }
    }
    updateBalls(); //更新小球位置
}

//更新小球
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g; //y方向的速度改变
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) { //检测碰撞
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.65; //每次碰撞后的速度损失
        }
    }
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) { //找出还在画布内的小球
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }
    while (cnt < balls.length) {
        balls.pop(); //删除掉画布外的小球
    }
}

//添加爆炸小球
function addBalls(x, y, num) {
    var vx = Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4;
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var ball = {
                    x: x + 2 * (RADIUS + d) * j + (RADIUS + d), //爆炸位置
                    y: y + 2 * (RADIUS + d) * i + (RADIUS + d),
                    r: RADIUS,
                    g: 1.5 + Math.random(), //加速度
                    // vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vx: vx, //起始速度
                    vy: -5,
                    color: colors[Math.floor(Math.random() * (colors.length))] //小球颜色
                }
                balls.push(ball); //加入到爆炸小球队列
            }
        }
    }
}

//刷新时间
function getcurShowTimeSeconds() {
    var now = new Date();
    var TimingStatus = document.getElementById("TimingStatus");
    if (statu == 1) { //倒计时模式
        var ret = endTime.getTime() - now.getTime(); //计算到结束时间的差值
    }
    if (statu == 2) { //显示当前时间
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();

        var ret = (h * 3600 + m * 60 + s) * 1000; //计算到结束时间的差值

    }
    ret = Math.round(ret / 1000);
    if (ret > 0) {
        if (statu == 1) {
            TimingStatus.innerHTML = "已启动";
            TimingStatus.style.background = "rgb(162, 231, 212)";
            TimingStatus.style.borderColor = "rgb(100, 214, 155)";
        }
        return ret;
    } else {
        TimingStatus.innerHTML = "未运行";
        TimingStatus.style.background = "rgb(246,194,196)";
        TimingStatus.style.borderColor = "rgb(230,91,94)";
        var cav = document.getElementById('Timecanvas'); //倒计时结束，隐藏时钟
        var main_content = document.getElementById('main_content'); //倒计时结束，隐藏时钟
        //switchTimeSetup(main_content, cav, "setup");
        return 0;
    }
}


/*计算数字显示位置并绘制*/
function render(cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); //清除画布
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    //定位每个数字的位置并绘制
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + d), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + d), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + d), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + d), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + d), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + d), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + d), MARGIN_TOP, parseInt(seconds % 10), cxt);


    //绘制爆炸小球
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}


/*绘制时间小球*/
function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + 2 * (RADIUS + d) * j + (RADIUS + d), y + 2 * (RADIUS + d) * i + (RADIUS + d), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }


}

//所有时间函数
function events(cav) {
    //开始计时
    var startbtn = document.getElementById('startbtn');
    var displayNowTime = document.getElementById('displayNowTime');

    startbtn.onclick = function () {
        var hours = document.getElementById('timing_hours').value;
        var minutes = document.getElementById('timing_minutes').value;
        var seconds = document.getElementById('timing_seconds').value;
        if (hours && minutes && seconds) {
            statu = 1;
            setData(parseInt(hours), parseInt(minutes), parseInt(seconds));
            switchTimeSetup("ShowTime");
        } else {
            alert("请填写定时时间！");
        }
    }
    displayNowTime.onclick = function () {
        statu = 2;
        setData(0, 0, 0);
        switchTimeSetup("ShowTime");
    };
    //手动切换界面
    document.onkeyup = function (e) {
        if (e.keyCode == 27) {
            switchTimeSetup("setup");
        }
    };

    //查看时间
    var SeeTiming = document.getElementById('SeeTiming');
    SeeTiming.onclick = function () {
        statu = 1;
        var EndTime = document.getElementById("Endtime").innerHTML;
        console.log(EndTime);
        switchTimeSetup("ShowTime");
        setData(parseInt(EndTime.split(':')[0]), parseInt(EndTime.split(':')[1]), parseInt(EndTime.split(':')[2]));
    }

    //提前结束倒计时
    var Timingstop = document.getElementById("Timingstop");
    Timingstop.onclick = function () {
        statu = 1;
        setData(00, 00, 00);
    }
}