// Drizz dating assistant stub logic

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "<api key>",
  baseURL: "https://api.x.ai/v1",
});

const completion = await client.chat.completions.create({
  model: "grok-3",
  messages: [
    {
      role: "system",
      content: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy."
    },
    {
      role: "user",
      content: "What is the meaning of life, the universe, and everything?"
    },
  ],
});
console.log(completion.choices[0].message);
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Navigation toggle between feature sections
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.feature-section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // deactivate all
      navButtons.forEach(b => b.classList.remove('active'));
      sections.forEach(sec => sec.classList.remove('active'));
      // activate selected
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });

  /* ----- Conversation Starter ----- */
  const starterForm = document.getElementById('starterForm');
  starterForm.addEventListener('submit', async e => {
    e.preventDefault();
    const fileInput = document.getElementById('starterImage');
    if (!fileInput.files.length) return;
    const resultBox = document.getElementById('starterResult');
    const textBox = document.getElementById('starterText');
    textBox.textContent = 'Generating...';
    resultBox.hidden = false;
    try {
      const dataUrl = await fileToDataURL(fileInput.files[0]);
      const messages = [
        {
          role: 'system',
          content: 'You are a flirty yet respectful dating assistant who crafts engaging openers based on user profiles.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Give me a single personalized opening line to start a conversation with this person.'
            },
            {
              type: 'image_url',
              image_url: { url: dataUrl }
            }
          ]
        }
      ];
      const reply = await callOpenAI(messages);
      textBox.textContent = reply;
    } catch (err) {
      textBox.textContent = 'Oops! Something went wrong.';
      console.error(err);
    }
  });

  /* ----- Conversation Assistance ----- */
  const assistantForm = document.getElementById('assistantForm');
  assistantForm.addEventListener('submit', async e => {
    e.preventDefault();
    const fileInput = document.getElementById('assistantImage');
    if (!fileInput.files.length) return;
    const resultBox = document.getElementById('assistantResult');
    const textBox = document.getElementById('assistantText');
    textBox.textContent = 'Thinking...';
    resultBox.hidden = false;
    try {
      const dataUrl = await fileToDataURL(fileInput.files[0]);
      const messages = [
        {
          role: 'system',
          content: 'You are a witty dating coach helping users continue a conversation in a fun, engaging manner.'
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Suggest a playful, friendly reply to keep the conversation flowing.' },
            { type: 'image_url', image_url: { url: dataUrl } }
          ]
        }
      ];
      const reply = await callOpenAI(messages);
      textBox.textContent = reply;
    } catch (err) {
      textBox.textContent = 'Unable to get a suggestion right now.';
      console.error(err);
    }
  });

  /* ----- Love Guru ----- */
  const guruForm = document.getElementById('guruForm');
  guruForm.addEventListener('submit', async e => {
    e.preventDefault();
    const q = document.getElementById('guruQuestion').value.trim();
    if (!q) return;
    const resultBox = document.getElementById('guruResult');
    const textBox = document.getElementById('guruText');
    textBox.textContent = 'Listening...';
    resultBox.hidden = false;
    try {
      const messages = [
        { role: 'system', content: 'You are a compassionate relationship guru offering concise emotional advice.' },
        { role: 'user', content: q }
      ];
      const reply = await callOpenAI(messages);
      textBox.textContent = reply;
    } catch (err) {
      textBox.textContent = 'Sorry, could not fetch advice.';
      console.error(err);
    }
  });
}); 
