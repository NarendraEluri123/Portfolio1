/**
 * ============================================================
 *  server.js — IBM Granite Proxy Server
 *  Yogesh Portfolio | Trainer: Eluri Narendra
 *
 *  Reads credentials from .env and proxies requests to the
 *  IBM watsonx.ai Granite endpoint — keeps API key server-side.
 *
 *  Start: node server.js   (or via launch_portfolio.bat)
 *  Port : 3000  (set in .env)
 * ============================================================
 */

require('dotenv').config();
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const url = require('url');

// ── Config from .env ──────────────────────────────────────────
const PORT        = process.env.PORT        || 3000;
const IBM_API_KEY = process.env.IBM_API_KEY;
const IBM_REGION  = process.env.IBM_REGION  || 'https://us-south.ml.cloud.ibm.com';
const IBM_PROJECT = process.env.IBM_PROJECT_ID;

const IAM_TOKEN_URL = 'https://iam.cloud.ibm.com/identity/token';
const GRANITE_PATH  = '/ml/v1/text/generation?version=2023-05-29';

// ── IAM token cache ───────────────────────────────────────────
let iamCache = { token: null, expiry: 0 };

async function getIAMToken() {
  if (iamCache.token && Date.now() < iamCache.expiry) return iamCache.token;

  return new Promise((resolve, reject) => {
    const body = `grant_type=urn%3Aibm%3Aparams%3Aoauth%3Agrant-type%3Aapikey&apikey=${encodeURIComponent(IBM_API_KEY)}`;
    const options = {
      hostname: 'iam.cloud.ibm.com',
      path: '/identity/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          iamCache.token = json.access_token;
          iamCache.expiry = Date.now() + (json.expires_in - 60) * 1000;
          resolve(iamCache.token);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Call IBM Granite ───────────────────────────────────────────
async function callGranite(body) {
  const token = await getIAMToken();
  const regionHost = IBM_REGION.replace('https://', '');
  const payload = JSON.stringify({
    ...body,
    project_id: IBM_PROJECT
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: regionHost,
      path: GRANITE_PATH,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ── Static file mime types ─────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon'
};

// ── HTTP Server ────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const parsed = url.parse(req.url);

  // ── POST /api/granite — Proxy to IBM watsonx.ai ───────────────
  if (req.method === 'POST' && parsed.pathname === '/api/granite') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        if (!IBM_API_KEY) throw new Error('IBM_API_KEY not set in .env');
        const payload = JSON.parse(body);
        const result = await callGranite(payload);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error('[Granite Error]', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ── GET /api/status — Health check ────────────────────────────
  if (req.method === 'GET' && parsed.pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status   : 'ok',
      model    : 'ibm/granite-13b-chat-v2',
      project  : IBM_PROJECT,
      region   : IBM_REGION,
      port     : PORT,
      apiKey   : IBM_API_KEY ? '***configured***' : 'NOT SET',
      trainer  : 'Eluri Narendra'
    }));
    return;
  }

  // ── Static file serving ───────────────────────────────────────
  let filePath = parsed.pathname === '/' ? '/index.html' : parsed.pathname;
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ================================================');
  console.log('   Yogesh Portfolio Server - IBM Granite AI');
  console.log('  ================================================');
  console.log('   URL     : http://localhost:' + PORT);
  console.log('   Region  : ' + IBM_REGION);
  console.log('   Project : ' + (IBM_PROJECT || '').substring(0, 8) + '...');
  console.log('   API Key : ' + (IBM_API_KEY ? 'Loaded OK' : 'MISSING - check .env'));
  console.log('   Trainer : Eluri Narendra');
  console.log('  ================================================');
  console.log('   Health : http://localhost:' + PORT + '/api/status');
  console.log('   Granite: POST http://localhost:' + PORT + '/api/granite');
  console.log('  ================================================');
  console.log('');
});
