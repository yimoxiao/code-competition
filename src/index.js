import {getUsernameFromCookie, saveUsernameToCookie} from "./cookie.js";
import {setDinnerImgAnalyze} from "./moduleUpdate.js";
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

// document.getElementById("breakfast-button").addEventListener("click", function () {
//     document.getElementById('breakfast-input').click();
// });
//
// document.getElementById("lunch-button").addEventListener("click", function () {
//     document.getElementById('lunch-input').click();
// });
//
// document.getElementById("dinner-button").addEventListener("click", function () {
//     document.getElementById('dinner-input').click();
// });

// document.getElementById("breakfast-calibration").addEventListener("click", function () {
//     breakfastCalibration();
// });
//
// document.getElementById("lunch-calibration").addEventListener("click", function () {
//     lunchCalibration();
// });
//
// document.getElementById("dinner-calibration").addEventListener("click", function () {
//     dinnerCalibration();
// });


function bindButtonToInputClick(buttonId, inputId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener("click", function () {
            const input = document.getElementById(inputId);
            if (input) {
                input.click();
            }
        });
    }
}

function bindCalibrationButtonClick(calibrationButtonId, calibrationFunction) {
    const button = document.getElementById(calibrationButtonId);
    if (button) {
        button.addEventListener("click", function () {
            calibrationFunction();
        });
    }
}

const buttonInputPairs = [
    { buttonId: "breakfast-button", inputId: "breakfast-input" },
    { buttonId: "lunch-button", inputId: "lunch-input" },
    { buttonId: "dinner-button", inputId: "dinner-input" }
];

const calibrationFunctions = {
    "breakfast-calibration": breakfastCalibration,
    "lunch-calibration": lunchCalibration,
    "dinner-calibration": dinnerCalibration
};

buttonInputPairs.forEach(({ buttonId, inputId }) => {
    bindButtonToInputClick(buttonId, inputId);
});

calibrationFunctions.forEach((calibrationButtonId, calibrationFunction) => {
    bindCalibrationButtonClick(calibrationButtonId, calibrationFunction);
});



// function breakfastCalibration() {
//
//     const username = getUsernameFromCookie();
//     const date = document.getElementById('date').value;
//     const change = document.getElementById('breakfast-recognition').value;
//
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://10.189.140.61:18080/config_breakfast', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     const data = {
//         user_name: username,
//         date: date,
//         change: change,
//     };
//
//     const jsonData = JSON.stringify(data);
//
//     xhr.send(jsonData);
//
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             console.log('请求成功，响应内容：', xhr.responseText);
//             document.getElementById('breakfast-recognition').innerHTML = xhr.responseText;
//         } else if (xhr.readyState === 4) {
//             console.log('请求失败，状态码：', xhr.status);
//         }
//     };
// }
//
// function lunchCalibration() {
//     const username = getUsernameFromCookie();
//     const date = document.getElementById('date').value;
//     const change = document.getElementById('lunch-recognition').value;
//
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://10.189.140.61:18080/config_lunch', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     const data = {
//         user_name: username,
//         date: date,
//         change: change,
//     };
//
//     const jsonData = JSON.stringify(data);
//
//     xhr.send(jsonData);
//
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             console.log('请求成功，响应内容：', xhr.responseText);
//             document.getElementById('lunch-recognition').innerHTML = xhr.responseText;
//         } else if (xhr.readyState === 4) {
//             console.log('请求失败，状态码：', xhr.status);
//         }
//     };
// }
//
// function dinnerCalibration() {
//     const username = getUsernameFromCookie();
//     const date = document.getElementById('date').value;
//     const change = document.getElementById('dinner-recognition').value;
//
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://10.189.140.61:18080/config_dinner', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     const data = {
//         user_name: username,
//         date: date,
//         change: change,
//     };
//
//     const jsonData = JSON.stringify(data);
//
//     xhr.send(jsonData);
//
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             console.log('请求成功，响应内容：', xhr.responseText);
//             document.getElementById('dinner-recognition').innerHTML = xhr.responseText;
//         } else if (xhr.readyState === 4) {
//             console.log('请求失败，状态码：', xhr.status);
//         }
//     };
// }

function makeCalibrationRequest(endpoint, recognitionId) {
    const username = getUsernameFromCookie();
    const date = $('#date').val();
    const change = $('#' + recognitionId).val();

    $.ajax({
        url: endpoint,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            user_name: username,
            date: date,
            change: change
        }),
        success: function (result) {
            console.log('请求成功，响应内容：', result);
            $('#' + recognitionId).html(result);
        },
        error: function (error) {
            console.log('请求失败，状态码：', error.status);
            // 可以在这里添加更多错误处理逻辑，比如给用户提示等
        }
    });
}

function breakfastCalibration() {
    makeCalibrationRequest('http://10.189.140.61:18080/config_breakfast', 'breakfast-recognition');
}
function lunchCalibration() {
    makeCalibrationRequest('http://10.189.140.61:18080/config_lunch', 'lunch-recognition');
}
function dinnerCalibration() {
    makeCalibrationRequest('http://10.189.140.61:18080/config_dinner', 'dinner-recognition');
}