import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function handler(event) {

  try {

    const body = JSON.parse(event.body);
    const prompt = body.prompt;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: response
      })
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };

  }

}
