import {getUsernameFromCookie} from "./cookie.js";
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
