/**
 * Anubis-style proof-of-work gate for the static site.
 *
 * `wrangler.jsonc` sets `assets.run_worker_first: true`, so this Worker runs
 * before Workers Assets. It lets RSS, robots, static assets, and known
 * SEO/social crawlers through, and challenges other document requests with a
 * SHA-256 proof of work.
 *
 * Required secret:
 *   pnpm exec wrangler secret put ANUBIS_SECRET
 *
 * For local development, copy `.dev.vars.example` to `.dev.vars` and set a
 * random secret there.
 */

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  ANUBIS_SECRET?: string;
  POW_DIFFICULTY?: string;
}

const COOKIE_NAME = 'anubis_pass';
const COOKIE_VERSION = 'v1';
const CHALLENGE_TTL_MS = 10 * 60 * 1000;
const PASS_TTL_SECONDS = 24 * 60 * 60;
const VERIFY_PATH = '/__anubis/verify';
const DEFAULT_DIFFICULTY = 4;
const MAX_CHALLENGE_LENGTH = 128;
const MAX_BODY_LENGTH = 4096;

const ALLOWED_PATHS = new Set([
  '/rss.xml',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/favicon.svg',
  '/manifest.webmanifest',
  '/site.webmanifest',
]);

const ALLOWED_PREFIXES = ['/.well-known/', '/_astro/', '/images/', '/assets/', '/fonts/'];

const ALLOWED_EXTENSIONS = new Set([
  '.css',
  '.js',
  '.mjs',
  '.json',
  '.xml',
  '.txt',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.gif',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.map',
  '.pdf',
  '.mp4',
  '.webm',
  '.mp3',
  '.wav',
  '.wasm',
]);

const ALLOWED_BOT_HINTS = [
  'googlebot',
  'bingbot',
  'duckduckbot',
  'yandexbot',
  'baiduspider',
  'applebot',
  'twitterbot',
  'facebookexternalhit',
  'linkedinbot',
  'slackbot',
  'discordbot',
  'telegrambot',
  'whatsapp',
  'pinterestbot',
  'redditbot',
];

const encoder = new TextEncoder();

function noStore(headers: Headers): Headers {
  headers.set('Cache-Control', 'no-store, max-age=0');
  headers.set('Pragma', 'no-cache');
  return headers;
}

function json(data: unknown, status = 200, headers: Headers = new Headers()): Response {
  headers.set('Content-Type', 'application/json; charset=utf-8');
  noStore(headers);
  return new Response(JSON.stringify(data), { status, headers });
}

function base64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function randomHex(byteLength: number): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function hmac(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return base64Url(new Uint8Array(signature));
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function getDifficulty(env: Env): number {
  const parsed = Number.parseInt(env.POW_DIFFICULTY ?? '', 10);
  if (!Number.isFinite(parsed)) return DEFAULT_DIFFICULTY;
  return Math.min(6, Math.max(1, parsed));
}

function isAllowedPath(pathname: string): boolean {
  if (ALLOWED_PATHS.has(pathname)) return true;
  if (ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;

  const dot = pathname.lastIndexOf('.');
  if (dot === -1) return false;
  return ALLOWED_EXTENSIONS.has(pathname.slice(dot).toLowerCase());
}

function isAllowedBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return ALLOWED_BOT_HINTS.some((hint) => ua.includes(hint));
}

function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get('cookie');
  if (!header) return null;

  for (const part of header.split(';')) {
    const [key, ...value] = part.trim().split('=');
    if (key === name) return value.join('=');
  }

  return null;
}

function cookieHeader(request: Request, value: string, maxAge: number): string {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

async function hasValidPass(request: Request, secret: string): Promise<boolean> {
  const cookie = getCookie(request, COOKIE_NAME);
  if (!cookie) return false;

  const parts = cookie.split('.');
  if (parts.length !== 3) return false;

  const [version, expires, signature] = parts;
  if (version !== COOKIE_VERSION) return false;

  const expiresAt = Number.parseInt(expires, 10);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  const expected = await hmac(secret, `${version}.${expires}`);
  return timingSafeEqual(expected, signature);
}

function challengePage(config: Record<string, unknown>): Response {
  const jsonConfig = JSON.stringify(config).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<html lang="zh-Hans">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>安全验证 | Tealife</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    display: grid;
    place-items: center;
    min-height: 100svh;
    margin: 0;
    padding: 1.5rem;
    background: #e7e7e7;
    color: #1b1b1b;
    font-family: 'Inter Variable', 'Noto Sans SC Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
  }
  main {
    width: min(100%, 28rem);
    padding: 2rem;
    border: 1px solid #cfcfcf;
    border-radius: 0.75rem;
    background: #f3f3f3;
    box-shadow: 0 12px 40px rgb(0 0 0 / 0.08);
  }
  h1 { margin: 0 0 0.75rem; font-size: 1.35rem; }
  p { margin: 0 0 1rem; color: #5c5c5c; font-size: 0.95rem; }
  .status { font-variant-numeric: tabular-nums; }
  .error { display: none; color: #8b1a1a; }
  .error[data-visible="true"] { display: block; }
</style>
</head>
<body>
<main>
  <h1>安全验证</h1>
  <p>这个站点使用浏览器端计算来确认访客是真实浏览器。计算会在一两秒内完成，不需要操作。</p>
  <p class="status" id="status">正在验证…</p>
  <p class="error" id="error">验证失败，请刷新页面重试。</p>
  <noscript><p class="error" data-visible="true">需要启用 JavaScript 才能通过验证。</p></noscript>
</main>
<script>
  const config = ${jsonConfig};
  const status = document.getElementById('status');
  const error = document.getElementById('error');
  const encoder = new TextEncoder();
  const prefix = '0'.repeat(config.difficulty);

  async function hash(nonce) {
    const digest = await crypto.subtle.digest('SHA-256', encoder.encode(config.challenge + ':' + nonce));
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async function solve() {
    if (!crypto?.subtle) throw new Error('WebCrypto unavailable');
    for (let nonce = 0; ; nonce += 1) {
      const digest = await hash(nonce);
      if (digest.startsWith(prefix)) return nonce;
      if (nonce > 0 && nonce % 1000 === 0) {
        status.textContent = '正在验证… ' + nonce.toLocaleString() + ' 次';
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
  }

  (async () => {
    try {
      const nonce = await solve();
      status.textContent = '验证通过，正在进入…';
      const response = await fetch(config.verify, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge: config.challenge,
          ts: config.ts,
          sig: config.sig,
          nonce,
        }),
      });
      if (!response.ok) throw new Error('verify failed');
      const target = new URL(config.redirect, window.location.origin);
      const redirect =
        target.origin === window.location.origin
          ? target.pathname + target.search + target.hash
          : '/';
      window.location.replace(redirect);
    } catch (cause) {
      console.error(cause);
      status.textContent = '验证失败';
      error.dataset.visible = 'true';
    }
  })();
</script>
</body>
</html>`;

  const headers = new Headers({
    'Content-Type': 'text/html; charset=utf-8',
    'X-Robots-Tag': 'noindex',
    'Referrer-Policy': 'no-referrer',
  });
  noStore(headers);
  return new Response(html, { status: 200, headers });
}

async function verify(request: Request, env: Env, secret: string): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_LENGTH) {
    return json({ ok: false, error: 'Payload too large' }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  if (!body || typeof body !== 'object') {
    return json({ ok: false, error: 'Invalid payload' }, 400);
  }

  const { challenge, ts, sig, nonce } = body as Record<string, unknown>;
  if (
    typeof challenge !== 'string' ||
    challenge.length === 0 ||
    challenge.length > MAX_CHALLENGE_LENGTH ||
    typeof ts !== 'number' ||
    typeof sig !== 'string' ||
    typeof nonce !== 'number'
  ) {
    return json({ ok: false, error: 'Invalid payload' }, 400);
  }

  if (!Number.isInteger(nonce) || nonce < 0 || nonce > 1_000_000_000) {
    return json({ ok: false, error: 'Invalid nonce' }, 400);
  }

  const now = Date.now();
  if (!Number.isFinite(ts) || ts > now + 60_000 || now - ts > CHALLENGE_TTL_MS) {
    return json({ ok: false, error: 'Challenge expired' }, 403);
  }

  const expected = await hmac(secret, `${challenge}.${ts}`);
  if (!timingSafeEqual(expected, sig)) {
    return json({ ok: false, error: 'Invalid signature' }, 403);
  }

  const digest = await sha256Hex(`${challenge}:${nonce}`);
  if (!digest.startsWith('0'.repeat(getDifficulty(env)))) {
    return json({ ok: false, error: 'Invalid proof' }, 403);
  }

  const expires = now + PASS_TTL_SECONDS * 1000;
  const cookieValue = `${COOKIE_VERSION}.${expires}.${await hmac(secret, `${COOKIE_VERSION}.${expires}`)}`;
  const headers = new Headers();
  headers.set('Set-Cookie', cookieHeader(request, cookieValue, PASS_TTL_SECONDS));

  return json({ ok: true }, 200, headers);
}

async function serveAsset(request: Request, env: Env): Promise<Response> {
  const response = await env.ASSETS.fetch(request);
  const contentType = response.headers.get('Content-Type') ?? '';

  if (!contentType.includes('text/html')) return response;

  const headers = new Headers(response.headers);
  noStore(headers);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const secret = env.ANUBIS_SECRET;
    if (!secret) {
      return new Response(
        'ANUBIS_SECRET is not configured. Run: pnpm exec wrangler secret put ANUBIS_SECRET',
        {
          status: 503,
          headers: noStore(new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })),
        },
      );
    }

    const url = new URL(request.url);
    if (url.pathname === VERIFY_PATH) {
      return verify(request, env, secret);
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return env.ASSETS.fetch(request);
    }

    const userAgent = request.headers.get('user-agent') ?? '';
    if (isAllowedPath(url.pathname) || isAllowedBot(userAgent)) {
      return serveAsset(request, env);
    }

    // HEAD requests never receive the document body, so they can pass through.
    if (request.method === 'HEAD') {
      return serveAsset(request, env);
    }

    if (await hasValidPass(request, secret)) {
      return serveAsset(request, env);
    }

    const challenge = randomHex(16);
    const ts = Date.now();
    const sig = await hmac(secret, `${challenge}.${ts}`);

    return challengePage({
      challenge,
      ts,
      sig,
      difficulty: getDifficulty(env),
      verify: VERIFY_PATH,
      redirect: `${url.pathname}${url.search}`,
    });
  },
};
