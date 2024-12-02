import {getUsernameFromCookie, saveUsernameToCookie} from "./cookie.js";
import {setDinnerImgAnalyze} from "./moduleUpdate.js";
// 登录
document.addEventListener('DOMContentLoaded', function () {
    // 从localStorage中获取用户名
    var username = getUsernameFromCookie();

    if (!username) {
        alert("请先登录");
        window.location.href = "login.html";
        return;
    }
    console.log(username);
});

document.getElementById("breakfast-button").addEventListener("click", function () {
    document.getElementById('breakfast-input').click();
});

document.getElementById("lunch-button").addEventListener("click", function () {
    document.getElementById('lunch-input').click();
});

document.getElementById("dinner-button").addEventListener("click", function () {
    document.getElementById('dinner-input').click();
});

document.getElementById("breakfast-calibration").addEventListener("click", function () {
    breakfastCalibration();
});

document.getElementById("lunch-calibration").addEventListener("click", function () {
    lunchCalibration();
});

document.getElementById("dinner-calibration").addEventListener("click", function () {
    dinnerCalibration();
});

function breakfastCalibration() {

    const username = getUsernameFromCookie();
    const date = document.getElementById('date').value;
    const change = document.getElementById('breakfast-recognition').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080/config_breakfast', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const data = {
        user_name: username,
        date: date,
        change: change,
    };

    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('请求成功，响应内容：', xhr.responseText);
            document.getElementById('breakfast-recognition').innerHTML = xhr.responseText;
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
        }
    };
}

function lunchCalibration() {
    const username = getUsernameFromCookie();
    const date = document.getElementById('date').value;
    const change = document.getElementById('lunch-recognition').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080/config_lunch', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const data = {
        user_name: username,
        date: date,
        change: change,
    };

    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('请求成功，响应内容：', xhr.responseText);
            document.getElementById('lunch-recognition').innerHTML = xhr.responseText;
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
        }
    };
}

function dinnerCalibration() {
    const username = getUsernameFromCookie();
    const date = document.getElementById('date').value;
    const change = document.getElementById('dinner-recognition').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080/config_dinner', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const data = {
        user_name: username,
        date: date,
        change: change,
    };

    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('请求成功，响应内容：', xhr.responseText);
            document.getElementById('dinner-recognition').innerHTML = xhr.responseText;
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
        }
    };
}
