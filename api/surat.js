import{GoogleGenerativeAI}from"@google/generative-ai";
export default async function handler(req,res){
if(req.method==="OPTIONS"){res.status(200).end();return;}
const{prompt}=req.body;
if(!prompt){res.status(400).json({error:"Prompt kosong"});return;}
try{
const g=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const m=g.getGenerativeModel({model:"gemini-1.5-flash"});
const r=await m.generateContent("Buat surat dinas resmi Indonesia lengkap dengan kop surat, nomor, tanggal, perihal, isi, dan tanda tangan. Bahasa formal.\n\nPermintaan: "+prompt);
res.status(200).json({teks:r.response.text()});
}catch(e){res.status(500).json({error:e.message});}
}
