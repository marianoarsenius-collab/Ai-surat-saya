const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3.5-flash" 
        });

        const body = JSON.parse(event.body || '{}');
        const prompt = body.prompt;

        if (!prompt) {
            return { statusCode: 400, body: JSON.stringify({ error: "Prompt kosong" }) };
        }

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: true, surat: text })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};
