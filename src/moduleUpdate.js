function updateModules(data) {
    $("#personal-info-value").html(
        `身高: ${data.height} cm<br>体重: ${data.weight} kg<br>性别: ${data.gender}`
    );
    $("#diet-info-value").text(`${data.diet_kcal} kcal`);
    $("#exercise-info-value").text(`${data.exercise} 运动量`);
    $("#heart-rate-value").text(`${data.heart_rate} 次/分钟`);
    $("#sleep-value").text(`${data.sleep_hours} 小时`);
    $("#steps-value").text(`${data.steps} 步`);
    $("#calories-value").text(`${data.calories} 千卡`);
}

export { updateModules };