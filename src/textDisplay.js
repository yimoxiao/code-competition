function typeText(elementId, text, speed) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    let index = 0;
    let isRunning = true;

    function type() {
        if (index < text.length && isRunning) {
            // 解析为md格式
            const parsedText = marked(text.slice(0, index + 1));
            element.innerHTML = parsedText;
            index++;
            setTimeout(type, speed);
        }
    }

    function stopTyping() {
        isRunning = false;
        setTimeout(type, speed);
    }

    type();
    return stopTyping;
}

export { typeText };
