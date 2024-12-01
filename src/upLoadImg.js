document.getElementById('breakfast-input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        console.log("未选择文件");
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080/upload_breakfast', true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');

    const formData = new FormData();

    const date = document.getElementById('date').value;

    formData.append('date', date);
    formData.append('photo', file.name);

    xhr.send(formData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('请求成功，响应内容：', xhr.responseText);
            loadingOverlay.style.display = 'none';
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
        }
    };
});