# 🌐 Yogesh Kumar — Personal Portfolio Website
### Powered by IBM Granite Agentic AI | Agentic AI SDLC

[![IBM Granite](https://img.shields.io/badge/IBM%20Granite-AI%20Powered-0f62fe?style=for-the-badge&logo=ibm)](https://www.ibm.com/products/watsonx-ai)
[![Agentic AI](https://img.shields.io/badge/Agentic%20AI-SDLC-6929c4?style=for-the-badge)](https://github.com/NarendraEluri123/Portfolio1)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📋 Overview

A modern, fully responsive **personal portfolio website** for **Yogesh Kumar** — Full Stack Developer & AI Enthusiast — enhanced with a **real-time Agentic AI assistant** powered by **IBM Granite (ibm/granite-13b-chat-v2)** on IBM watsonx.ai.

> 👨‍🏫 **Designed & Developed under the expert guidance of:**
> **Eluri Narendra** — Technical Master Trainer
> Expertise: **Agentic AI · Machine Learning · Quantum Computing**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **IBM Granite AI Chat** | Floating chat widget powered by IBM Granite model via watsonx.ai |
| 🔄 **Agentic AI Loop** | Perceive → Plan → Act → Reflect (4-phase agentic reasoning) |
| 📱 **Fully Responsive** | Mobile, tablet, and desktop layouts |
| 🌙 **Dark Theme** | Professional dark UI with IBM Design Language |
| 🚀 **8 Portfolio Sections** | Hero, About, Skills, Projects, Education, Certs, Trainer, Contact |
| ⚡ **Zero External Dependencies** | Pure HTML/CSS/JS frontend — no build tools needed |
| 🔐 **Secure API Proxy** | IBM API key stays server-side via Node.js Express proxy |
| 📊 **Health Check** | `/api/status` endpoint for deployment monitoring |

---

## 🗂️ Project Structure

```
Portfolio1/
├── index.html                  # Main portfolio page (all sections)
├── style.css                   # Responsive design system (dark theme)
├── agent.js                    # IBM Granite Agentic AI engine
├── server.js                   # Node.js proxy server (keeps API key secure)
├── launch_portfolio.bat        # Windows one-click launcher
├── AGENTIC_AI_SDLC_PLAN.md     # Full Agentic AI SDLC documentation
├── README.md                   # This file
├── requirements.txt            # Node.js package dependencies
├── .gitignore                  # Git ignore rules
└── .env                        # Environment variables (NOT committed to git)
```

---

## 🚀 Quick Start

### Option A — Open Directly (No Setup Required)
```bash
# Just open index.html in any browser
# The AI assistant uses built-in client-side reasoning
start index.html          # Windows
open index.html           # macOS
xdg-open index.html       # Linux
```
Or simply double-click **`launch_portfolio.bat`** on Windows.

---

### Option B — Node.js Server (Full IBM Granite API)

#### 1. Prerequisites
```bash
node --version    # v18.0.0 or higher required
npm --version     # v8.0.0 or higher required
git --version     # any recent version
```

#### 2. Clone the Repository
```bash
git clone https://github.com/NarendraEluri123/Portfolio1.git
cd Portfolio1
```

#### 3. Install Dependencies
```bash
npm install
```

#### 4. Configure Environment
Create a `.env` file in the project root:
```env
IBM_PROJECT_ID=70838522-da0e-48f1-b5aa-c930dcbd57c0
IBM_API_KEY=your_ibm_cloud_api_key_here
IBM_REGION=https://us-south.ml.cloud.ibm.com
PORT=3000
```
> ⚠️ **Never commit `.env` to Git.** It is listed in `.gitignore`.

#### 5. Start the Server
```bash
npm start
# or
node server.js
```

#### 6. Open in Browser
```
http://localhost:3000
```

---

## 🌍 Deploy to GitHub Pages (Static — No Server)

> Best for showcasing the portfolio publicly. Uses the built-in client-side AI agent.

1. Push code to GitHub (already done)
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Click **Save**
5. Your site is live at:
   ```
   https://NarendraEluri123.github.io/Portfolio1/
   ```

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `IBM_PROJECT_ID` | IBM watsonx.ai Project ID | `70838522-da0e-...` |
| `IBM_API_KEY` | IBM Cloud API Key | `PjwuXrPz...` |
| `IBM_REGION` | watsonx.ai regional endpoint | `https://us-south.ml.cloud.ibm.com` |
| `PORT` | Local server port | `3000` |

---

## 🤖 IBM Granite Agentic AI — How It Works

The [`agent.js`](agent.js) file implements a full **4-phase agentic reasoning loop**:

```
User Query
    │
    ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  PERCEIVE   │───▶│    PLAN     │───▶│     ACT     │───▶│   REFLECT   │
│  Tokenize & │    │  Classify   │    │  Retrieve   │    │  Quality    │
│  Normalize  │    │  Intent     │    │  & Respond  │    │  Check      │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                               │
                                                               ▼
                                                         Final Response
```

**Supported Intents:**
`greeting` · `about` · `skills` · `projects` · `education` · `certifications` · `contact` · `experience` · `trainer` · `granite` · `help` · `thanks` · `fallback`

---

## 📡 API Endpoints (server.js)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves `index.html` |
| `POST` | `/api/granite` | Proxy to IBM watsonx.ai Granite model |
| `GET` | `/api/status` | Health check — returns config status |

**Example status check:**
```bash
curl http://localhost:3000/api/status
```
```json
{
  "status": "ok",
  "model": "ibm/granite-13b-chat-v2",
  "project": "70838522-da0e-48f1-b5aa-c930dcbd57c0",
  "region": "https://us-south.ml.cloud.ibm.com",
  "port": 3000,
  "apiKey": "***configured***",
  "trainer": "Eluri Narendra"
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3 (Grid/Flexbox), Vanilla JavaScript ES6+ |
| AI Engine | IBM Granite (`ibm/granite-13b-chat-v2`) via IBM watsonx.ai |
| Backend | Node.js (built-in `http` / `https` modules) |
| Auth | IBM IAM token-based authentication (auto-refreshed) |
| Deployment | GitHub Pages / Any static host / Node.js server |

---

## 📖 Agentic AI SDLC Phases

This project was built following the complete **Agentic AI Software Development Life Cycle**:

| Phase | Description |
|-------|-------------|
| **Phase 1** — Requirements | Functional & non-functional analysis, AI agent goal definition |
| **Phase 2** — Design | Architecture, UI/UX layout, knowledge base structure |
| **Phase 3** — Development | HTML/CSS/JS implementation + AI engine |
| **Phase 4** — Integration | IBM Granite API wiring, agentic loop implementation |
| **Phase 5** — Testing | 15-point validation checklist (see `AGENTIC_AI_SDLC_PLAN.md`) |
| **Phase 6** — Deployment | `.bat` launcher, GitHub Pages, Node.js server |

Full documentation: [`AGENTIC_AI_SDLC_PLAN.md`](AGENTIC_AI_SDLC_PLAN.md)

---

## 👨‍🏫 About the Trainer

**Eluri Narendra** is a **Technical Master Trainer** and recognized expert in:
- 🤖 **Agentic AI** — designing autonomous agent systems and pipelines
- 📊 **Machine Learning** — supervised, unsupervised, and reinforcement learning
- ⚛️ **Quantum Computing** — IBM Qiskit, quantum ML algorithms

This portfolio serves as a real-world reference implementation for the Agentic AI SDLC training program.

---

## 📄 License

MIT License — © 2025 Yogesh Kumar

---

*Built with ❤️ using IBM Granite Agentic AI · Guided by Eluri Narendra*
