import {typeText} from "./textDisplay.js";

function fetchSuggestion(route, outputId) {
    const selectedDate = $("#date").val();
    if (!selectedDate) {
        alert("请选择一个日期！");
        return;
    }
    $.ajax({
        url: 'http://10.189.140.61:18080' + route,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ date: selectedDate }),
        success: function (response) {
            if (response.error) {
                alert(response.error);
            } else {
                typeText(outputId, response[Object.keys(response)[0]], 50);
            }
        },
        error: function () {
            alert("请求失败，请稍后重试！");
        }
    });
}

function handleSuggestionButtons() {
    $("#get-health-suggestion").click(function () {
        fetchSuggestion("/get_health_suggestion", "combined-output");
    });

    $("#get-diet-suggestion").click(function () {
        fetchSuggestion("/get_diet_suggestion", "combined-output");
    });

    $("#get-exercise-suggestion").click(function () {
        fetchSuggestion("/get_exercise-suggestion", "combined-output");
    });
}

export { handleSuggestionButtons };