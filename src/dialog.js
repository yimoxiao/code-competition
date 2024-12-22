const chatModal = document.getElementById('chatModal');
const closeChatBtn = document.getElementById('closeChatBtn');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messages');

// 用于保存对话记录
let conversationHistory = [];
let replyHistory = [];
let inputHistory = [];

function updateChat() {
    messagesContainer.innerHTML = '';
    conversationHistory.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}`;

        // // 创建图标元素
        // const iconElement = document.createElement('img');
        // iconElement.className = 'icon';
        // iconElement.src = message.sender === 'user' ? 'user-icon.png' : 'gpt-icon.png';

        const textElement = document.createElement('span');
        textElement.textContent = message.text;

        // messageElement.appendChild(iconElement);
        messageElement.appendChild(textElement);
        messagesContainer.appendChild(messageElement);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

sendButton.addEventListener('click', () => {
    sendMessage();
});

closeChatBtn.addEventListener('click', () => {
    closeChat();
})

// 禁用输入框和发送按钮
function disableInput() {
    userInput.disabled = true;
    sendButton.disabled = true;
}

// 启用输入框和发送按钮
function enableInput() {
    userInput.disabled = false;
    sendButton.disabled = false;
}

function typeMessage(message, sender) {
    let index = 0;
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;

    messagesContainer.appendChild(messageElement);

    messageElement.innerHTML = "";

    function type() {
        if (index < message.length) {
            // 解析为md格式
            const parsedText = marked(message.slice(0, index + 1));
            messageElement.innerHTML = parsedText;
            index++;
            setTimeout(type, 30);
        }
        if(index === message.length) {
            enableInput();
        }
    }

    type();
}

// 发送消息
function sendMessage() {
    console.log('sendMessage');
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    pushInputHistory(userMessage);
    disableInput();

    // 显示用户消息
    conversationHistory.push({sender: 'user', text: userMessage});
    updateChat();

    userInput.value = '';
    console.log(replyHistory);
    console.log(inputHistory);
    $.ajax({
        url: 'http://10.189.140.61:18080/get_more_suggestion',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(
            {model_response: replyHistory, user_input: inputHistory}
        ),
        success: function (response) {
            if (response.error) {
                alert(response.error);
                enableInput();
            } else {
                console.log(response);
                pushReplyHistory(response.data);
                conversationHistory.push({sender: 'bot', text: response.data});
                typeMessage(response.data, 'bot');
            }
        },
        error: function () {
            alert("请求失败，请稍后重试！");
            enableInput();
        }
    });
}

// 关闭聊天弹窗
function closeChat() {
    chatModal.style.display = 'none';
}

// 点击遮罩层关闭弹窗
chatModal.addEventListener('click', (event) => {
    if (event.target === chatModal) {
        closeChat();
    }
});

function clearHistory() {
    conversationHistory.splice(0, conversationHistory.length);
    replyHistory.splice(0, replyHistory.length);
    inputHistory.splice(0, inputHistory.length);
    messagesContainer.innerHTML = '';
}

function pushReplyHistory(history) {
    replyHistory.push(history);
}

function pushInputHistory(history) {
    inputHistory.push(history);
}

export {pushReplyHistory, clearHistory};
