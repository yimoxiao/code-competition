const chatModal = document.getElementById('chatModal');
const openChatBtn = document.getElementById('openChatBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messages');

// 用于保存对话记录
let conversationHistory = [];

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

// 打开弹窗
openChatBtn.addEventListener('click', () => {
    const selectedDate = $("#date").val();
    if (!selectedDate) {
        alert("请选择一个日期！");
        return;
    }
    chatModal.style.display = 'flex';
});

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
    return new Promise((resolve) => {
        let index = 0;
        const textElement = document.createElement('span');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;

        // const iconElement = document.createElement('img');
        // iconElement.className = 'icon';
        // iconElement.src = sender === 'user' ? 'user-icon.png' : 'gpt-icon.png';

        // messageElement.appendChild(iconElement);
        messageElement.appendChild(textElement);
        messagesContainer.appendChild(messageElement);

        const interval = setInterval(() => {
            textElement.textContent += message[index];
            index++;
            if (index === message.length) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    });
}

// 发送消息
function sendMessage() {
    console.log('sendMessage');
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    disableInput();

    // 显示用户消息
    conversationHistory.push({ sender: 'user', text: userMessage });
    updateChat();

    userInput.value = '';

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, conversation: conversationHistory })
    })
        .then(response => response.json())
        .then(data => {
            conversationHistory.push({ sender: 'bot', text: data.reply });
            typeMessage(data.reply, 'bot').then(() => {
                enableInput();
            });
        })
        .catch(error => {
            console.error('Error:', error);
            enableInput();
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