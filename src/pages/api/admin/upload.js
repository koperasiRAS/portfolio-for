export const prerender = false;

import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const uploadsDir = path.join(process.cwd(), 'public', 'assets', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    if (contentType.includes('application/json')) {
      const { filename, base64Data } = await request.json();
      if (!base64Data) {
        return new Response(JSON.stringify({ success: false, error: 'Data base64 tidak ditemukan' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Strip data:image/...;base64, prefix if present
      const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');
      
      const ext = path.extname(filename) || '.jpg';
      const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const filePath = path.join(uploadsDir, safeName);
      
      fs.writeFileSync(filePath, buffer);
      const publicUrl = `/assets/uploads/${safeName}`;

      return new Response(JSON.stringify({ success: true, url: publicUrl }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle Multipart FormData
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ success: false, error: 'File tidak ditemukan' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name || 'upload.jpg';
    const ext = path.extname(originalName) || '.jpg';
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const filePath = path.join(uploadsDir, safeName);

    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/assets/uploads/${safeName}`;

    return new Response(JSON.stringify({ success: true, url: publicUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error uploading file:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
