// 获取登录表单元素
const loginForm = document.getElementById('loginForm');
// 获取加载提示框元素
const loadingOverlay = document.getElementById('loadingOverlay');

// 给登录按钮添加点击事件监听器
loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // 阻止表单默认提交行为

    loadingOverlay.style.display = 'flex';

    const username = document.getElementById('username').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const data = {
        user_name: username,
    };

    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('请求成功，响应内容：', xhr.responseText);
            const username = document.getElementById('username').value;

            localStorage.setItem("user_name", username);
            window.location.href = 'index.html';
            // 隐藏加载提示框
            loadingOverlay.style.display = 'none';
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
            // 隐藏加载提示框
            loadingOverlay.style.display = 'none';
        }
    };
});