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