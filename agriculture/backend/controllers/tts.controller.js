import { textToSpeech } from '../services/tts.service.js';
import { logger } from '../services/logger.service.js';

export const textToSpeechController = async (req, res) => {
  const { text, lang } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'No text provided for TTS' });
  }

  logger.info(`TTS request | text length: ${text.length} | lang: ${lang}`);

  try {
    const audioData = await textToSpeech(text, lang || 'en');
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioData.length,
    });
    logger.info(`TTS success: ${audioData.length} bytes delivered`);
    return res.send(audioData);
  } catch (error) {
    logger.error('TTS controller error', error);
    return res.status(500).json({ error: 'Text-to-speech failed', detail: error.message });
  }
};
