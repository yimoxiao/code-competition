function updateModules(response) {
    const data = response.data;
    $("#personal-info-value").html(
        `身高: ${data.height} cm<br>体重: ${data.weight} kg<br>性别: ${data.gender}`
    );
    $("#exercise-info-value").text(`${data.exercise}`);
    $("#heart-rate-value").text(`${data.heart_rate} 次/分钟`);
    $("#sleep-value").text(`${data.sleep_hours} 小时`);
    $("#steps-value").text(`${data.steps} 步`);
    $("#calories-value").text(`${data.calories} 千卡`);
    sendDataToServer(response)
}

function sendDataToServer(response) {
    const data = response.data;
    const storeData = {
        "height": data.height,
        "weight": data.weight,
        "gender": data.gender,
        "exercise": data.exercise,
        "heart_rate": data.heart_rate,
        "sleep_hours": data.sleep_hours,
        "steps": data.steps,
        "calories": data.calories
    };

    $.ajax({
        //TODO: new url ?
        url: 'http://10.189.140.61:18080/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(storeData),
        success: function (result) {
            console.log('success! result code：', result);
            $('#lunch-recognition').html(result);
        },
        error: function (error) {
            console.log('error! error code：', error.status);
        }
    });
}

function setBreakfastImgAnalyze(response) {
    const data = response.data;
    $("#breakfast-recognition").html(`${data}<br>`);
}

function setLunchImgAnalyze(response) {
    const data = response.data;
    $("#lunch-recognition").text(`${data}<br>`);
}

function setDinnerImgAnalyze(response) {
    const data = response.data;
    $("#dinner-recognition").text(`${data}<br>`);
}

export { updateModules, setBreakfastImgAnalyze, setLunchImgAnalyze, setDinnerImgAnalyze };