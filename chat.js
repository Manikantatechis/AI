import { openai } from "./openai.js";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newMessages = async (history, message) => {
  const results = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...history, message],
  });
  return results.choices[0].message;
};

const formatMessage = (userInput) => ({ role: "user", content: userInput });

const chat = () => {
  const history = [
    {
      role: "system",
      content: "You are an AI assistant. Answer questions or else!",
    },
  ];

  const start = () => {
    rl.question("You: ", async (userInput) => {
      if (userInput.toLowerCase() === "exit") {
        rl.close();
        return;
      }
      console.log(userInput);
      const message = formatMessage(userInput);
      const response = await newMessages(history, message);
      history.push(message, response);
      console.log(`\n\nAI: ${response.content}`);
      start()
    });
    
  };
  start();
};

console.log("Chatbot initialized. Type 'exit' to stop");
chat();
