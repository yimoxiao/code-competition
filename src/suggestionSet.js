import {typeText} from "./textDisplay.js";
import {getUsernameFromCookie} from "./cookie.js";

let isTextOutputting = false;

function fetchSuggestion(route, outputId) {
    const selectedDate = $("#date").val();
    if (!selectedDate) {
        alert("请选择一个日期！");
        return;
    }
    var data;
    const username = getUsernameFromCookie();
    if(route === "/get_health_suggestion") {
        data = { date: selectedDate , user_name: username , cache : false};
    } else if(route === "/get_diet_suggestion") {
        const food1 = $("#breakfast-recognition").val();
        const food2 = $("#lunch-recognition").val();
        const food3 = $("#dinner-recognition").val();
        data = {date: selectedDate , user_name: username , food1: food1, food2: food2, food3 : food3, cache : false};
        console.log(data);
    } else {
        var aim =  $("#exercise-info-value").text();
        if(aim === "--" ){
            aim = "";
        }
        data = {date: selectedDate , user_name: username , aim: aim, cache : false};
    }
    $.ajax({
        url: 'http://10.189.140.61:18080' + route,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            if (response.error) {
                alert(response.error);
            } else {
                console.log(response);
                isTextOutputting = true;
                typeText(outputId, response.data, 100);
            }
        },
        error: function () {
            alert("请求失败，请稍后重试！");
        }
    });
}

function handleSuggestionButtons() {
    $("#get-health-suggestion").click(function () {
        if (!isTextOutputting) {
            fetchSuggestion("/get_health_suggestion", "combined-output");
        }
    });

    $("#get-diet-suggestion").click(function () {
        if (!isTextOutputting) {
            fetchSuggestion("/get_diet_suggestion", "combined-output");
        }
    });

    $("#get-exercise-suggestion").click(function () {
        if (!isTextOutputting) {
            fetchSuggestion("/get_exercise_suggestion", "combined-output");
        }
    });

    document.addEventListener('typeTextFinished', function () {
        isTextOutputting = false;
    });
}

export { handleSuggestionButtons };