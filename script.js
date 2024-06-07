document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const micButton = document.getElementById('mic-button');
    const attachButton = document.getElementById('attach-button');

    let messageCount = 0;

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    let micPressTimer;

    micButton.addEventListener('mousedown', startMicPress);
    micButton.addEventListener('touchstart', startMicPress);
    micButton.addEventListener('mouseup', endMicPress);
    micButton.addEventListener('touchend', endMicPress);

    attachButton.addEventListener('click', () => {
        addMessage('right', '', 'doc.png');
        setTimeout(() => {
            addMessage('left', 'Вот ваш документ', 'returndoc.png');
        }, 10000);
    });

    function startMicPress() {
        micPressTimer = Date.now();
    }

    function endMicPress() {
        const pressDuration = Date.now() - micPressTimer;
        let response;

        if (pressDuration < 20000) response = { img: 'png1.png', text: 'Ответ на аудио 1' };
        else if (pressDuration < 40000) response = { img: 'png2.png', text: 'Ответ на аудио 2' };
        else if (pressDuration < 60000) response = { img: 'png3.png', text: 'Ответ на аудио 3' };
        else response = { img: 'png4.png', text: 'Ответ на аудио 4' };

        addMessage('left', response.text, response.img);
    }

    function sendMessage() {
        const text = messageInput.value.trim();
        if (text === '') return;

        addMessage('right', text);
        messageInput.value = '';

        setTimeout(() => {
            let response;
            switch (++messageCount) {
                case 1: response = 'Сообщение А'; break;
                case 2: response = 'Сообщение Б'; break;
                case 3: response = 'Сообщение В'; break;
                case 4: response = 'Сообщение Д'; break;
                case 5: response = 'Сообщение Е'; break;
                case 6: response = 'Сообщение Ж'; break;
                case 7: response = 'Сообщение З'; break;
                default: response = ''; break;
            }

            if (text === 'ошибка1') response = 'Td.ЛРCJыбSLМ/Vд:p]cВ';
            if (text === 'ошибка2') {
                showErrorPopup('шо#qv|~VYpcф^,фмDЯд}');
                return;
            }

            typeMessage(response);
        }, 500);
    }

    function addMessage(side, text, imgSrc = '') {
        const message = document.createElement('div');
        message.className = `message ${side}`;
        
        if (imgSrc) {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'message-img';
            message.appendChild(img);
        }

        if (text) {
            const messageText = document.createElement('p');
            messageText.textContent = text;
            message.appendChild(messageText);
        }

        chatWindow.appendChild(message);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function typeMessage(text) {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                addMessage('left', text.slice(0, ++index));
            } else {
                clearInterval(interval);
            }
        }, 100);
    }

    function showErrorPopup(text) {
        const popup = document.createElement('div');
        popup.className = 'error-popup';
        popup.textContent = text;
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.remove();
        }, 3000);
    }
});
