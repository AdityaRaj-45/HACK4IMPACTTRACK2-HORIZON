import express from 'express';
import { analyzeIntent } from '../controllers/analyze.controller.js';
import { uploadMiddleware, transcribeAudioController } from '../controllers/transcribe.controller.js';
import { textToSpeechController } from '../controllers/tts.controller.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Agri-Voice Backend is running!' });
});

router.post('/analyze-intent', analyzeIntent);

// Audio upload → Gemini transcription
router.post('/transcribe', uploadMiddleware, transcribeAudioController);

// Text → VaaS TTS
router.post('/tts', textToSpeechController);

export default router;
