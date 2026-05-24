import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt kosong' });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(
      'Anda asisten surat dinas pemerintahan Indonesia. Buat surat resmi lengkap dengan format Indonesia yang benar termasuk kop surat, nomor, tanggal, perihal, isi, dan tanda tangan. Gunakan bahasa formal.\n\nPermintaan: ' + prompt
    );

    return res.status(200).json({ teks: result.response.text() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
