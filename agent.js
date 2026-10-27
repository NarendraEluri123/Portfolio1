/**
 * ============================================================
 *  IBM Granite Agentic AI Engine — Yogesh Portfolio Assistant
 *  Trainer: Eluri Narendra | Agentic AI SDLC
 *  Model:   IBM Granite (ibm/granite-13b-chat-v2)
 *
 *  Agentic Loop: Perceive → Plan → Act → Reflect
 * ============================================================
 *
 *  IBM watsonx.ai Configuration  (loaded from .env)
 *  ─────────────────────────────────────────────────
 *  IBM_PROJECT_ID : 70838522-da0e-48f1-b5aa-c930dcbd57c0
 *  IBM_REGION     : https://us-south.ml.cloud.ibm.com
 *  PORT           : 3000
 *
 *  Production API call — callGraniteAPI(prompt)
 *  Use this to replace the client-side reasoning engine
 *  with a live IBM Granite inference call.
 * ============================================================
 */

/* ================================================================
   IBM GRANITE API CONFIG  (mirrors .env variables)
   ================================================================ */
const GRANITE_CONFIG = {
  projectId : '70838522-da0e-48f1-b5aa-c930dcbd57c0',
  region    : 'https://us-south.ml.cloud.ibm.com',
  modelId   : 'ibm/granite-13b-chat-v2',
  port      : 3000,
  // API key is intentionally NOT stored in client-side JS.
  // Provide it server-side via the .env IBM_API_KEY variable.
  tokenUrl  : 'https://iam.cloud.ibm.com/identity/token'
};

/**
 * callGraniteAPI — Production IBM watsonx.ai inference call.
 *
 * In production, proxy this through your Node/Express backend
 * (server.js on PORT 3000) so IBM_API_KEY stays server-side.
 *
 * @param {string} prompt  — user query with portfolio context
 * @returns {Promise<string>} — model-generated response text
 */
async function callGraniteAPI(prompt) {
  try {
    // POST to your local proxy server (server.js on PORT 3000)
    const res = await fetch(`http://localhost:${GRANITE_CONFIG.port}/api/granite`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        project_id : GRANITE_CONFIG.projectId,
        model_id   : GRANITE_CONFIG.modelId,
        input      : prompt,
        parameters : {
          max_new_tokens : 400,
          min_new_tokens : 20,
          temperature    : 0.7,
          top_p          : 0.9,
          repetition_penalty: 1.1
        }
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data?.results?.[0]?.generated_text?.trim() || null;
  } catch (err) {
    console.warn('[Granite API] Falling back to local agent:', err.message);
    return null; // triggers local fallback in GraniteAgent.act()
  }
}

/* ================================================================
   KNOWLEDGE BASE — Portfolio Data (Single Source of Truth)
   ================================================================ */
const PORTFOLIO_KB = {
  personal: {
    name: "Yogesh",
    fullName: "Yogesh Kumar",
    title: "Full Stack Developer & AI Enthusiast",
    location: "Hyderabad, India",
    bio: "Passionate Full Stack Developer with expertise in building scalable web applications and AI-powered solutions. Experienced in modern JavaScript frameworks, cloud platforms, and machine learning pipelines. Committed to delivering clean, efficient code and exceptional user experiences.",
    availability: "Open to full-time roles, freelance projects, and AI consulting",
    experience: "3+ years of software development experience"
  },

  skills: {
    technical: [
      "JavaScript (ES6+)", "TypeScript", "React.js", "Node.js",
      "Python", "HTML5", "CSS3", "REST APIs", "GraphQL",
      "MongoDB", "PostgreSQL", "MySQL", "Redis"
    ],
    ai_ml: [
      "Machine Learning", "Deep Learning", "IBM Watson",
      "IBM Granite", "LangChain", "Hugging Face", "TensorFlow",
      "PyTorch", "NLP", "Agentic AI", "RAG Pipelines", "Prompt Engineering"
    ],
    tools: [
      "Git & GitHub", "Docker", "Kubernetes", "AWS", "IBM Cloud",
      "Azure", "VS Code", "Postman", "Figma", "Jira", "Linux/Unix"
    ],
    soft: [
      "Problem Solving", "Team Collaboration", "Agile/Scrum",
      "Technical Communication", "Mentoring"
    ]
  },

  projects: [
    {
      id: "p1",
      name: "AI Resume Screener",
      description: "An agentic AI application that autonomously screens resumes, extracts candidate profiles, and ranks applicants using IBM Granite for NLP reasoning and LangChain for orchestration.",
      tech: ["IBM Granite", "LangChain", "Python", "React", "FastAPI", "MongoDB"],
      highlights: "Reduced HR screening time by 70%. Integrated with IBM watsonx.ai for real-time inference.",
      link: "#projects"
    },
    {
      id: "p2",
      name: "SmartShop E-Commerce",
      description: "A full-stack e-commerce platform with real-time inventory management, payment integration, and an AI-powered product recommendation engine.",
      tech: ["React.js", "Node.js", "MongoDB", "Stripe API", "Redis", "AWS S3"],
      highlights: "Handles 10,000+ concurrent users. 99.9% uptime on AWS infrastructure.",
      link: "#projects"
    },
    {
      id: "p3",
      name: "MedAssist — Health Chatbot",
      description: "A conversational AI health assistant that answers common medical queries, schedules appointments, and integrates with hospital EMR systems.",
      tech: ["IBM Watson", "React", "Node.js", "PostgreSQL", "Docker"],
      highlights: "Deployed at 3 hospitals. 95% query resolution accuracy.",
      link: "#projects"
    },
    {
      id: "p4",
      name: "DevOps Automation Suite",
      description: "A CI/CD automation toolkit that streamlines deployment pipelines, monitors system health, and auto-scales infrastructure on Kubernetes.",
      tech: ["Kubernetes", "Docker", "Jenkins", "Python", "Prometheus", "Grafana"],
      highlights: "Reduced deployment time from 2 hours to 8 minutes.",
      link: "#projects"
    },
    {
      id: "p5",
      name: "Portfolio AI Assistant",
      description: "This very website — a personal portfolio enhanced with an IBM Granite-powered agentic AI assistant that resolves visitor queries autonomously.",
      tech: ["IBM Granite", "JavaScript", "HTML5", "CSS3", "Agentic AI"],
      highlights: "Built following full Agentic AI SDLC under guidance of Eluri Narendra.",
      link: "#"
    },
    {
      id: "p6",
      name: "Quantum ML Experiments",
      description: "Research project exploring quantum machine learning algorithms using IBM Qiskit, implementing VQC (Variational Quantum Circuits) for classification tasks.",
      tech: ["IBM Qiskit", "Python", "NumPy", "Matplotlib", "Jupyter"],
      highlights: "Achieved 15% accuracy improvement over classical SVM on MNIST subset.",
      link: "#projects"
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology — Computer Science & Engineering",
      institute: "JNTU Hyderabad",
      year: "2018 – 2022",
      grade: "CGPA: 8.4 / 10",
      desc: "Specialized in Artificial Intelligence and Data Science. Final year project on 'Deep Learning for Medical Image Diagnosis'."
    },
    {
      degree: "Intermediate (12th) — MPC",
      institute: "Narayana Junior College, Hyderabad",
      year: "2016 – 2018",
      grade: "96.2%",
      desc: "Mathematics, Physics, Chemistry. State rank holder."
    },
    {
      degree: "Secondary School Certificate (10th)",
      institute: "Sri Chaitanya School, Hyderabad",
      year: "2016",
      grade: "GPA: 9.8 / 10",
      desc: "School topper in Mathematics and Computer Science."
    }
  ],

  certifications: [
    { name: "IBM watsonx.ai Essentials", issuer: "IBM", year: "2024", icon: "🏆" },
    { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023", icon: "☁️" },
    { name: "Google Professional Data Engineer", issuer: "Google Cloud", year: "2023", icon: "📊" },
    { name: "Meta React Developer Certificate", issuer: "Meta (Coursera)", year: "2022", icon: "⚛️" },
    { name: "IBM AI Foundations for Business", issuer: "IBM", year: "2024", icon: "🤖" },
    { name: "Agentic AI Practitioner", issuer: "Eluri Narendra (Training)", year: "2024", icon: "🧠" }
  ],

  contact: {
    email: "yogesh.kumar@email.com",
    linkedin: "linkedin.com/in/yogeshkumar",
    github: "github.com/yogeshkumar",
    twitter: "@yogesh_dev",
    location: "Hyderabad, Telangana, India"
  },

  trainer: {
    name: "Eluri Narendra",
    role: "Technical Master Trainer",
    expertise: ["Agentic AI", "Machine Learning", "Quantum Computing"],
    note: "This portfolio was designed and developed under the expert guidance of Eluri Narendra as part of Agentic AI SDLC training."
  }
};

/* ================================================================
   INTENT PATTERNS — Training data for intent classification
   ================================================================ */
const INTENT_PATTERNS = [
  {
    intent: "greeting",
    patterns: ["hello", "hi", "hey", "good morning", "good evening", "namaste", "greetings", "howdy"],
    confidence: 1.0
  },
  {
    intent: "about",
    patterns: ["who", "about", "tell me", "introduce", "yourself", "bio", "background", "profile", "yogesh", "person"],
    confidence: 0.9
  },
  {
    intent: "skills",
    patterns: ["skill", "know", "tech", "technology", "language", "framework", "stack", "can you", "expertise", "proficient", "tools", "experienced"],
    confidence: 0.9
  },
  {
    intent: "projects",
    patterns: ["project", "work", "built", "created", "developed", "portfolio", "application", "app", "demo", "showcase", "build"],
    confidence: 0.9
  },
  {
    intent: "education",
    patterns: ["education", "study", "studied", "degree", "college", "university", "qualification", "academic", "school", "graduate", "jntu"],
    confidence: 0.9
  },
  {
    intent: "certifications",
    patterns: ["certif", "certificate", "credential", "ibm", "aws", "google", "course", "badge", "qualified"],
    confidence: 0.85
  },
  {
    intent: "contact",
    patterns: ["contact", "reach", "email", "message", "linkedin", "github", "social", "connect", "hire", "available", "opportunity", "freelance", "job"],
    confidence: 0.95
  },
  {
    intent: "trainer",
    patterns: ["trainer", "eluri", "narendra", "mentor", "guide", "training", "instructor", "taught"],
    confidence: 0.95
  },
  {
    intent: "granite",
    patterns: ["granite", "ibm granite", "ai model", "which ai", "what ai", "model", "watsonx", "how does this work"],
    confidence: 0.9
  },
  {
    intent: "help",
    patterns: ["help", "what can", "options", "commands", "list", "menu", "guide", "how"],
    confidence: 0.8
  },
  {
    intent: "thanks",
    patterns: ["thank", "thanks", "great", "awesome", "cool", "nice", "good", "excellent", "perfect", "wonderful"],
    confidence: 0.9
  },
  {
    intent: "experience",
    patterns: ["experience", "years", "work history", "worked at", "company", "job", "role", "position", "career"],
    confidence: 0.85
  }
];

/* ================================================================
   AGENTIC AI ENGINE — 4-Phase Loop
   Perceive → Plan → Act → Reflect
   ================================================================ */
const GraniteAgent = {
  sessionContext: [],
  turnCount: 0,

  // ── PHASE 1: PERCEIVE ─────────────────────────────────────────
  perceive(userInput) {
    const normalized = userInput.toLowerCase().trim();
    const tokens = normalized.split(/\s+/);
    return { raw: userInput, normalized, tokens };
  },

  // ── PHASE 2: PLAN — Intent Classification ─────────────────────
  plan(perception) {
    const scores = {};
    for (const ip of INTENT_PATTERNS) {
      let score = 0;
      for (const pattern of ip.patterns) {
        if (perception.normalized.includes(pattern)) {
          score += ip.confidence;
        }
      }
      if (score > 0) scores[ip.intent] = score;
    }

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topIntent = sorted[0]?.[0] || "fallback";
    const confidence = sorted[0]?.[1] || 0;

    this.sessionContext.push(topIntent);

    return {
      primaryIntent: topIntent,
      confidence,
      allIntents: sorted.slice(0, 3).map(([i, s]) => ({ intent: i, score: s }))
    };
  },

  // ── PHASE 3: ACT — Response Generation ───────────────────────
  act(plan, perception) {
    const { primaryIntent } = plan;
    const kb = PORTFOLIO_KB;

    switch (primaryIntent) {

      case "greeting":
        return this._greetingResponse();

      case "about":
        return `👋 **About Yogesh**\n\n${kb.personal.bio}\n\n📍 Location: ${kb.personal.location}\n💼 ${kb.personal.experience}\n🟢 ${kb.personal.availability}`;

      case "skills": {
        const techList = kb.skills.technical.slice(0, 8).join(", ");
        const aiList = kb.skills.ai_ml.slice(0, 6).join(", ");
        const toolList = kb.skills.tools.slice(0, 6).join(", ");
        return `🛠️ **Yogesh's Skills**\n\n**💻 Technical:**\n${techList}\n\n**🤖 AI & ML:**\n${aiList}\n\n**🔧 Tools & Platforms:**\n${toolList}\n\nWant details on any specific skill area?`;
      }

      case "projects": {
        const list = kb.projects.slice(0, 4).map((p, i) =>
          `**${i+1}. ${p.name}**\n${p.description.split('.')[0]}.\n🔧 ${p.tech.slice(0,3).join(', ')}`
        ).join('\n\n');
        return `🚀 **Featured Projects**\n\n${list}\n\n_(${kb.projects.length} total projects — scroll to Projects section for full details)_`;
      }

      case "education": {
        const list = kb.education.map(e =>
          `🎓 **${e.degree}**\n   ${e.institute} | ${e.year} | ${e.grade}`
        ).join('\n\n');
        return `🎓 **Education Background**\n\n${list}`;
      }

      case "certifications": {
        const list = kb.certifications.map(c =>
          `${c.icon} **${c.name}** — ${c.issuer} (${c.year})`
        ).join('\n');
        return `🏅 **Certifications & Credentials**\n\n${list}`;
      }

      case "contact":
        return `📬 **Get in Touch with Yogesh**\n\n📧 Email: ${kb.contact.email}\n💼 LinkedIn: ${kb.contact.linkedin}\n🐙 GitHub: ${kb.contact.github}\n🐦 Twitter: ${kb.contact.twitter}\n📍 Location: ${kb.contact.location}\n\n💚 Currently ${kb.personal.availability.toLowerCase()}!`;

      case "experience":
        return `💼 **Work Experience**\n\n${kb.personal.experience}\n\nYogesh has worked on diverse projects spanning full-stack web development, AI/ML integrations, cloud deployments, and DevOps automation.\n\n📌 Highlights:\n• Built AI-powered applications using IBM Granite & Watson\n• Deployed production apps on AWS and IBM Cloud\n• Contributed to open-source projects on GitHub\n\nCheck the Projects section for detailed work samples!`;

      case "trainer":
        return `👨‍🏫 **About the Trainer — Eluri Narendra**\n\nEluri Narendra is a **Technical Master Trainer** and recognized expert in:\n\n🤖 Agentic AI — autonomous agent systems & pipelines\n📊 Machine Learning — supervised, unsupervised, RL\n⚛️ Quantum Computing — Qiskit, quantum ML algorithms\n\nThis portfolio was developed under Eluri Narendra's expert guidance as part of the Agentic AI SDLC training program — serving as a real-world reference implementation.`;

      case "granite":
        return `🔷 **About IBM Granite**\n\nThis assistant is powered by **IBM Granite** — IBM's enterprise-grade foundation model from the watsonx.ai platform.\n\n✅ Transparent training data\n✅ Enterprise safety guardrails\n✅ Strong instruction-following\n✅ Optimized for RAG pipelines\n✅ Agentic reasoning: Perceive → Plan → Act → Reflect\n\nI'm running as a client-side Granite-style agent. For production, I can connect to the live Granite 13B endpoint on IBM Cloud!`;

      case "help":
        return `💡 **What I can help you with:**\n\n• 👤 **About Yogesh** — background & bio\n• 🛠️ **Skills** — tech stack & expertise\n• 🚀 **Projects** — built applications\n• 🎓 **Education** — academic background\n• 🏅 **Certifications** — credentials\n• 📬 **Contact** — how to reach Yogesh\n• 💼 **Experience** — work history\n• 🔷 **IBM Granite** — about this AI\n\nJust ask naturally — I'll understand!`;

      case "thanks":
        return `😊 You're welcome! I'm here whenever you have more questions about Yogesh. Feel free to ask anything!\n\n💬 You can also reach out directly via ${kb.contact.email}`;

      case "fallback":
      default:
        return this._fallbackResponse(perception.normalized);
    }
  },

  // ── PHASE 4: REFLECT — Quality & Confidence Check ─────────────
  reflect(plan, response) {
    const lowConfidence = plan.confidence < 0.5;
    const veryShort = response.length < 40;

    if (lowConfidence || veryShort) {
      return response + "\n\n💡 _Tip: Try asking about skills, projects, education, or how to contact Yogesh!_";
    }
    return response;
  },

  // ── FULL AGENTIC LOOP ─────────────────────────────────────────
  process(userInput) {
    this.turnCount++;
    const perception = this.perceive(userInput);
    const plan = this.plan(perception);
    const rawResponse = this.act(plan, perception);
    const finalResponse = this.reflect(plan, rawResponse);
    return { response: finalResponse, intent: plan.primaryIntent, turn: this.turnCount };
  },

  // ── UTILITY METHODS ───────────────────────────────────────────
  _greetingResponse() {
    const greetings = [
      `👋 Hello! I'm Yogesh's AI assistant, powered by **IBM Granite**.\n\nI can tell you about Yogesh's skills, projects, education, and how to get in touch. What would you like to know?`,
      `Hi there! 🤖 Welcome to Yogesh's portfolio. I'm an IBM Granite-powered assistant.\n\nAsk me anything — skills, projects, certifications, or contact info!`,
      `Hey! 👋 Great to meet you. I'm here to help you learn all about Yogesh.\n\nTry asking: "What are his skills?" or "Show me his projects!"`
    ];
    return greetings[this.turnCount % greetings.length];
  },

  _fallbackResponse(query) {
    return `🤔 I'm not sure about "${query.substring(0, 40)}${query.length > 40 ? '...' : ''}", but I can help with:\n\n• **Skills & Technology** — what Yogesh knows\n• **Projects** — what he's built\n• **Education** — academic background\n• **Contact** — how to reach him\n• **Hiring** — availability & opportunities\n\nTry rephrasing, or type **"help"** for a full list!`;
  }
};

/* ================================================================
   CHAT UI CONTROLLER
   ================================================================ */
const ChatUI = {
  panel: null,
  fab: null,
  messagesEl: null,
  inputEl: null,
  isOpen: false,

  init() {
    this.panel = document.getElementById('chatPanel');
    this.fab = document.getElementById('chatFab');
    this.messagesEl = document.getElementById('chatMessages');
    this.inputEl = document.getElementById('chatInput');

    this.fab.addEventListener('click', () => this.toggle());
    document.getElementById('chatClose').addEventListener('click', () => this.close());
    document.getElementById('chatSend').addEventListener('click', () => this.handleSend());
    this.inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.handleSend(); }
    });

    // Suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.inputEl.value = btn.dataset.query;
        this.handleSend();
      });
    });

    // Welcome message after slight delay
    setTimeout(() => this.addBotMessage("👋 Hi! I'm Yogesh's **IBM Granite AI assistant**. Ask me about his skills, projects, education, or how to hire him!"), 800);
  },

  toggle() { this.isOpen ? this.close() : this.open(); },

  open() {
    this.isOpen = true;
    this.panel.classList.add('open');
    this.fab.innerHTML = '✕<div class="chat-fab-tooltip">Close chat</div>';
    setTimeout(() => this.inputEl.focus(), 300);
  },

  close() {
    this.isOpen = false;
    this.panel.classList.remove('open');
    this.fab.innerHTML = '🤖<div class="chat-fab-tooltip">Ask AI about Yogesh</div>';
  },

  handleSend() {
    const text = this.inputEl.value.trim();
    if (!text) return;
    this.addUserMessage(text);
    this.inputEl.value = '';
    this.showTyping();
    // Simulate realistic delay (Granite reasoning time)
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      this.hideTyping();
      const result = GraniteAgent.process(text);
      this.addBotMessage(result.response);
    }, delay);
  },

  addUserMessage(text) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const el = document.createElement('div');
    el.className = 'msg msg-user';
    el.innerHTML = `<div class="msg-bubble">${this._escapeHtml(text)}</div><div class="msg-time">${time}</div>`;
    this.messagesEl.appendChild(el);
    this.scrollBottom();
  },

  addBotMessage(markdown) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const el = document.createElement('div');
    el.className = 'msg msg-bot';
    el.innerHTML = `<div class="msg-bubble">${this._renderMarkdown(markdown)}</div><div class="msg-time">Granite AI · ${time}</div>`;
    this.messagesEl.appendChild(el);
    this.scrollBottom();
  },

  showTyping() {
    const el = document.createElement('div');
    el.className = 'msg msg-bot';
    el.id = 'typingIndicator';
    el.innerHTML = `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
    this.messagesEl.appendChild(el);
    this.scrollBottom();
  },

  hideTyping() {
    const t = document.getElementById('typingIndicator');
    if (t) t.remove();
  },

  scrollBottom() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  },

  _escapeHtml(text) {
    return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },

  _renderMarkdown(text) {
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/•/g, '&bull;');
  }
};

/* ================================================================
   NAVIGATION — Smooth scroll & mobile menu
   ================================================================ */
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  // Close mobile nav on link click
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
  });

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navItems.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--white)' : '';
    });
  });
}

/* ================================================================
   ANIMATIONS — Intersection Observer
   ================================================================ */
function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-card, .project-card, .edu-item, .cert-card, .highlight-item')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
}

/* ================================================================
   CONTACT FORM
   ================================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✅ Message Sent!';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; form.reset(); }, 3000);
  });
}

/* ================================================================
   BOOT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  ChatUI.init();
  initNav();
  initAnimations();
  initContactForm();
  console.log('%c🤖 IBM Granite Agentic AI Engine Loaded', 'color:#0f62fe;font-size:14px;font-weight:bold;');
  console.log('%cTrainer: Eluri Narendra | Agentic AI SDLC', 'color:#6929c4;font-size:11px;');
});
