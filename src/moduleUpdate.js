function updateModules(response) {
    const data = response.data;
    var sex = "女";
    if(data.sex === "male") {
        sex = "男";
    }
    $("#height-label").text(`${data.height}`);
    $("#weight-label").text(`${data.weight}`);
    const str = data.exercise;
    const fixStr = str.replace(/'/g, '"');
    const exerciseJson = JSON.parse(fixStr);
    if(data.exercise === "{}"){
    } else {
        $("#exercise-item-label").text(`${exerciseJson.name}`);
        $("#execrise-time-label").text(`${exerciseJson.time}`);
        $("#execrise-calories-label").text(`${exerciseJson.calories}`);
    }
    $("#heart-rate-label").text(`${data.restBPM}`);
    $("#sleep-label").text(`${data.sleep}`);
    $("#steps-label").text(`${data.steps}`);
    $("#calories-label").text(`${data.calories}`);
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