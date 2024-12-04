import {typeText} from "./textDisplay.js";
import {getUsernameFromCookie} from "./cookie.js";

function fetchSuggestion(route, outputId) {
    const selectedDate = $("#date").val();
    if (!selectedDate) {
        alert("请选择一个日期！");
        return;
    }
    const username = getUsernameFromCookie();
    $.ajax({
        url: 'http://10.189.140.61:18080' + route,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ date: selectedDate , user_name: username , cache : false}),
        success: function (response) {
            if (response.error) {
                alert(response.error);
            } else {
                typeText(outputId, response.data, 50);
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