let chatBox = document.getElementById("chat-box");

function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value.trim();
    if (message === "") return;

    appendMessage("Você", message, "user");
    getBotResponse(message);
    input.value = "";
}

function appendMessage(sender, text, className) {
    let messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let response = "Desculpe, não encontrei informações sobre isso.";
            for (let carga of data.cargas) {
                if (message.includes(carga.id)) {
                    response = `Status da carga ${carga.id}: ${carga.status}. Motorista: ${carga.motorista}. Previsão de entrega: ${carga.entrega}.`;
                    break;
                }
            }
            appendMessage("LASBot", response, "bot");
        });
}