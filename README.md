# 🌾 Agri-Voice: Intelligence for the Indian Farmer
### *A Voices-First, AI-Driven Decision Engine for Rural Empowerment*

**Agri-Voice** is a full-stack, voice-native platform engineered to bridge the digital literacy gap for India's 140 million+ small-scale farmers. By leveraging multi-modal Large Language Models (LLMs) and distributed voice processing services, Agri-Voice democratizes access to complex market data and agricultural intelligence through natural, localized speech.

---

## 👥 Team: Horizon
- **Raghav Sinha** (2428038)
- **Aditya Raj** (2428027)
- **Shivam Kumar** (2428042)
- **Shree Shivam** (2429035)

---

## 🚀 Vision: Breaking the Literacy Barrier
Small-scale farmers are often excluded from digital marketplaces due to low digital literacy. **Agri-Voice** solves this by:
1. **Removing Keyboard Dependencies**: 100% voice-driven interface.
2. **Real-time Localized Intelligence**: Native support for Hindi/English with sub-second STT latency.
3. **Actionable Data Synthesis**: Transforming raw web data into farming "Strategy Tips."

---

## ✨ System Architecture & Core Capabilities

### 🎙️ Advanced Speech Ecosystem
- **VaaS ([Voice as a Service](https://schallten.github.io/VaaS/))**: Integrated a high-fidelity STT/TTS pipeline for instantaneous transcription and human-like response synthesis.
- **Bi-Directional Translation**: Seamless switching between Hindi and English with automatic language preservation and code-switching capabilities.

### 🧠 Poly-Model Intelligence
- **Google Gemini 2.5 Flash-Lite**: Utilized for real-time intent classification and semantic data extraction from unstructured web sources.
- **SerpApi & wttr.in Integration**: Real-time indexing of live Mandi (market) rates and hyper-local weather telemetry for location-aware decision making.

### 🎨 Adaptive Frontend (Liquid UI)
- **High-Fidelity Audio Visualization**: Reactive animated waveforms during voice capture.
- **Glassmorphic Decision Dashboard**: A mobile-first, premium interface designed for high-glare outdoor farm environments.
- **State Persistence**: Real-time logging to **Supabase** ensures continuity of advice across sessions.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, MediaRecorder API, Lucide |
| **Backend** | Node.js (v20+), Express.js, Axios, Multi-part Form Data |
| **AI/ML** | Google Gemini (Multi-modal), Faster-Whisper (via VaaS) |
| **Data/Search** | Supabase (PostgreSQL), SerpApi (Search Indexing) |
| **Voice Ops** | [VaaS (Official Provider)](https://schallten.github.io/VaaS/) |

---

## 📂 Project Organization
```text
├── agriculture/
│   ├── backend/          # Distributed API logic
│   │   ├── controllers/  # Request synthesis & orchestrator logic
│   │   ├── services/     # Multi-provider integrations (VaaS, Gemini, Serp)
│   │   └── routes/       # Centralized REST endpoints (STT, TTS, Analyze)
│   ├── frontend/         # High-performance React binary
│   │   ├── src/          # Micro-components & Adaptive CSS
│   │   └── hooks/        # Voice capture & audio lifecycle management
```

---

## ⚙️ Engineering Setup

### 1. API Services (Backend)
```bash
cd agriculture/backend
# Setup Config
cp example.env .env
# Required credentials: VAAS_API_KEY, GEMINI_API_KEY, SERPAPI_KEY
npm install && npm run dev
```

### 2. Client Application (Frontend)
```bash
cd agriculture/frontend
npm install && npm run dev
```

---
*Built with ❤️ by Team Horizon | Hack4Impact Track 2*

