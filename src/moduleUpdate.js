function updateModules(response) {
    const data = response.data;
    var sex = "女";
    if(data.sex === "male") {
        sex = "男";
    }
    $("#personal-info-value").html(
        `身高: ${data.height} cm<br>
        体重: ${data.weight} kg<br>
        性别: ${sex}`
    );
    const str = data.exercise;
    const fixStr = str.replace(/'/g, '"');
    const exerciseJson = JSON.parse(fixStr);
    if(data.exercise === "{}"){
        $("#exercise-info-value").text("--");
    } else {
        $("#exercise-info-value").text(`${exerciseJson.name} 时间: ${exerciseJson.time} 卡路里: ${exerciseJson.calories}`);
    }
    $("#heart-rate-value").text(`${data.restBPM} 次/分钟`);
    $("#sleep-value").text(`${data.sleep} 分钟`);
    $("#steps-value").text(`${data.steps} 步`);
    $("#calories-value").text(`${data.calories} 千卡`);
    $("#fit-image").attr("src", "public/fit_rabbit/" + data.emotion + ".png");
}

function setBreakfastImgAnalyze(response) {
    const data = response.data;
    $("#breakfast-recognition").html(`${data}`);
}

function setLunchImgAnalyze(response) {
    const data = response.data;
    $("#lunch-recognition").text(`${data}`);
}

function setDinnerImgAnalyze(response) {
    const data = response.data;
    $("#dinner-recognition").text(`${data}`);
}

export { updateModules, setBreakfastImgAnalyze, setLunchImgAnalyze, setDinnerImgAnalyze };