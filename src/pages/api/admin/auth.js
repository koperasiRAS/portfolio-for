export const prerender = false;

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'for-studio-secret-key-2025';
const TOKEN_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getAuthConfig() {
  const authPath = path.join(process.cwd(), 'src', 'data', 'auth.json');
  if (fs.existsSync(authPath)) {
    try {
      return JSON.parse(fs.readFileSync(authPath, 'utf-8'));
    } catch (e) {
      console.error('Error reading auth.json:', e);
    }
  }
  return { username: 'frameofrangga', password: 'Ranggaakunportofolio1' };
}

function signToken(username) {
  const payload = JSON.stringify({ username, exp: Date.now() + TOKEN_TTL });
  const sig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
  return Buffer.from(payload + '.' + sig, 'base64');
}

function verifyToken(raw) {
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

export async function POST({ request }) {
  try {
    const { action, username, password, currentPassword, newPassword } = await request.json();
    const currentAuth = getAuthConfig();

    if (action === 'change-password') {
      if (currentPassword !== currentAuth.password) {
        return new Response(JSON.stringify({ success: false, error: 'Password saat ini salah' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (!newPassword || newPassword.length < 5) {
        return new Response(JSON.stringify({ success: false, error: 'Password baru minimal 5 karakter' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const authPath = path.join(process.cwd(), 'src', 'data', 'auth.json');
      fs.writeFileSync(authPath, JSON.stringify({ username: currentAuth.username, password: newPassword }, null, 2));

      return new Response(JSON.stringify({ success: true, message: 'Password berhasil diubah!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const validUser = username === currentAuth.username || username === 'rangga' || username === 'frameofrangga';
    const validPass = password === currentAuth.password;

    if (validUser && validPass) {
      const token = signToken(username);
      return new Response(
        JSON.stringify({
          success: true,
          token,
          user: { username: currentAuth.username, name: 'Rangga Danuarta' },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Username atau password salah!' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET({ request }) {
  const authHeader = request.headers.get('authorization') || '';
  const rawToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  const data = verifyToken(rawToken);
  return new Response(
    JSON.stringify({ valid: !!data, user: data ? { username: data.username } : null }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
