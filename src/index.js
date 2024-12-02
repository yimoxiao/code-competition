// 登录
document.addEventListener('DOMContentLoaded', function () {
    // 从localStorage中获取用户名
    var username = localStorage.getItem("user_name");

    if (!username) {
        alert("请先登录");
        window.location.href = "login.html";
        return;
    }

    document.cookie = "user_name=" + username;

    console.log("已保存到Cookie");

    localStorage.removeItem("user_name");
});