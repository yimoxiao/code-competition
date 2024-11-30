// 获取登录表单元素
const loginForm = document.getElementById('loginForm');
// 获取加载提示框元素
const loadingOverlay = document.getElementById('loadingOverlay');

// 给登录按钮添加点击事件监听器
loginForm.addEventListener('submit', function (e) {
  e.preventDefault(); // 阻止表单默认提交行为

  // 显示加载提示框
  loadingOverlay.style.display = 'flex';

  // 获取用户名和密码输入框的值
  const username = document.getElementById('username').value;

  // 创建一个模拟的Ajax POST请求对象
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://10.189.140.61:18080/login', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // 构建要发送的数据对象
  const data = {
    user_name: username,
  };

  // 将数据对象转换为JSON字符串
  const jsonData = JSON.stringify(data);

  // 发送请求
  xhr.send(jsonData);

  // 处理请求响应的逻辑
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('请求成功，响应内容：', xhr.responseText);
      const username = document.getElementById('username').value;
      // 假设跳转到名为home.html的页面，添加用户名作为参数
      window.location.href = 'index.html?username=' + username;
      // 隐藏加载提示框
      loadingOverlay.style.display = 'none';
    } else if (xhr.readyState === 4) {
      console.log('请求失败，状态码：', xhr.status);
      // 隐藏加载提示框
      loadingOverlay.style.display = 'none';
    }
  };
});