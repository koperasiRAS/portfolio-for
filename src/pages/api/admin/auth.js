export const prerender = false;

import fs from 'fs';
import path from 'path';

function getAuthConfig() {
  const authPath = path.join(process.cwd(), 'src', 'data', 'auth.json');
  if (fs.existsSync(authPath)) {
    try {
      return JSON.parse(fs.readFileSync(authPath, 'utf-8'));
    } catch (e) {
      console.error('Error reading auth.json:', e);
    }
  }
  return {
    username: 'frameofrangga',
    password: 'Ranggaakunportofolio1',
  };
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

    // Standard Login
    const validUser = (username === currentAuth.username || username === 'rangga' || username === 'frameofrangga');
    const validPass = (password === currentAuth.password);

    if (validUser && validPass) {
      // Create a persistent token
      const token = Buffer.from(`${username}:${Date.now()}:for-secret-auth`).toString('base64');
      return new Response(
        JSON.stringify({
          success: true,
          token,
          user: { username: currentAuth.username, name: 'Rangga Danuarta' },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Username atau password salah!' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
