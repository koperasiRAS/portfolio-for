import crypto from 'crypto';

const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'for-studio-secret-key-2025';

export function verifyAuthToken(raw) {
  if (!raw) return null;
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf-8');
    const lastDot = decoded.lastIndexOf('.');
    if (lastDot === -1) return null;
    const payload = decoded.slice(0, lastDot);
    const sig = decoded.slice(lastDot + 1);
    const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
    if (sig !== expected) return null;
    const data = JSON.parse(payload);
    if (Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export function requireAuth(request) {
  const header = request.headers.get('authorization') || '';
  const raw = header.startsWith('Bearer ') ? header.slice(7) : header;
  const data = verifyAuthToken(raw);
  return data;
}

export function unauthorized() {
  return new Response(
    JSON.stringify({ success: false, error: 'Authorization required' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  );
}
