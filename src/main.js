import { handleDateChange } from './dataFetch.js';
import { handleSuggestionButtons } from './dataFetch.js';
import { handleUpLoadImgButtons } from './upLoadImg.js';

$(document).ready(function () {
    handleDateChange();
    handleSuggestionButtons();
    handleUpLoadImgButtons();
});