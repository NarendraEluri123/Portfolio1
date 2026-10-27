# Agentic AI SDLC Plan — Yogesh's Personal Portfolio Website

> **Trainer & Mentor:** Eluri Narendra  
> **Expertise:** Agentic AI · Machine Learning · Quantum Computing  
> **Project:** Personal Portfolio Web Application for Yogesh  
> **AI Model Used:** IBM Granite (Agentic AI Assistant)  
> **Date:** 2025

---

## 📋 Project Overview

A modern, fully responsive personal portfolio website for **Yogesh**, enhanced with an **Agentic AI Assistant** powered by the **IBM Granite model**. The AI agent autonomously resolves common visitor queries about Yogesh's skills, projects, education, and contact information — without requiring backend infrastructure, using client-side agentic reasoning.

---

## 🔄 Agentic AI SDLC Phases

### Phase 1 — Requirements Analysis & Planning

**Objective:** Identify stakeholder needs, define AI agent goals, and plan the system architecture.

#### Functional Requirements
| # | Requirement | Priority |
|---|------------|----------|
| FR-01 | Display Yogesh's personal introduction, skills, and achievements | High |
| FR-02 | Showcase project portfolio with descriptions | High |
| FR-03 | Show education, certifications, and work experience | High |
| FR-04 | Contact form / social links | Medium |
| FR-05 | IBM Granite-powered AI chatbot to answer visitor queries | High |
| FR-06 | AI agent to autonomously route queries to correct context | High |
| FR-07 | Responsive design for mobile, tablet, desktop | High |

#### Non-Functional Requirements
- Performance: Page load < 2 seconds
- Accessibility: WCAG 2.1 AA compliant
- Browser Support: Chrome, Firefox, Edge, Safari
- No backend required — fully static with client-side AI agent

#### AI Agent Goals (Agentic AI Definition)
The IBM Granite-based agent must:
1. **Perceive** — understand user's natural language query
2. **Plan** — identify which portfolio section is relevant
3. **Act** — retrieve and compose an accurate, friendly answer
4. **Reflect** — handle ambiguous queries gracefully with follow-up suggestions

---

### Phase 2 — System Design

**Objective:** Define architecture, UI/UX layout, and AI agent knowledge structure.

#### Architecture Diagram
```
┌─────────────────────────────────────────────────┐
│              Portfolio Website (Static)          │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Hero    │  │ Projects │  │   Skills     │  │
│  │ Section  │  │ Section  │  │   Section    │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │       IBM Granite AI Chat Widget         │   │
│  │  ┌────────────────────────────────────┐  │   │
│  │  │  Agentic Reasoning Engine (JS)     │  │   │
│  │  │  - Intent Detection                │  │   │
│  │  │  - Knowledge Base (Portfolio Data) │  │   │
│  │  │  - Response Generation             │  │   │
│  │  └────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

#### UI Sections
1. **Navigation Bar** — fixed top, smooth scroll links
2. **Hero Section** — name, title, animated tagline, CTA buttons
3. **About Section** — bio, profile photo placeholder
4. **Skills Section** — categorized skill cards (Technical / AI / Tools)
5. **Projects Section** — project cards with tech stack tags
6. **Education Section** — timeline layout
7. **Contact Section** — social links + email
8. **AI Chat Widget** — floating button → chat panel (IBM Granite agent)

#### AI Agent Knowledge Base Design
```javascript
// Structured knowledge graph for the agent
KnowledgeBase = {
  personal:   { name, title, bio, location },
  skills:     { technical[], ai[], tools[] },
  projects:   [{ name, description, tech[], link }],
  education:  [{ degree, institute, year }],
  contact:    { email, linkedin, github, twitter },
  intents:    ['skills', 'projects', 'education', 'contact', 'about', 'hire']
}
```

---

### Phase 3 — Development

**Objective:** Implement the portfolio website and AI agent engine.

#### Technology Stack
| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (variables, flexbox, grid, animations) |
| Logic | Vanilla JavaScript (ES6+) |
| AI Engine | Client-side Agentic Reasoning + IBM Granite API-ready |
| Font | Google Fonts — Inter |
| Icons | Unicode / SVG inline |

#### Development Tasks
- [x] Create `index.html` — full portfolio structure
- [x] Create `style.css` — responsive design with dark/light palette
- [x] Create `agent.js` — IBM Granite agentic AI chat engine
- [x] Integrate AI widget into main HTML
- [x] Add smooth animations and transitions
- [x] Ensure full mobile responsiveness

#### Agentic AI Engine Flow (agent.js)
```
User Input
    │
    ▼
┌─────────────────────┐
│   Intent Classifier  │  → classify(query) → intent category
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  Context Retriever   │  → getContext(intent) → relevant data
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  Response Generator  │  → generateResponse(context) → reply
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  Reflection Layer    │  → if lowConfidence → suggest alternatives
└─────────────────────┘
    │
    ▼
  Output to Chat UI
```

---

### Phase 4 — AI Integration (IBM Granite)

**Objective:** Wire the Agentic AI assistant to the IBM Granite model.

#### Integration Strategy
- **Phase 4a (Current):** Client-side agentic reasoning engine with full knowledge base — zero backend needed
- **Phase 4b (Production):** Connect to IBM watsonx.ai Granite endpoint via REST API

#### IBM Granite API Integration (Production Ready)
```javascript
// To upgrade to live IBM Granite model:
const GRANITE_ENDPOINT = 'https://us-south.ml.cloud.ibm.com/ml/v1/text/generation';
const IBM_API_KEY = 'YOUR_IBM_CLOUD_API_KEY';

async function callGranite(prompt) {
  const response = await fetch(GRANITE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${IBM_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model_id: 'ibm/granite-13b-chat-v2',
      input: prompt,
      parameters: { max_new_tokens: 300, temperature: 0.7 }
    })
  });
  return response.json();
}
```

#### Agent Capabilities
| Capability | Description |
|-----------|-------------|
| Skill Query | "What are your skills?" → lists technical & AI skills |
| Project Query | "Show me your projects" → describes all projects |
| Education Query | "Where did you study?" → education timeline |
| Contact Query | "How can I reach you?" → contact links |
| Hiring Query | "Are you available for work?" → hire CTA |
| General Fallback | Unknown queries → graceful redirection |

---

### Phase 5 — Testing & Validation

**Objective:** Validate all features, AI responses, and cross-browser compatibility.

#### Test Cases
| Test ID | Test Case | Expected Result | Status |
|---------|----------|----------------|--------|
| TC-01 | Page loads in Chrome/Edge/Firefox | All sections render correctly | ✅ |
| TC-02 | Mobile responsive test (320px–768px) | Layout adapts, no overflow | ✅ |
| TC-03 | AI chat opens on button click | Chat panel slides in | ✅ |
| TC-04 | Ask "What are your skills?" | Returns skill list | ✅ |
| TC-05 | Ask "Tell me about your projects" | Returns project details | ✅ |
| TC-06 | Ask "How do I contact Yogesh?" | Returns contact info | ✅ |
| TC-07 | Ask unrecognized query | Returns helpful fallback | ✅ |
| TC-08 | Smooth scroll navigation | Scrolls to correct section | ✅ |
| TC-09 | .bat file launches browser | Opens index.html in browser | ✅ |

---

### Phase 6 — Deployment

**Objective:** Package and deploy the portfolio for end users.

#### Deployment Options
| Option | Description |
|--------|------------|
| Local | Open `index.html` directly or use `launch_portfolio.bat` |
| GitHub Pages | Push to repo → enable Pages → live URL |
| Netlify | Drag & drop `index.html` → instant deploy |
| IBM Cloud | Deploy as static site on IBM Cloud Object Storage + CDN |

#### File Structure
```
PortfolioWebsite/
├── index.html              # Main portfolio page
├── style.css               # All styles (responsive)
├── agent.js                # IBM Granite Agentic AI engine
├── launch_portfolio.bat    # Windows launcher
└── AGENTIC_AI_SDLC_PLAN.md # This SDLC document
```

---

## 🤖 IBM Granite Model — Why Granite?

IBM Granite is an enterprise-grade foundation model series from IBM Research, part of the **watsonx.ai** platform. Key advantages:

- **Transparency:** Fully documented training data (no undisclosed sources)
- **Safety:** Built-in guardrails for enterprise use
- **Efficiency:** Granite 3B/8B models run efficiently even on edge
- **Instruction Following:** Strong performance on task-specific prompts
- **RAG-Ready:** Designed for Retrieval-Augmented Generation (RAG) pipelines

For this portfolio, the agent uses Granite-style reasoning patterns: **Perceive → Plan → Act → Reflect** — the four pillars of agentic AI.

---

## 👨‍🏫 About the Trainer

**Eluri Narendra** is a Technical Master Trainer and recognized expert in:
- **Agentic AI** — designing autonomous AI agent systems and pipelines
- **Machine Learning** — supervised, unsupervised, and reinforcement learning
- **Quantum Computing** — quantum algorithms, IBM Qiskit, quantum ML

Under Eluri Narendra's guidance, this project demonstrates the full **Agentic AI SDLC** methodology applied to a real-world web application — serving as both a functional portfolio and an educational reference implementation.

---

*Document generated as part of Agentic AI Training Program — Eluri Narendra*
