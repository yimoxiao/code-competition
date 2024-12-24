const chatModal = document.getElementById('chatModal');
const closeChatBtn = document.getElementById('closeChatBtn');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messages');

var messageElement;
// 用于保存对话记录
let conversationHistory = [];
let replyHistory = [];
let inputHistory = [];

function updateChat() {
    messagesContainer.innerHTML = '';
    conversationHistory.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}`;

        // const iconElement = document.createElement('img');
        // iconElement.className = 'icon';
        // iconElement.src = message.sender === 'user' ? 'user-icon.png' : 'gpt-icon.png';

        messageElement.textContent = message.text;

        // messageElement.appendChild(iconElement);
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

function disableInput() {
    userInput.disabled = true;
    sendButton.disabled = true;
}

function enableInput() {
    userInput.disabled = false;
    sendButton.disabled = false;
}

function typeMessage(message, sender) {
    let index = 0;

    messageElement.innerHTML = "";

    function type() {
        if (index < message.length) {
            // 解析为md格式
            const parsedText = marked(message.slice(0, index + 1));
            messageElement.innerHTML = parsedText;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            index++;
            setTimeout(type, 30);
        }
        if(index === message.length) {
            enableInput();
        }
    }

    type();
}

function sendMessage() {
    console.log('sendMessage');
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    pushInputHistory(userMessage);
    disableInput();

    conversationHistory.push({sender: 'user', text: userMessage});
    updateChat();

    userInput.value = '';
    console.log(replyHistory);
    console.log(inputHistory);
    messageElement = document.createElement('div');
    messageElement.className = `message bot`;
    messagesContainer.appendChild(messageElement);

    const loaderContainer = document.createElement("div");
    loaderContainer.classList.add("dialog-loading");
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement("div");
        circle.classList.add("dialog-loading-circle");
        loaderContainer.appendChild(circle);
    }
    messageElement.appendChild(loaderContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

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

function closeChat() {
    chatModal.style.display = 'none';
}

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
