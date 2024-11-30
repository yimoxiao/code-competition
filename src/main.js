import { handleDateChange } from './dataFetch.js';
import { handleSuggestionButtons } from './dataFetch.js';

$(document).ready(function () {
    handleDateChange();
    handleSuggestionButtons();
});