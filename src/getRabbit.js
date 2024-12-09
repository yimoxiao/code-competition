import {getUsernameFromCookie} from "./cookie.js";
function getRabbit() {
    console.log("getRabbit");
    const date = document.getElementById('date').value;
    const username = getUsernameFromCookie();
    $.ajax({
        url: "http://10.189.140.61:18080/get_rabbit",
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
                setRabbit(response);
            }
        },
        error: function () {

        }
    });
}

function setRabbit(response) {
    console.log("setRabbit");
    const img = "data:image/jpeg;base64," + response.data;
    $("#fit-image").attr("src", img);
}

export {getRabbit};