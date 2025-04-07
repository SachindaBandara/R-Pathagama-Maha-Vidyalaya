import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const translateText = async (text, targetLang) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Translate the following UI text to ${targetLang === 'si' ? 
      'Sinhala (සිංහල)' : 'Tamil (தமிழ்)'} according to these rules:
      1. Use simple, formal language suitable for official notices
      2. Maintain exact same meaning as the original content
      3. Use native script only (no transliterations)
      4. Avoid decorative symbols or extra punctuation
      5. Keep technical terms untranslated when necessary
      
      Original text: "${text}"
      Translation: 
    `;
    
    const result = await model.generateContent(prompt);
    return result.response.text()
      .replace(/["‘’“”]/g, '')
      .replace(/^\s*[\-\*]+\s*/, '')
      .replace(/\.$/, '')
      .trim();
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};