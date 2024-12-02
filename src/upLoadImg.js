import {getUsernameFromCookie} from "./cookie.js";

function handleUpLoadImgButtons() {
    $('#breakfast-input').click(function (event) {
        const selectedDate = $("#date").val();
        if (!selectedDate) {
            event.preventDefault();
            alert("请选择一个日期！");
        }
    });

    $('#lunch-input').click(function (event) {
        const selectedDate = $("#date").val();
        if (!selectedDate) {
            event.preventDefault();
            alert("请选择一个日期！");
        }
    });

    $('#dinner-input').click(function (event) {
        const selectedDate = $("#date").val();
        if (!selectedDate) {
            event.preventDefault();
            alert("请选择一个日期！");
        }
    });
}

document.getElementById('breakfast-input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        console.log("未选择文件");
        return;
    }
    upLoadImg(file);
});

document.getElementById('lunch-input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        console.log("未选择文件");
        return;
    }
    upLoadImg(file);
});

document.getElementById('dinner-input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        console.log("未选择文件");
        return;
    }
    upLoadImg(file);
});

function upLoadImg(file) {
    var username = getUsernameFromCookie();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080/upload_breakfast', true);
    xhr.withCredentials = true;

    const formData = new FormData();

    const date = document.getElementById('date').value;

    formData.append('date', date);
    formData.append('photo', file);
    formData.append('user_name', username);

    xhr.send(formData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('请求成功，响应内容：', xhr.responseText);
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
        }
    };
}

export{ handleUpLoadImgButtons };