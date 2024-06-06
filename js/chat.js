document.addEventListener('DOMContentLoaded', function() {
    var sendButton = document.getElementById('send-button');
    var userInput = document.getElementById('user-input');
    var chatContent = document.getElementById('chat-content');
    var chatContainer = document.getElementById('chat-container');
    var chatIcon = document.getElementById('chat-icon');

    sendButton.addEventListener('click', function() {
        sendMessage();
    });

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    chatIcon.addEventListener('mouseenter', function() {
        chatContainer.style.display = 'flex';
    });

    chatContainer.addEventListener('mouseleave', function() {
        chatContainer.style.display = 'none';
    });

    function sendMessage() {
        var userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage(userMessage, 'user-message');
            userInput.value = '';
            getBotResponse(userMessage);
        }
    }

    function appendMessage(message, className) {
        var messageElement = document.createElement('div');
        messageElement.className = 'message ' + className;
        messageElement.textContent = message;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    async function getBotResponse(userMessage) {
        const requestBody = {
            queryInput: {
                text: {
                    text: userMessage,
                    languageCode: 'fr' // Code de langue du message utilisateur
                }
            }
        };

        try {
            const response = await fetch('/dialogflow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Erreur réseau');
            }

            const data = await response.json();
            const botMessage = data.queryResult.fulfillmentText;
            appendMessage(botMessage, 'bot-message');
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Je rencontre des problèmes pour me connecter au serveur. Veuillez réessayer plus tard.', 'bot-message');
        }
    }
});