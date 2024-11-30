// 用于逐字显示文本的函数
function typeText(elementId, text, speed) {
    const element = document.getElementById(elementId);
    element.textContent = ""; // 清空之前的内容
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, speed); // 递归调用，逐字显示
        }
    }

    type();
}

export { typeText };