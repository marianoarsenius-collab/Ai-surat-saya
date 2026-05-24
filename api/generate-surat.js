const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt tidak boleh kosong' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `Anda adalah asisten pembuatan surat dinas pemerintahan Indonesia yang profesional. Buat surat resmi yang lengkap dengan format surat dinas Indonesia yang benar, termasuk kop surat, nomor surat, tanggal, perihal, isi surat, penutup dan tanda tangan. Gunakan bahasa Indonesia yang formal dan baku.`;

    const result = await model.generateContent(systemPrompt + '\n\nPermintaan: ' + prompt);
    const teks = result.response.text();

    return res.status(200).json({ teks });

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Terjadi kesalahan server' });
  }
};
