function getUsernameFromCookie() {
    // 解析Cookie字符串获取用户名
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith("user_name=")) {
            return cookie.substring(10);
        }
    }
    return null;
}

function saveUsernameToCookie(username) {
    // 设置Cookie的过期时间，这里设置为1天（以秒为单位）
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));

    // 构造Cookie字符串，格式为：键=值; expires=过期时间; path=/
    var cookieString = "user_name=" + username + "; expires=" + expires.toUTCString() + "; path=/";

    // 将Cookie字符串设置到浏览器的Cookie中
    document.cookie = cookieString;
}

export { getUsernameFromCookie, saveUsernameToCookie };