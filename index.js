import OpenAI from "openai";
import "dotenv/config"

const openai = new OpenAI()


const results = await openai.chat.completions.create({
    model:"gpt-3.5-turbo",
    messages:[{
        role:"system", content:"You are an AI assistant , answer any questions to the best of your ability.", 
    }, {
        role:"user",
        content:"Hii! can you tell me what is the best way to lean How to do maths"

    }]
})

console.log(results.choices[0])