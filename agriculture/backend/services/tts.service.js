import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
import { logger } from './logger.service.js';

dotenv.config();

const VAAS_API_KEY = process.env.VAAS_API_KEY;
const VAAS_BASE_URL = process.env.VAAS_BASE_URL;

/**
 * Generate an MP3 file from text using VaaS TTS.
 * @param {string} text - text to convert to speech
 * @param {string} lang - 'en' or 'hi'
 * @returns {Promise<Buffer>} - MP3 audio data
 */
export const textToSpeech = async (text, lang = 'en') => {
  if (!VAAS_API_KEY) {
    throw new Error('VaaS API key not configured');
  }

  // Map language to a voice ID if needed. 
  // VaaS default is 'en_us_ava'. For Hindi, we might need another one if supported.
  // Assuming 'en_us_ava' is okay for now or VaaS handles it.
  const voice = lang === 'hi' ? 'hi_in_madhur' : 'en_us_ava'; // Guessing a Hindi voice name or just using default

  const formData = new FormData();
  formData.append('text', text);
  formData.append('voice', voice);

  logger.debug(`Generating TTS via VaaS | lang: ${lang} | voice: ${voice}`);

  try {
    const response = await axios.post(`${VAAS_BASE_URL}/tts`, formData, {
      headers: {
        ...formData.getHeaders(),
        'X-API-KEY': VAAS_API_KEY,
      },
      responseType: 'arraybuffer',
    });

    return Buffer.from(response.data);
  } catch (error) {
    logger.error('VaaS TTS failed', error.response?.data?.toString() || error.message);
    throw error;
  }
};
