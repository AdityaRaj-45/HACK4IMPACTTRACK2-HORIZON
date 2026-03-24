import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
// const API_BASE_URL = 'https://hack4impacttrack2-horizon-production.up.railway.app/api';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const textToSpeech = async (text, lang = 'en') => {
  console.log(`[TTS Req] text: "${text.substring(0, 30)}..." lang: ${lang}`);
  const response = await apiClient.post('/tts', { text, lang }, { responseType: 'blob' });
  console.log(`[TTS Res] Response received (blob type: ${response.data.type})`);
  return response.data;
};

export const analyzeIntent = async (text, lang, type = 'chat', coords = null) => {
  console.log(`[Analyze Req] text: "${text.substring(0, 30)}..." lang: ${lang} type: ${type}`);
  const response = await apiClient.post('/analyze-intent', {
    text,
    lang,
    type,
    coords,
  });
  console.log('[Analyze Res] Result:', response.data);
  return response.data;
};

/**
 * Send a recorded audio Blob to the backend for Gemini STT transcription.
 * @param {Blob} audioBlob
 * @param {string} lang - 'en' or 'hi'
 * @returns {Promise<string>} - transcribed text
 */
export const transcribeAudio = async (audioBlob, lang = 'en') => {
  console.log(`[STT Req] blob type: ${audioBlob.type} size: ${audioBlob.size} bytes lang: ${lang}`);
  const formData = new FormData();
  // Use .webm extension — Chrome MediaRecorder default
  formData.append('audio', audioBlob, `recording.${getExtension(audioBlob.type)}`);
  formData.append('lang', lang);

  const response = await fetch(`${API_BASE_URL}/transcribe`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error('[STT Res Error]', err);
    throw new Error(err.error || `Transcription failed: ${response.status}`);
  }

  const data = await response.json();
  console.log(`[STT Res] Transcript: "${data.transcript}"`);
  return data.transcript;
};

function getExtension(mimeType = '') {
  if (mimeType.includes('webm')) return 'webm';
  if (mimeType.includes('ogg'))  return 'ogg';
  if (mimeType.includes('wav'))  return 'wav';
  if (mimeType.includes('mp4'))  return 'mp4';
  return 'webm';
}
