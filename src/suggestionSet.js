import {typeText} from "./textDisplay.js";
import {getUsernameFromCookie} from "./cookie.js";
import {clearHistory, pushReplyHistory} from "./dialog.js";

let stopTyping = null;

function fetchSuggestion(route, outputId) {
    const selectedDate = $("#date").val();
    const exerciseChoice = $("#exerciseChoice").val();
    if (!selectedDate) {
        alert("请选择一个日期！");
        return;
    }
    var data;
    const username = getUsernameFromCookie();
    if(route === "/get_health_suggestion") {
        data = {
            date: selectedDate,
            user_name: username,
            cache : false
        };
    } else if(route === "/get_diet_suggestion") {
        if (exerciseChoice === "默认") {
            alert("请先进行运动选择，再获取饮食建议！");
            return;
        }
        const food1 = $("#breakfast-recognition").val();
        const food2 = $("#lunch-recognition").val();
        const food3 = $("#dinner-recognition").val();
        data = {
            date: selectedDate,
            user_name: username,
            exercise_choice: exerciseChoice,
            food1: food1,
            food2: food2,
            food3 : food3,
            cache : false
        };
        console.log(data);
    } else if (route === "/get_exercise_suggestion") {
        // console.log(exerciseChoice);
        if (exerciseChoice === "默认") {
            alert("请先进行运动选择，再获取饮食建议！");
            return;
        }
        data = {
            date: selectedDate,
            user_name: username,
            exercise_choice: exerciseChoice,
            cache: false
        };
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
                if(stopTyping !== null) {
                    stopTyping();
                }
                console.log(response);
                clearHistory();
                pushReplyHistory(response.data);
                stopTyping = typeText(outputId, response.data, 20, true);
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
        fetchSuggestion("/get_exercise_suggestion", "combined-output");
    });
}

export { handleSuggestionButtons };