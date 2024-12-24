const chatModal = document.getElementById('chatModal');
function typeText(elementId, text, speed, flag = false) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    let index = 0;
    var t;

    function type() {
        if (index < text.length) {
            // 解析为md格式
            const parsedText = marked(text.slice(0, index + 1));
            element.innerHTML = parsedText;
            if(flag&&(index === text.length - 1)) {
                element.innerHTML = parsedText + "<div class='more-suggestion-div'>" +
                    "点击按钮开启自由对话" + "<button id='more-button'>自由对话</button>"
                + "</div>";
                const moreButton = document.getElementById('more-button');
                moreButton.onclick = () => {
                    chatModal.style.display = 'flex';
                }
            }
            element.scrollTop = element.scrollHeight;
            index++;
            t = setTimeout(type, speed);
        }
    }

    function stopTyping() {
        clearTimeout(t);
    }

    type();
    return stopTyping;
}

export { typeText };
