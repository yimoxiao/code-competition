// 用于逐字显示文本的函数
function typeText(elementId, text, speed) {
    const element = document.getElementById(elementId);
    element.innerHTML  = ""; // 清空之前的内容
    let index = 0;

    function type() {
        if (index < text.length) {
            // 解析为md格式
            const parsedText = marked(text.slice(0, index + 1));
            element.innerHTML = parsedText;
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

export { typeText };