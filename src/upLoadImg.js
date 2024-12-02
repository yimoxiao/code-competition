import {getUsernameFromCookie, saveUsernameToCookie} from "./cookie.js";
import {setBreakfastImgAnalyze, setDinnerImgAnalyze, setLunchImgAnalyze} from "./moduleUpdate.js";

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
    upLoadImg(file, 'breakfast-input');
});

document.getElementById('lunch-input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        console.log("未选择文件");
        return;
    }
    upLoadImg(file, 'lunch-input');
});

document.getElementById('dinner-input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        console.log("未选择文件");
        return;
    }
    upLoadImg(file, 'dinner-input');
});

function upLoadImg(file, id) {
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
            if(id === 'breakfast-input') {
                getBreakfast();
            } else if (id === 'lunch-input') {
                getLunch();
            } else if (id === 'dinner-input') {
                getDinner();
            }
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
        }
    };
}

function getBreakfast() {
    console.log("getBreakfast");
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080/get_breakfast', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    const data = {date: date , user_name: username};
    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('请求成功，响应内容：', xhr.responseText);
            setBreakfastImgAnalyze(xhr.responseText);
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
        }
    };
}

function getLunch(){
    console.log("getLunch");
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080/get_lunch', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    const data = {date: date , user_name: username};
    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('请求成功，响应内容：', xhr.responseText);
            setLunchImgAnalyze(xhr.responseText);
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
        }
    };
}

function getDinner(){
    console.log("getDinner");
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080/get_dinner', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    const data = {date: date , user_name: username};
    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('请求成功，响应内容：', xhr.responseText);
            setDinnerImgAnalyze(xhr.responseText);
        } else if (xhr.readyState === 4) {
            console.log('请求失败，状态码：', xhr.status);
        }
    };
}

export{ handleUpLoadImgButtons };