import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import dotenv from 'dotenv';
import { logger } from './logger.service.js';

dotenv.config();

const VAAS_API_KEY = process.env.VAAS_API_KEY;
const VAAS_BASE_URL = process.env.VAAS_BASE_URL;

/**
 * Transcribe an audio file using VaaS (Voice as a Service).
 * @param {string} filePath - absolute path to the audio file (webm/ogg/wav)
 * @param {string} lang     - 'en' or 'hi'
 * @returns {Promise<string>} - transcribed text
 */
export const transcribeAudio = async (filePath, lang = 'en') => {
  if (!VAAS_API_KEY) {
    throw new Error('VaaS API key not configured');
  }

  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  logger.debug(`Transcribing audio via VaaS | file: ${filePath} | lang: ${lang}`);

  try {
    const response = await axios.post(`${VAAS_BASE_URL}/stt`, formData, {
      headers: {
        ...formData.getHeaders(),
        'X-API-KEY': VAAS_API_KEY,
      },
    });

    const transcript = response.data.text || '';
    logger.info(`VaaS Transcription result: "${transcript}"`);

    // In the original project, the frontend expects [LANG:en] or [LANG:hi] prefix
    // We'll try to guess if it's Hindi or English to maintain compatibility
    // Simple heuristic: if it contains Devanagari characters, it's Hindi
    const isHindi = /[\u0900-\u097F]/.test(transcript);
    const langTag = isHindi ? '[LANG:hi]' : '[LANG:en]';

    return `${langTag} ${transcript}`;
  } catch (error) {
    logger.error('VaaS audio transcription failed', error.response?.data || error.message);
    throw error;
  }
};

