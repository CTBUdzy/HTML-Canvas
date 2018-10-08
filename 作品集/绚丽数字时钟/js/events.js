function events() {
    //开始计时
    var startbtn = document.getElementById('startbtn');
    startbtn.onclick = function () {
        var setTime = document.getElementById('setTime').value;
        if (setTime) {
            var h = parseInt(setTime.split(':')[0]);
            var m = parseInt(setTime.split(':')[1]);
            setData(h, m);
            cav.style.display = 'block';
        }
    }
}