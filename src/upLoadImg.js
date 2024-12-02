import {getUsernameFromCookie, saveUsernameToCookie} from "./cookie.js";
import {setBreakfastImgAnalyze, setDinnerImgAnalyze, setLunchImgAnalyze, updateModules} from "./moduleUpdate.js";

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
    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    const data = {date: date , user_name: username};
    $.ajax({
        url: "http://10.189.140.61:18080/get_breakfast",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({date: date , user_name: username}),
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            if (response.error) {
                alert(response.error);
            } else {
                console.log('请求成功，响应内容：', response);
                setBreakfastImgAnalyze(response);
            }
        },
        error: function () {

        }
    });
}

function getLunch(){
    console.log("getLunch");
    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    const data = {date: date , user_name: username};
    $.ajax({
        url: "http://10.189.140.61:18080/get_lunch",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({date: date , user_name: username}),
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            if (response.error) {
                alert(response.error);
            } else {
                console.log('请求成功，响应内容：', response);
                setLunchImgAnalyze(response);
            }
        },
        error: function () {

        }
    });
}

function getDinner(){
    console.log("getDinner");
    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    const data = {date: date , user_name: username};
    $.ajax({
        url: "http://10.189.140.61:18080/get_dinner",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({date: date , user_name: username}),
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            if (response.error) {
                alert(response.error);
            } else {
                console.log('请求成功，响应内容：', response);
                setDinnerImgAnalyze(response);
            }
        },
        error: function () {

        }
    });
}

export{ handleUpLoadImgButtons, getBreakfast, getLunch ,getDinner };