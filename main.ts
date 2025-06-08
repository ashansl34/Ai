const apiKey = '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'; // Replace this with your actual API key

interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

async function sendMessage(message: string): Promise<void> {
  const chatbox = document.getElementById('chatbox') as HTMLElement;

  chatbox.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;

  const payload = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message }
    ]
  };

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${apiKey}\`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? 'No response received.';

    chatbox.innerHTML += `<div class="message bot"><strong>Bot:</strong> ${reply}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (err) {
    chatbox.innerHTML += `<div class="message bot"><strong>Bot:</strong> Error: ${(err as Error).message}</div>`;
  }
}

document.getElementById('sendBtn')?.addEventListener('click', () => {
  const input = document.getElementById('userInput') as HTMLInputElement;
  const message = input.value.trim();
  if (message) {
    sendMessage(message);
    input.value = '';
  }
});
