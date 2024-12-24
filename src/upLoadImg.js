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
    upLoadImg(file, 'breakfast-input', '/upload_breakfast');
});

document.getElementById('lunch-input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        console.log("未选择文件");
        return;
    }
    upLoadImg(file, 'lunch-input', '/upload_lunch');
});

document.getElementById('dinner-input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        console.log("未选择文件");
        return;
    }
    upLoadImg(file, 'dinner-input', '/upload_dinner');
});

function upLoadImg(file, id, uri) {
    var username = getUsernameFromCookie();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://10.189.140.61:18080' + uri, true);
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

function getBreakfast(is_active = false) {
    console.log("getBreakfast");
    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    if(!is_active) {
        const loading = document.getElementById('breakfast-loading');
        loading.style.display = 'flex';
    }
    $.ajax({
        url: "http://10.189.140.61:18080/get_breakfast",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({date: date , user_name: username, cache: is_active}),
        success: function (response) {
            if(!is_active){
                const loading = document.getElementById('breakfast-loading');
                loading.style.display = 'none';
            }
            if (response.error) {
                alert(response.error);
            } else {
                console.log('请求成功，响应内容：', response);
                setBreakfastImgAnalyze(response);
            }
        },
        error: function () {
            if(!is_active) {
                const loading = document.getElementById('breakfast-loading');
                loading.style.display = 'none';
            }
        }
    });
}

function getLunch(is_active = false) {
    console.log("getLunch");
    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    if(!is_active) {
        const loading = document.getElementById('lunch-loading');
        loading.style.display = 'flex';
    }
    $.ajax({
        url: "http://10.189.140.61:18080/get_lunch",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({date: date , user_name: username, cache: is_active}),
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            if(!is_active) {
                const loading = document.getElementById('lunch-loading');
                loading.style.display = 'none';
            }
            if (response.error) {
                alert(response.error);
            } else {
                console.log('请求成功，响应内容：', response);
                setLunchImgAnalyze(response);
            }
        },
        error: function () {
            if(!is_active) {
                const loading = document.getElementById('lunch-loading');
                loading.style.display = 'none';
            }
        }
    });
}

function getDinner(is_active = false) {
    console.log("getDinner");
    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    if(!is_active) {
        const loading = document.getElementById('dinner-loading');
        loading.style.display = 'flex';
    }
    $.ajax({
        url: "http://10.189.140.61:18080/get_dinner",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({date: date , user_name: username, cache: is_active}),
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            if(!is_active) {
                const loading = document.getElementById('dinner-loading');
                loading.style.display = 'none';
            }
            if (response.error) {
                alert(response.error);
            } else {
                console.log('请求成功，响应内容：', response);
                setDinnerImgAnalyze(response);
            }
        },
        error: function () {
            if(!is_active) {
                const loading = document.getElementById('dinner-loading');
                loading.style.display = 'none';
            }
        }
    });
}

export{ handleUpLoadImgButtons, getBreakfast, getLunch ,getDinner };