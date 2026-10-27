/**
 * ============================================================
 *  generate_video.js
 *  Generates a self-contained HTML "video" slideshow
 *  that plays all 20 slides at 7.5 sec each = 150 seconds
 *
 *  Trainer : Eluri Narendra | Agentic AI SDLC
 *  Project : Yogesh Kumar Portfolio — IBM Granite AI
 *
 *  Usage   : node generate_video.js
 *  Output  : YogeshPortfolio_Video.html
 *            (open in any browser — plays as 150-sec video)
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

const OUTPUT_FILE    = 'YogeshPortfolio_Video.html';
const SLIDE_DURATION = 7500;   // ms per slide
const TOTAL_SLIDES   = 20;
const TOTAL_DURATION = SLIDE_DURATION * TOTAL_SLIDES; // 150,000 ms = 150 sec

// ── Slide definitions ─────────────────────────────────────────
const SLIDES = [
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: '',
    title: 'Yogesh Kumar',
    subtitle: 'Personal Portfolio Website',
    body: 'Powered by IBM Granite Agentic AI\nibm/granite-13b-chat-v2\n\nTrainer: Eluri Narendra | Technical Master Trainer\nAgentic AI  •  Machine Learning  •  Quantum Computing\n\nGitHub: github.com/NarendraEluri123/Portfolio1'
  },
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: 'AGENDA',
    title: 'Presentation Outline',
    body: '01  Project Overview           11  Portfolio: Hero & About\n02  Agentic AI SDLC          12  Portfolio: Skills\n03  Phase 1 — Requirements  13  Portfolio: Projects\n04  Phase 2 — Design          14  Portfolio: Education & Certs\n05  Phase 3 — Development  15  IBM Granite AI Chat Widget\n06  Phase 4 — AI Integration  16  Agentic AI Engine Code\n07  Phase 5 — Testing          17  Server & .env Config\n08  Phase 6 — Deployment    18  GitHub Deployment\n09  Portfolio: Hero Screen     19  Trainer: Eluri Narendra\n10  Portfolio: Skills Screen    20  Summary & Metrics'
  },
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: 'PROJECT OVERVIEW',
    title: 'What We Built',
    body: 'A modern, fully responsive personal portfolio website for Yogesh Kumar\n— Full Stack Developer & AI Enthusiast —\nenhanced with a real-time Agentic AI assistant powered by\nIBM Granite (ibm/granite-13b-chat-v2) on IBM watsonx.ai.\n\n[8 Sections]  [IBM Granite AI Chat]  [Node.js Server]  [GitHub Deployed]\n\nFiles: index.html • style.css • agent.js • server.js • .env\n       package.json • launch_portfolio.bat • README.md\n       .gitignore • requirements.txt • AGENTIC_AI_SDLC_PLAN.md'
  },
  {
    bg: '#0A0E1A', accent: '#6929C4',
    label: 'AGENTIC AI SDLC',
    title: '6-Phase Agentic AI SDLC',
    body: 'Phase 1  Requirements Analysis & Planning\nPhase 2  System Design & Architecture\nPhase 3  Development (HTML/CSS/JS + Node.js)\nPhase 4  IBM Granite AI Integration\nPhase 5  Testing & Validation (9/9 Passed)\nPhase 6  Deployment (GitHub + BAT launcher)\n\nEmbedded Agentic Loop in every phase:\n┌──────────┐   ┌──────┐   ┌─────┐   ┌─────────┐\n│ PERCEIVE │──▶│ PLAN │──▶│ ACT │──▶│ REFLECT │\n└──────────┘   └──────┘   └─────┘   └─────────┘'
  },
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: 'PHASE 1 — REQUIREMENTS',
    title: 'Requirements Analysis & Planning',
    body: 'FUNCTIONAL REQUIREMENTS\nFR-01  Display introduction, skills, achievements          [HIGH]\nFR-02  Showcase project portfolio with descriptions     [HIGH]\nFR-03  Education, certifications, work experience        [HIGH]\nFR-04  Contact form and social links                          [MEDIUM]\nFR-05  IBM Granite AI chatbot for visitor queries         [HIGH]\nFR-06  AI agent autonomously routes queries              [HIGH]\nFR-07  Responsive: mobile, tablet, desktop                [HIGH]\n\nNON-FUNCTIONAL\nPage load < 2 sec  •  WCAG 2.1 AA  •  No backend required\n\nAI AGENT GOALS:  Perceive → Plan → Act → Reflect'
  },
  {
    bg: '#0A0E1A', accent: '#6929C4',
    label: 'PHASE 2 — DESIGN',
    title: 'System Design & Architecture',
    body: 'PORTFOLIO WEBSITE (Static — HTML/CSS/JS)\n┌─────────────────────────────────────────────────────────┐\n│  [Hero] [About] [Skills] [Projects] [Education] [Certs] │\n│                                                                               │\n│  IBM Granite AI Chat Widget (agent.js)                          │\n│  • Intent Detection  • Knowledge Base  • Response Gen   │\n└─────────────────────────────────────────────────────────┘\n            ↓  POST /api/granite\nNode.js Proxy (server.js:3000) → IBM IAM Token\n            ↓  Bearer Token\nIBM watsonx.ai → ibm/granite-13b-chat-v2\n\nKnowledge Base: { personal, skills, projects, education, contact, trainer }'
  },
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: 'PHASE 3 — DEVELOPMENT',
    title: 'Tech Stack & Deliverables',
    body: 'TECHNOLOGY STACK\nMarkup:    HTML5 semantic  •  Styling: CSS3 grid/flexbox/animations\nLogic:       Vanilla JavaScript ES6+\nAI Engine: IBM Granite client-side + watsonx.ai REST API\nServer:     Node.js built-in http/https  •  Auth: IBM IAM tokens\n\nCOMPLETED FILES\n[DONE] index.html  490 lines  |  style.css  650 lines  |  agent.js  350 lines\n[DONE] server.js  175 lines  |  package.json  |  launch_portfolio.bat\n[DONE] README.md  |  .gitignore  |  requirements.txt\n[DONE] AGENTIC_AI_SDLC_PLAN.md  |  .env (credentials)\n\nTotal: 3,229 lines across 10 committed files  •  0 vulnerabilities'
  },
  {
    bg: '#0A0E1A', accent: '#6929C4',
    label: 'PHASE 4 — IBM GRANITE AI INTEGRATION',
    title: 'Agentic AI Engine (agent.js)',
    body: 'AGENTIC LOOP: GraniteAgent.process(userInput)\n\n1. PERCEIVE   perceive(input) → normalize, tokenize\n2. PLAN          plan(perception) → score 12 intent patterns → primaryIntent\n3. ACT             act(plan) → retrieve PORTFOLIO_KB → generate response\n4. REFLECT    reflect(plan, response) → add tips if confidence < 0.5\n\n13 INTENT HANDLERS\ngreeting • about • skills • projects • education • certifications\ncontact • experience • trainer • granite • help • thanks • fallback\n\nIBM CONFIG\nProject: 70838522-da0e-48f1-b5aa-c930dcbd57c0\nRegion: https://us-south.ml.cloud.ibm.com\nModel: ibm/granite-13b-chat-v2  •  Port: 3000'
  },
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: 'PHASE 5 — TESTING',
    title: 'Test Results — All 9 Tests Passed',
    body: 'TC-01  Page loads in Chrome/Edge/Firefox                 PASS\nTC-02  Mobile responsive test 320px–768px                PASS\nTC-03  AI chat opens on floating button click              PASS\nTC-04  Query "What are your skills?" → skill list          PASS\nTC-05  Query "Tell me about your projects"                  PASS\nTC-06  Query "How do I contact Yogesh?"                      PASS\nTC-07  Unrecognized query → graceful fallback            PASS\nTC-08  Smooth scroll navigation                                     PASS\nTC-09  .bat file launches browser                                   PASS\n\nRESULT: 9/9 Tests Passed  •  agent.js syntax: OK  •  server.js: OK\n15/15 HTML structural checks PASSED'
  },
  {
    bg: '#0A0E1A', accent: '#24A148',
    label: 'PHASE 6 — DEPLOYMENT',
    title: 'Deployment Options & Git History',
    body: 'DEPLOYMENT OPTIONS\n[1] Direct  — Double-click launch_portfolio.bat → opens index.html\n[2] Node.js — node server.js → http://localhost:3000 (live Granite API)\n[3] GitHub  — github.com/NarendraEluri123/Portfolio1 (3 commits)\n[4] Pages   — NarendraEluri123.github.io/Portfolio1 (free static)\n[5] IBM Cloud — Object Storage + CDN (enterprise)\n\nGIT LOG\ncommit 31bee75  docs: add 20-slide PowerPoint presentation\ncommit dcd0a4f  fix: ASCII banner compatibility\ncommit 627d163  Initial release — 10 files, 3,229 insertions\n\nBranch: main  •  Remote: origin/main  •  Status: up to date'
  },
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: 'PORTFOLIO SCREENSHOT — HERO SECTION',
    title: 'Live UI: Hero & Navigation',
    body: '┌─────────────────────────────────────────────────────────────┐\n│  Yogesh.dev    About  Skills  Projects  Education  [Hire Me] │\n├─────────────────────────────────────────────────────────────┤\n│                                                                                    │\n│  ● AVAILABLE FOR OPPORTUNITIES                           [Y]  │\n│                                                                                    │\n│  Hi, I\'m Yogesh Kumar                                                  │\n│  Full Stack Developer & AI Enthusiast                             │\n│  Building scalable web apps and AI solutions...             │\n│                                                                                    │\n│  [View Projects]  [Get In Touch]                              [AI] │\n│                                                                                    │\n│  3+ Years  •  20+ Projects  •  6 Certs  •  100% Commitment  │\n└─────────────────────────────────────────────────────────────┘'
  },
  {
    bg: '#111827', accent: '#0F62FE',
    label: 'PORTFOLIO SCREENSHOT — SKILLS SECTION',
    title: 'Live UI: Skills & Expertise (6 Cards)',
    body: '┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐\n│  Frontend     │ │  Backend      │ │  AI & Machine Learning │\n│  JS/TS React  │ │  Node Python │ │  IBM Granite  Watson   │\n│  HTML CSS     │ │  Express      │ │  LangChain   TensorFlow│\n│  Next.js      │ │  REST APIs   │ │  Agentic AI  RAG       │\n└──────────────┘ └──────────────┘ └──────────────────────┘\n┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐\n│  Databases   │ │  Cloud/DevOps│ │  Tools & Workflow      │\n│  MongoDB      │ │  IBM Cloud   │ │  Git  VS Code          │\n│  PostgreSQL  │ │  AWS Azure   │ │  Docker  Kubernetes    │\n│  Redis        │ │  CI/CD Linux │ │  IBM Qiskit  Jira      │\n└──────────────┘ └──────────────┘ └──────────────────────┘'
  },
  {
    bg: '#111827', accent: '#6929C4',
    label: 'PORTFOLIO SCREENSHOT — PROJECTS SECTION',
    title: 'Live UI: 6 Featured Projects',
    body: 'PROJECT 01 — AI Resume Screener\nIBM Granite + LangChain  •  70% faster HR screening  •  Python React FastAPI\n\nPROJECT 02 — SmartShop E-Commerce\nReact Node MongoDB Stripe AWS  •  10,000+ users  •  99.9% uptime\n\nPROJECT 03 — MedAssist Health Chatbot\nIBM Watson React Node PostgreSQL Docker  •  3 hospitals  •  95% accuracy\n\nPROJECT 04 — DevOps Automation Suite\nKubernetes Docker Jenkins  •  Deployment: 2hrs → 8 min\n\nPROJECT 05 — Portfolio AI Assistant  [This Website]\nIBM Granite Agentic AI  •  Perceive→Plan→Act→Reflect\n\nPROJECT 06 — Quantum ML Experiments\nIBM Qiskit VQC  •  15% accuracy improvement over classical SVM'
  },
  {
    bg: '#0A0E1A', accent: '#00B4D8',
    label: 'PORTFOLIO SCREENSHOT — EDUCATION & CERTS',
    title: 'Live UI: Education Timeline + Certifications',
    body: 'EDUCATION TIMELINE\n● B.Tech — CSE  |  JNTU Hyderabad  |  2018-2022  |  CGPA 8.4/10\n   Specialized in AI & Data Science\n● Intermediate (12th) — MPC  |  Narayana JC  |  2018  |  96.2%\n● SSC (10th)  |  Sri Chaitanya School  |  2016  |  9.8 GPA\n\nCERTIFICATIONS\n[IBM]  IBM watsonx.ai Essentials  2024\n[AWS]  Certified Solutions Architect  2023\n[GCP]  Google Professional Data Engineer  2023\n[Meta]  React Developer Certificate  2022\n[IBM]  AI Foundations for Business  2024\n[EN]  Agentic AI Practitioner — Eluri Narendra  2024'
  },
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: 'PORTFOLIO SCREENSHOT — IBM GRANITE AI CHAT',
    title: 'Live UI: IBM Granite AI Chat Widget',
    body: '┌─────────────────────────────────────────────────┐\n│  [IBM] Granite AI Assistant  •  IBM Granite  [●] │\n├─────────────────────────────────────────────────┤\n│ BOT: Hi! I\'m Yogesh\'s IBM Granite assistant.     │\n│       Ask about skills, projects, or hiring!      │\n│                                                                        │\n│                  USER: What are his skills? ►     │\n│                                                                        │\n│ BOT: Skills  ──────────────────────             │\n│  Technical: JS, TypeScript, React, Node, Python  │\n│  AI & ML: IBM Granite, LangChain, TensorFlow...  │\n│  Tools: IBM Cloud, AWS, Docker, Kubernetes...    │\n├──────────────────────────────────────────────────┤\n│ [Skills][Projects][Education][Contact][Hire]      │\n│ [Ask anything about Yogesh...]           [Send ▶] │\n│ Agentic AI  •  IBM Granite  •  Perceive→Plan→Act │\n└─────────────────────────────────────────────────┘'
  },
  {
    bg: '#0A0E1A', accent: '#0043CE',
    label: 'AGENTIC AI ENGINE — CODE WALKTHROUGH',
    title: 'agent.js: Key Code Sections',
    body: 'GRANITE_CONFIG\nconst GRANITE_CONFIG = {\n  projectId: "70838522-da0e-48f1-b5aa...",\n  region: "https://us-south.ml.cloud.ibm.com",\n  modelId: "ibm/granite-13b-chat-v2", port: 3000\n};\n\nPERCEIVE\nperceive(input) { return { normalized: input.toLowerCase(), tokens } }\n\nPLAN — Intent Classification\nplan(perception) { /* score 12 intent patterns */ return { primaryIntent } }\n\nACT — Response Generation\nact(plan) { switch(primaryIntent) { case "skills": return skills... } }\n\nREFLECT — Quality Check\nreflect(plan, resp) { if (confidence < 0.5) return resp + tip; }'
  },
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: 'SERVER & ENVIRONMENT CONFIGURATION',
    title: 'server.js + .env + Live Health Check',
    body: '.env FILE  (gitignored — never committed to GitHub)\nIBM_PROJECT_ID = 70838522-da0e-48f1-b5aa-c930dcbd57c0\nIBM_API_KEY     = PjwuXrPz...E3mV\nIBM_REGION      = https://us-south.ml.cloud.ibm.com\nPORT            = 3000\n\nLIVE HEALTH CHECK: GET http://localhost:3000/api/status\n{ "status":"ok", "model":"ibm/granite-13b-chat-v2",\n  "project":"70838522...", "region":"us-south.ml.cloud.ibm.com",\n  "port":"3000", "apiKey":"***configured***", "trainer":"Eluri Narendra" }\n\nSECURITY: IBM_API_KEY stays server-side only.\nIAM tokens auto-refreshed before expiry.'
  },
  {
    bg: '#0A0E1A', accent: '#24A148',
    label: 'GITHUB DEPLOYMENT',
    title: 'Repository: NarendraEluri123/Portfolio1',
    body: 'URL: https://github.com/NarendraEluri123/Portfolio1\n\nGIT LOG\ncommit 31bee75  docs: 20-slide PowerPoint + video export\ncommit dcd0a4f  fix: ASCII banner compatibility\ncommit 627d163  Initial release — 10 files, 3,229 insertions\n\nCOMMITTED FILES (11 files — .env excluded by .gitignore)\nindex.html (27KB)   style.css (22KB)   agent.js (25KB)\nserver.js (7.3KB)   package.json       README.md\n.gitignore           requirements.txt   launch_portfolio.bat\nYogeshPortfolio_Presentation.pptx   AGENTIC_AI_SDLC_PLAN.md\n\nGITHUB PAGES: https://NarendraEluri123.github.io/Portfolio1/'
  },
  {
    bg: '#0A0E1A', accent: '#6929C4',
    label: 'TRAINER SPOTLIGHT',
    title: 'Eluri Narendra — Technical Master Trainer',
    body: 'Expert trainer conducting professional training on:\n\nAGENTIC AI\nAutonomous agent systems, LangChain, IBM Granite,\nRAG pipelines, multi-agent orchestration,\nPerceive → Plan → Act → Reflect methodology\n\nMACHINE LEARNING\nSupervised, unsupervised & reinforcement learning,\ndeep learning, NLP, computer vision, MLOps\n\nQUANTUM COMPUTING\nIBM Qiskit, quantum algorithms (Grover, Shor, QAOA),\nVariational Quantum Circuits (VQC), quantum ML\n\nThis portfolio is a live reference implementation of\nthe Agentic AI SDLC taught by Eluri Narendra.'
  },
  {
    bg: '#0A0E1A', accent: '#0F62FE',
    label: 'SUMMARY & PROJECT METRICS',
    title: 'Project Complete — What We Achieved',
    body: 'METRICS\n  11 Files Delivered       3,229 Lines of Code     20 PPT Slides\n  13 AI Intent Handlers   9/9 Tests Passed         150-sec Video\n\nACCOMPLISHMENTS\n[OK]  Full Agentic AI SDLC — all 6 phases documented & implemented\n[OK]  IBM Granite Agentic AI: Perceive → Plan → Act → Reflect\n[OK]  13 intent handlers — all user query types covered\n[OK]  Node.js proxy — IBM API key secure, IAM tokens auto-refreshed\n[OK]  GitHub deployed: github.com/NarendraEluri123/Portfolio1\n[OK]  Server HTTP 200: apiKey configured, model granite-13b-chat-v2\n[OK]  .env: IBM_PROJECT_ID + IBM_API_KEY + IBM_REGION + PORT=3000\n[OK]  launch_portfolio.bat: 3-mode Windows launcher\n\nYogesh Kumar Portfolio  •  IBM Granite Agentic AI\nTrainer: Eluri Narendra'
  }
];

// ── Build HTML ────────────────────────────────────────────────
function buildHTML() {
  const slidesJSON = JSON.stringify(SLIDES);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Yogesh Kumar Portfolio — 150-Second Project Video</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#000;font-family:'Segoe UI',system-ui,sans-serif;overflow:hidden;width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center}
  #slide-wrap{position:relative;width:960px;height:540px;overflow:hidden;border-radius:8px}
  canvas{display:block;width:960px;height:540px}
  #controls{margin-top:14px;display:flex;align-items:center;gap:16px;color:#fff}
  #progress-bar{width:960px;height:6px;background:#222;border-radius:3px;overflow:hidden;margin-top:10px}
  #progress-fill{height:100%;width:0%;background:linear-gradient(90deg,#0F62FE,#6929C4);border-radius:3px;transition:width 0.1s linear}
  button{background:#0F62FE;color:#fff;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-size:14px;font-weight:600}
  button:hover{background:#0043CE}
  #slide-counter{font-size:13px;color:#8892A4}
  #timer-display{font-size:13px;color:#8892A4;font-variant-numeric:tabular-nums}
  #slide-title-bar{width:960px;background:#111827;border-top:1px solid #1e2d45;padding:8px 16px;display:flex;justify-content:space-between;align-items:center;border-radius:0 0 8px 8px;margin-top:-8px}
  #current-title{color:#e8eaf6;font-size:13px;font-weight:600}
  #ibm-badge{font-size:11px;color:#0F62FE;font-weight:700}
</style>
</head>
<body>

<div id="slide-wrap">
  <canvas id="c" width="960" height="540"></canvas>
</div>
<div id="slide-title-bar">
  <span id="current-title">Yogesh Kumar Portfolio — IBM Granite Agentic AI</span>
  <span id="ibm-badge">IBM Granite | Agentic AI SDLC</span>
</div>
<div id="progress-bar"><div id="progress-fill"></div></div>
<div id="controls">
  <button id="btn-play">&#9654; Play</button>
  <button id="btn-pause">&#9646;&#9646; Pause</button>
  <button id="btn-restart">&#8635; Restart</button>
  <span id="slide-counter">Slide 1 / 20</span>
  <span id="timer-display">0:00 / 2:30</span>
</div>

<script>
const SLIDES = ${slidesJSON};
const SLIDE_DUR = ${SLIDE_DURATION};
const TOTAL     = ${TOTAL_SLIDES};
const TOTAL_MS  = ${TOTAL_DURATION};

const canvas  = document.getElementById('c');
const ctx     = canvas.getContext('2d');
const W = 960, H = 540;
let   currentSlide = 0;
let   playing = false;
let   startTime = null;
let   pausedAt  = 0;
let   raf       = null;

function hexToRgb(hex){
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return \`\${r},\${g},\${b}\`;
}

function drawSlide(idx, progress){
  const s = SLIDES[idx];
  // Background
  ctx.fillStyle = s.bg;
  ctx.fillRect(0,0,W,H);
  // Top accent bar
  ctx.fillStyle = s.accent;
  ctx.fillRect(0,0,W,5);
  // Left accent stripe
  const grad = ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0, s.accent + 'CC');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,4,H);
  // Label
  if(s.label){
    ctx.fillStyle = s.accent;
    ctx.font='bold 11px Segoe UI';
    ctx.letterSpacing='2px';
    ctx.fillText(s.label, 28, 36);
    ctx.letterSpacing='0px';
  }
  // Title
  ctx.fillStyle='#FFFFFF';
  ctx.font='bold 30px Segoe UI';
  const titleY = s.label ? 78 : 58;
  ctx.fillText(s.title, 28, titleY);
  // Divider
  ctx.fillStyle = s.accent;
  ctx.fillRect(28, titleY+8, 120, 2);
  // Body text
  ctx.fillStyle='#B0BEC5';
  ctx.font='13px Segoe UI';
  const lines = (s.body||'').split('\\n');
  let y = titleY + 36;
  for(const line of lines){
    if(y > H-24) break;
    // Highlight [OK] / [DONE] / PASS lines
    if(line.match(/^\[OK\]|^\[DONE\]|\bPASS\b/)){
      ctx.fillStyle='#4ade80';
      ctx.fillText(line, 28, y);
      ctx.fillStyle='#B0BEC5';
    } else if(line.match(/^PHASE|^PROJECT|^METRICS|^AGENTIC|^TECH|^FUNC|^NON-FUNC|^COMP|^DEPLOY|^GIT|^CERTIF|^EDUC|^SECUR/)){
      ctx.fillStyle = s.accent;
      ctx.font='bold 12px Segoe UI';
      ctx.fillText(line, 28, y);
      ctx.font='13px Segoe UI';
      ctx.fillStyle='#B0BEC5';
    } else if(line.match(/^IBM_|^PORT|^BOT:|^USER:/)){
      ctx.fillStyle='#8892A4';
      ctx.font='12px Courier New';
      ctx.fillText(line, 28, y);
      ctx.font='13px Segoe UI';
      ctx.fillStyle='#B0BEC5';
    } else {
      ctx.fillText(line, 28, y);
    }
    y += 19;
  }
  // Slide number (bottom right)
  ctx.fillStyle='rgba(136,146,164,0.4)';
  ctx.font='11px Segoe UI';
  ctx.textAlign='right';
  ctx.fillText((idx+1)+' / '+TOTAL, W-16, H-12);
  ctx.textAlign='left';
  // Progress bar on canvas (bottom strip)
  ctx.fillStyle='rgba(255,255,255,0.06)';
  ctx.fillRect(0, H-4, W, 4);
  ctx.fillStyle = s.accent;
  ctx.fillRect(0, H-4, W * progress, 4);
}

function update(ts){
  if(!playing) return;
  const elapsed = (ts - startTime) + pausedAt;
  if(elapsed >= TOTAL_MS){
    playing = false;
    drawSlide(TOTAL-1, 1);
    document.getElementById('progress-fill').style.width='100%';
    document.getElementById('slide-counter').textContent='Slide '+TOTAL+' / '+TOTAL;
    document.getElementById('timer-display').textContent='2:30 / 2:30';
    document.getElementById('current-title').textContent=SLIDES[TOTAL-1].title;
    return;
  }
  const slideIdx = Math.min(Math.floor(elapsed / SLIDE_DUR), TOTAL-1);
  const slideProgress = (elapsed % SLIDE_DUR) / SLIDE_DUR;
  const totalProg = elapsed / TOTAL_MS;
  if(slideIdx !== currentSlide){
    currentSlide = slideIdx;
    document.getElementById('slide-counter').textContent='Slide '+(slideIdx+1)+' / '+TOTAL;
    document.getElementById('current-title').textContent=SLIDES[slideIdx].title;
  }
  drawSlide(slideIdx, slideProgress);
  document.getElementById('progress-fill').style.width=(totalProg*100)+'%';
  const sec = Math.floor(elapsed/1000);
  document.getElementById('timer-display').textContent=
    Math.floor(sec/60)+':'+(sec%60).toString().padStart(2,'0')+' / 2:30';
  raf = requestAnimationFrame(update);
}

function play(){
  if(playing) return;
  playing = true;
  startTime = performance.now();
  raf = requestAnimationFrame(update);
}

function pause(){
  if(!playing) return;
  playing = false;
  pausedAt += (performance.now() - startTime);
  cancelAnimationFrame(raf);
}

function restart(){
  playing = false;
  cancelAnimationFrame(raf);
  pausedAt = 0;
  currentSlide = 0;
  drawSlide(0, 0);
  document.getElementById('progress-fill').style.width='0%';
  document.getElementById('slide-counter').textContent='Slide 1 / '+TOTAL;
  document.getElementById('timer-display').textContent='0:00 / 2:30';
  document.getElementById('current-title').textContent=SLIDES[0].title;
  play();
}

document.getElementById('btn-play').addEventListener('click', play);
document.getElementById('btn-pause').addEventListener('click', pause);
document.getElementById('btn-restart').addEventListener('click', restart);

// Draw first frame immediately
drawSlide(0, 0);
// Auto-play after brief delay
setTimeout(play, 600);
</script>
</body>
</html>`;
}

// ── Write output file ─────────────────────────────────────────
const html = buildHTML();
fs.writeFileSync(OUTPUT_FILE, html, 'utf8');
const sizeKB = Math.round(fs.statSync(OUTPUT_FILE).size / 1024);

console.log('');
console.log('  ================================================');
console.log('   Yogesh Portfolio — HTML Video Generated!');
console.log('  ================================================');
console.log('   Output  : ' + OUTPUT_FILE);
console.log('   Size    : ' + sizeKB + ' KB (self-contained)');
console.log('   Duration: 150 seconds (20 slides x 7.5 sec)');
console.log('   Format  : Animated HTML5 Canvas Video Player');
console.log('   Slides  : ' + TOTAL_SLIDES);
console.log('   Controls: Play / Pause / Restart');
console.log('  ================================================');
console.log('');
console.log('  Open in browser: start ' + OUTPUT_FILE);
console.log('  Trainer: Eluri Narendra | IBM Granite Agentic AI');
console.log('');
