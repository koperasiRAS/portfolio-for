export const prerender = false;

import fs from 'fs';
import path from 'path';
import { requireAuth, unauthorized } from '../../../utils/auth-guard.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function POST({ request }) {
  const auth = requireAuth(request);
  if (!auth) return unauthorized();

  try {
    const body = await request.json();
    const { type, action, slug, data } = body;

    if (!type) {
      return new Response(JSON.stringify({ success: false, error: 'Tipe data diperlukan' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const dataDir = path.join(process.cwd(), 'src', 'data');

    // Handle Profile Update
    if (type === 'profile') {
      const profilePath = path.join(dataDir, 'profile.json');
      fs.writeFileSync(profilePath, JSON.stringify(data, null, 2), 'utf-8');
      return new Response(JSON.stringify({ success: true, message: 'Profil berhasil diperbarui' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Collections: photos, videos, designs, websites
    const targetDir = path.join(dataDir, type);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    if (action === 'delete') {
      if (!slug) {
        return new Response(JSON.stringify({ success: false, error: 'Slug diperlukan untuk menghapus' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const filePath = path.join(targetDir, `${slug}.json`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return new Response(JSON.stringify({ success: true, message: 'Item berhasil dihapus' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create or Update
    const itemTitle = data.title || data.name || 'item';
    const itemSlug = slug || slugify(itemTitle);
    const filePath = path.join(targetDir, `${itemSlug}.json`);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return new Response(
      JSON.stringify({
        success: true,
        message: action === 'update' ? 'Item berhasil diperbarui' : 'Item berhasil ditambahkan',
        slug: itemSlug,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Error saving data:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
