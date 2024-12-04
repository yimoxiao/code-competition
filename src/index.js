import {getUsernameFromCookie} from "./cookie.js";

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
    {buttonId: "breakfast-button", inputId: "breakfast-input"},
    {buttonId: "lunch-button", inputId: "lunch-input"},
    {buttonId: "dinner-button", inputId: "dinner-input"}
];

const calibrationFunctions = [
    {calibrationButtonId: "breakfast-calibration", calibrationFunction: breakfastCalibration},
    {calibrationButtonId: "lunch-calibration", calibrationFunction: lunchCalibration},
    {calibrationButtonId: "dinner-calibration", calibrationFunction: dinnerCalibration},
];

buttonInputPairs.forEach(({buttonId, inputId}) => {
    bindButtonToInputClick(buttonId, inputId);
});

calibrationFunctions.forEach(({calibrationButtonId, calibrationFunction}) => {
    bindCalibrationButtonClick(calibrationButtonId, calibrationFunction);
});

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
            $('#' + recognitionId).text(result.data);
        },
        error: function (error) {
            console.log('请求失败，状态码：', error.status);
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