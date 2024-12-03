import { resetSuggestions } from './suggestionReset.js';
import { updateModules } from './moduleUpdate.js';
import { typeText } from './textDisplay.js';
import {getUsernameFromCookie} from "./cookie.js";
import {getBreakfast, getDinner, getLunch} from "./upLoadImg.js";
import {saveInStorage} from "./storage.js";

function handleDateChange() {
    $("#date").change(function () {
        const selectedDate = $(this).val();
        if (!selectedDate) return;
        resetSuggestions();
        const username = getUsernameFromCookie();
        $.ajax({
            url: "http://10.189.140.61:18080/get_data",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ date: selectedDate,user_name: username }),
            xhrFields: {
                withCredentials: true
            },
            success: function (response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    console.log(response);
                    updateModules(response);
                    saveInStorage(response.data);
                    getBreakfast();
                    getLunch();
                    getDinner();
                }
            },
            error: function () {
                alert("未找到对应日期的数据！");
            }
        });
    });
}

export { handleDateChange };