import { handleDateChange } from './dataFetch.js';
import { handleSuggestionButtons } from './suggestionSet.js';
import { handleUpLoadImgButtons } from './upLoadImg.js';

$(document).ready(function () {
    handleDateChange();
    handleSuggestionButtons();
    handleUpLoadImgButtons();
});