/**
 * ============================================================
 *  add_voiceover.js
 *  Adds AI voice-over narration to YogeshPortfolio_150sec.mp4
 *
 *  Method: edge-tts (Microsoft Neural TTS) → MP3 per slide
 *          → concat all MP3 → ffmpeg merge with video
 *
 *  Trainer : Eluri Narendra | Agentic AI SDLC
 *  Project : Yogesh Kumar Portfolio — IBM Granite AI
 *
 *  Prerequisites (auto-installed by this script):
 *    pip install edge-tts        (Microsoft Neural TTS)
 *    ffmpeg in PATH              (download via this script)
 * ============================================================
 */

const { execSync, exec, spawn } = require('child_process');
const fs   = require('fs');
const path = require('path');
const https = require('https');

// ── Config ────────────────────────────────────────────────────
const INPUT_VIDEO  = 'YogeshPortfolio_150sec.mp4';
const OUTPUT_VIDEO = 'YogeshPortfolio_WithVoice.mp4';
const AUDIO_DIR    = 'voiceover_audio';
const VOICE        = 'en-US-AriaNeural';   // Microsoft Neural voice
const SLIDE_DUR    = 7.5;                  // seconds per slide

// ── Narration Script — 20 slides, ~18-22 words each ──────────
const NARRATION = [
  // Slide 1 — Title
  "Welcome to Yogesh Kumar's personal portfolio website, powered by IBM Granite Agentic AI. Developed under the expert guidance of Eluri Narendra, Technical Master Trainer.",

  // Slide 2 — Agenda
  "This presentation covers twenty topics across six phases of the Agentic AI Software Development Life Cycle, from requirements planning all the way to live deployment.",

  // Slide 3 — Project Overview
  "We built a modern responsive portfolio for Yogesh Kumar, a Full Stack Developer and AI Enthusiast, featuring an IBM Granite powered Agentic AI chat assistant.",

  // Slide 4 — SDLC
  "The project follows a complete six-phase Agentic AI SDLC. Each phase embeds the four-pillar agentic reasoning loop: Perceive, Plan, Act, and Reflect.",

  // Slide 5 — Phase 1
  "Phase one covers requirements analysis. We defined seven functional requirements, all high priority, plus non-functional goals including sub-two-second page load and WCAG accessibility.",

  // Slide 6 — Phase 2
  "Phase two is system design. The architecture features a static HTML frontend, an IBM Granite AI chat widget, and a Node dot J S proxy server connecting to IBM watsonx dot AI.",

  // Slide 7 — Phase 3
  "Phase three is development. We built index dot HTML, style dot CSS, agent dot JS, and server dot JS — totaling three thousand two hundred twenty-nine lines of code with zero vulnerabilities.",

  // Slide 8 — Phase 4
  "Phase four integrates IBM Granite AI. The agent dot JS engine implements the full agentic loop with thirteen intent handlers covering skills, projects, education, contact, and more.",

  // Slide 9 — Phase 5
  "Phase five is testing and validation. All nine test cases passed, including cross-browser checks, mobile responsiveness, AI chat responses, and the Windows batch file launcher.",

  // Slide 10 — Phase 6
  "Phase six is deployment. The portfolio runs locally via the batch file, as a Node server on port three thousand, on GitHub Pages, or on IBM Cloud with object storage.",

  // Slide 11 — Hero Section
  "Here is the live Hero section. The dark-themed page shows Yogesh's name, title, animated avatar, four statistics, call-to-action buttons, and the floating IBM Granite AI chat button.",

  // Slide 12 — Skills
  "The Skills section displays six responsive cards covering Frontend, Backend, AI and Machine Learning, Databases, Cloud and DevOps, and Tools and Workflow technologies.",

  // Slide 13 — Projects
  "Six featured projects are shown: AI Resume Screener, SmartShop E-Commerce, MedAssist Health Chatbot, DevOps Automation Suite, this Portfolio itself, and Quantum ML Experiments.",

  // Slide 14 — Education & Certs
  "Yogesh's education timeline shows his B.Tech from JNTU Hyderabad with eight point four CGPA. His six certifications include IBM watsonx dot AI, AWS, Google Cloud, and Agentic AI Practitioner.",

  // Slide 15 — AI Chat Widget
  "The IBM Granite AI Chat Widget floats in the corner. When clicked, a chat panel opens. Here we see a live conversation where the AI answers a skills query using the agentic reasoning engine.",

  // Slide 16 — Agent Code
  "Inside agent dot JS, the GRANITE_CONFIG mirrors the dot env file. The perceive function normalizes input. The plan function scores twelve intent patterns. The reflect function adds tips for low confidence.",

  // Slide 17 — Server & env
  "The server dot JS reads IBM credentials from dot env securely. The live health check endpoint returns HTTP two hundred OK with the model name, project ID, region, and configured API key status.",

  // Slide 18 — GitHub
  "The project is deployed on GitHub at NarendraEluri123 slash Portfolio1. Three commits are pushed with ten files totalling three thousand two hundred lines. GitHub Pages provides free static hosting.",

  // Slide 19 — Trainer
  "This project was designed and developed under the expert guidance of Eluri Narendra, Technical Master Trainer in Agentic AI, Machine Learning, and Quantum Computing using IBM technologies.",

  // Slide 20 — Summary
  "In summary: eleven files delivered, three thousand lines of code, thirteen AI intents handled, nine of nine tests passed, and a one hundred fifty second presentation video — all built using IBM Granite Agentic AI."
];

// ── Utility: run shell command and return stdout ──────────────
function run(cmd, opts = {}) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: 'pipe', ...opts }).trim();
  } catch (e) {
    return e.stdout?.trim() || '';
  }
}

function runOrThrow(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf8', stdio: 'pipe', ...opts }).trim();
}

// ── Check / install edge-tts ──────────────────────────────────
async function ensureEdgeTTS() {
  console.log('\n[1/4] Checking edge-tts...');
  const check = run('pip show edge-tts 2>&1');
  if (check.includes('Version')) {
    const ver = check.match(/Version:\s*(.+)/)?.[1] || 'installed';
    console.log(`  edge-tts ${ver} — already installed.`);
    return true;
  }
  console.log('  Installing edge-tts via pip...');
  try {
    runOrThrow('pip install edge-tts --quiet 2>&1');
    console.log('  edge-tts installed OK.');
    return true;
  } catch (e) {
    console.log('  pip install failed. Trying pip3...');
    try {
      runOrThrow('pip3 install edge-tts --quiet 2>&1');
      console.log('  edge-tts installed via pip3.');
      return true;
    } catch (e2) {
      console.error('  [ERROR] Could not install edge-tts. Ensure Python + pip are in PATH.');
      return false;
    }
  }
}

// ── Check / install ffmpeg ────────────────────────────────────
async function ensureFFmpeg() {
  console.log('\n[2/4] Checking ffmpeg...');
  const check = run('ffmpeg -version 2>&1');
  if (check.toLowerCase().includes('ffmpeg version')) {
    const ver = check.match(/ffmpeg version ([^\s]+)/i)?.[1] || 'installed';
    console.log(`  ffmpeg ${ver} — already in PATH.`);
    return 'ffmpeg';
  }

  // Try winget
  console.log('  ffmpeg not in PATH. Trying winget install...');
  try {
    runOrThrow('winget install --id Gyan.FFmpeg -e --silent --accept-package-agreements --accept-source-agreements 2>&1', { timeout: 120000 });
    const check2 = run('ffmpeg -version 2>&1');
    if (check2.toLowerCase().includes('ffmpeg version')) {
      console.log('  ffmpeg installed via winget.');
      return 'ffmpeg';
    }
  } catch (e) { /* fallthrough */ }

  // Try chocolatey
  const chocoCheck = run('choco --version 2>&1');
  if (chocoCheck.match(/\d+\.\d+/)) {
    console.log('  Trying choco install ffmpeg...');
    try {
      runOrThrow('choco install ffmpeg -y --no-progress 2>&1', { timeout: 120000 });
      const check3 = run('ffmpeg -version 2>&1');
      if (check3.toLowerCase().includes('ffmpeg version')) {
        console.log('  ffmpeg installed via chocolatey.');
        return 'ffmpeg';
      }
    } catch (e) { /* fallthrough */ }
  }

  // Check for a local ffmpeg.exe in current directory
  const localExe = path.join(__dirname, 'ffmpeg.exe');
  if (fs.existsSync(localExe)) {
    console.log('  Found local ffmpeg.exe in project folder.');
    return localExe;
  }

  console.error('  [ERROR] ffmpeg not found. Please:');
  console.error('    Option A: winget install Gyan.FFmpeg');
  console.error('    Option B: choco install ffmpeg');
  console.error('    Option C: Download from https://ffmpeg.org/download.html');
  console.error('              and place ffmpeg.exe in: ' + __dirname);
  return null;
}

// ── Generate TTS audio for one slide ─────────────────────────
function generateSlideAudio(slideIdx, text, outFile) {
  return new Promise((resolve, reject) => {
    // edge-tts --voice en-US-AriaNeural --text "..." --write-media out.mp3
    const safeText = text.replace(/"/g, "'").replace(/\n/g, ' ');
    const cmd = `edge-tts --voice "${VOICE}" --text "${safeText}" --write-media "${outFile}"`;
    exec(cmd, { timeout: 30000 }, (err, stdout, stderr) => {
      if (err) {
        // Fallback: try edge-tts as module
        const cmd2 = `python -m edge_tts --voice "${VOICE}" --text "${safeText}" --write-media "${outFile}"`;
        exec(cmd2, { timeout: 30000 }, (err2) => {
          if (err2) reject(new Error(`TTS failed for slide ${slideIdx+1}: ${err2.message}`));
          else resolve(outFile);
        });
      } else {
        resolve(outFile);
      }
    });
  });
}

// ── Pad/trim audio to exact duration ─────────────────────────
function padAudio(ffmpegPath, inputFile, outputFile, duration) {
  return new Promise((resolve, reject) => {
    // Use apad filter to extend to target duration, then trim to exact length
    const cmd = `"${ffmpegPath}" -y -i "${inputFile}" -af "apad=whole_dur=${duration}" -t ${duration} -ar 44100 -ac 2 "${outputFile}" 2>&1`;
    exec(cmd, { timeout: 15000 }, (err) => {
      if (err) reject(err);
      else resolve(outputFile);
    });
  });
}

// ── Concatenate all audio files ───────────────────────────────
function concatAudio(ffmpegPath, audioFiles, outputFile) {
  return new Promise((resolve, reject) => {
    // Write concat list file
    const listFile = path.join(AUDIO_DIR, 'concat_list.txt');
    const listContent = audioFiles.map(f => `file '${path.resolve(f).replace(/\\/g, '/')}'`).join('\n');
    fs.writeFileSync(listFile, listContent, 'utf8');
    const cmd = `"${ffmpegPath}" -y -f concat -safe 0 -i "${listFile}" -ar 44100 -ac 2 "${outputFile}" 2>&1`;
    exec(cmd, { timeout: 60000 }, (err, stdout, stderr) => {
      if (err) reject(new Error('concat failed: ' + (stderr || stdout)));
      else resolve(outputFile);
    });
  });
}

// ── Merge audio into video ────────────────────────────────────
function mergeAudioVideo(ffmpegPath, videoFile, audioFile, outputFile) {
  return new Promise((resolve, reject) => {
    // -shortest ensures output length matches the video
    const cmd = `"${ffmpegPath}" -y -i "${videoFile}" -i "${audioFile}" -c:v copy -c:a aac -b:a 192k -shortest "${outputFile}" 2>&1`;
    exec(cmd, { timeout: 120000 }, (err, stdout, stderr) => {
      if (err) reject(new Error('merge failed: ' + (stderr || stdout)));
      else resolve(outputFile);
    });
  });
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  console.log('\n  ================================================');
  console.log('   Yogesh Portfolio — Adding Voice-Over to MP4');
  console.log('   Voice: Microsoft Neural TTS (en-US-AriaNeural)');
  console.log('   Duration: 150 sec | 20 slides | 7.5 sec each');
  console.log('   Trainer: Eluri Narendra | IBM Granite Agentic AI');
  console.log('  ================================================\n');

  if (!fs.existsSync(INPUT_VIDEO)) {
    console.error(`  [ERROR] Input video not found: ${INPUT_VIDEO}`);
    process.exit(1);
  }

  // Step 1: edge-tts
  const ttsOK = await ensureEdgeTTS();
  if (!ttsOK) process.exit(1);

  // Step 2: ffmpeg
  const ffmpegPath = await ensureFFmpeg();
  if (!ffmpegPath) process.exit(1);

  // Step 3: Generate audio per slide
  console.log('\n[3/4] Generating voice-over audio (20 slides)...');
  if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);

  const paddedFiles = [];
  for (let i = 0; i < NARRATION.length; i++) {
    const rawFile    = path.join(AUDIO_DIR, `slide_${String(i+1).padStart(2,'0')}_raw.mp3`);
    const paddedFile = path.join(AUDIO_DIR, `slide_${String(i+1).padStart(2,'0')}_pad.wav`);
    process.stdout.write(`  Slide ${String(i+1).padStart(2)} / 20 — generating TTS...`);
    try {
      await generateSlideAudio(i, NARRATION[i], rawFile);
      await padAudio(ffmpegPath, rawFile, paddedFile, SLIDE_DUR);
      paddedFiles.push(paddedFile);
      process.stdout.write(' done\n');
    } catch (e) {
      console.error(`\n  [WARN] Slide ${i+1} TTS error: ${e.message}`);
      // Create silence fallback
      const silenceFile = path.join(AUDIO_DIR, `slide_${String(i+1).padStart(2,'0')}_pad.wav`);
      execSync(`"${ffmpegPath}" -y -f lavfi -i anullsrc=r=44100:cl=stereo -t ${SLIDE_DUR} "${silenceFile}" 2>&1`);
      paddedFiles.push(silenceFile);
      process.stdout.write(' (silence fallback)\n');
    }
  }

  // Step 4: Concatenate all audio → full_voiceover.wav
  console.log('\n  Concatenating 20 audio segments...');
  const fullAudio = path.join(AUDIO_DIR, 'full_voiceover.wav');
  try {
    await concatAudio(ffmpegPath, paddedFiles, fullAudio);
    const audioSz = Math.round(fs.statSync(fullAudio).size / 1024);
    console.log(`  Full audio: full_voiceover.wav (${audioSz} KB)`);
  } catch (e) {
    console.error(`  [ERROR] Concat failed: ${e.message}`);
    process.exit(1);
  }

  // Step 5: Merge audio + video
  console.log('\n[4/4] Merging voice-over into video...');
  try {
    await mergeAudioVideo(ffmpegPath, INPUT_VIDEO, fullAudio, OUTPUT_VIDEO);
    if (fs.existsSync(OUTPUT_VIDEO)) {
      const sz = Math.round(fs.statSync(OUTPUT_VIDEO).size / (1024*1024) * 10) / 10;
      console.log('\n  ================================================');
      console.log('   VOICE-OVER MP4 COMPLETE!');
      console.log('  ================================================');
      console.log(`   Output  : ${OUTPUT_VIDEO}`);
      console.log(`   Size    : ${sz} MB`);
      console.log('   Audio   : Microsoft Neural TTS (en-US-AriaNeural)');
      console.log('   Format  : MP4 H.264 + AAC 192kbps');
      console.log('   Duration: ~150 seconds');
      console.log('  ================================================\n');
      // Open the video
      exec(`start "" "${OUTPUT_VIDEO}"`);
    } else {
      console.error('  [ERROR] Output file not created.');
    }
  } catch (e) {
    console.error(`  [ERROR] Merge failed: ${e.message}`);
  }
}

main().catch(console.error);
