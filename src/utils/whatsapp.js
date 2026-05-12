/**
 * WhatsApp Auto-Message Helper
 * Semua pesan WhatsApp terpusat di sini untuk mudah diupdate
 */

export const WA_NUMBER = '6287779560264'

export const WA_MESSAGES = {

  // ── GENERAL ──────────────────────────────────────────────
  general: `Halo Rangga! Saya tertarik dengan layanan Frame Of Rangga. Boleh saya tahu lebih lanjut?`,

  // ── PHOTOGRAPHY ──────────────────────────────────────────
  foto_general: `Halo Rangga! Saya melihat portofolio fotografi Anda dan sangat tertarik. Boleh saya diskusikan kebutuhan foto saya?`,

  foto_wedding: `Halo Rangga! Saya tertarik dengan jasa foto birthday/event/dokumentasi dari Frame Of Rangga. Boleh saya tahu paket dan harganya?`,

  foto_komersial: `Halo Rangga! Saya tertarik dengan jasa foto komersial/produk dari Frame Of Rangga. Bisa kita diskusikan kebutuhan saya?`,

  foto_automotive: `Halo Rangga! Saya tertarik dengan jasa foto automotive dari Frame Of Rangga. Boleh saya tahu lebih lanjut?`,

  foto_lifestyle: `Halo Rangga! Saya tertarik dengan jasa foto lifestyle dari Frame Of Rangga. Bisa kita diskusikan konsepnya?`,

  foto_fotografi: `Halo Rangga! Saya melihat karya Fotografi Anda dan tertarik untuk berkolaborasi. Boleh kita diskusikan?`,

  // ── VIDEOGRAPHY ──────────────────────────────────────────
  video_general: `Halo Rangga! Saya melihat portofolio video Anda dan sangat tertarik. Boleh saya diskusikan kebutuhan video saya?`,

  video_brand: `Halo Rangga! Saya tertarik dengan jasa pembuatan brand video dari Frame Of Rangga. Bisa kita diskusikan konsep dan harganya?`,

  video_dokumentasi: `Halo Rangga! Saya tertarik dengan jasa dokumentasi event dari Frame Of Rangga. Boleh saya tahu paket dan ketersediaannya?`,

  video_konten: `Halo Rangga! Saya tertarik dengan jasa pembuatan konten sosial media dari Frame Of Rangga. Bisa kita diskusikan kebutuhan konten saya?`,

  video_promosi: `Halo Rangga! Saya tertarik dengan jasa video promosi dari Frame Of Rangga. Boleh saya tahu lebih lanjut tentang paket dan prosesnya?`,

  // ── DESIGN ───────────────────────────────────────────────
  design_general: `Halo Rangga! Saya melihat portofolio desain Anda dan sangat tertarik. Boleh saya diskusikan kebutuhan desain saya?`,

  design_brand: `Halo Rangga! Saya tertarik dengan jasa brand identity dari Frame Of Rangga. Bisa kita diskusikan kebutuhan branding bisnis saya?`,

  design_sosmed: `Halo Rangga! Saya tertarik dengan jasa desain konten sosial media dari Frame Of Rangga. Boleh saya tahu paket dan harganya?`,

  design_poster: `Halo Rangga! Saya tertarik dengan jasa desain poster dari Frame Of Rangga. Bisa kita diskusikan kebutuhan dan konsepnya?`,

  design_advertising: `Halo Rangga! Saya tertarik dengan jasa desain iklan/advertising dari Frame Of Rangga. Boleh saya tahu lebih lanjut?`,

  // ── WEB DEVELOPMENT ──────────────────────────────────────
  web_general: `Halo Rangga! Saya tertarik dengan jasa pembuatan website dari Frame Of Rangga. Boleh saya diskusikan kebutuhan website saya?`,

  web_portfolio: `Halo Rangga! Saya tertarik dengan jasa pembuatan website portfolio seperti yang Anda buat. Boleh saya tahu estimasi harga dan prosesnya?`,

  web_landing: `Halo Rangga! Saya tertarik dengan jasa pembuatan landing page dari Frame Of Rangga. Bisa kita diskusikan kebutuhan dan target konversi saya?`,

  web_company: `Halo Rangga! Saya tertarik dengan jasa pembuatan company profile website dari Frame Of Rangga. Boleh kita diskusikan kebutuhan perusahaan saya?`,

  web_sistem: `Halo Rangga! Saya tertarik dengan jasa pembuatan sistem sederhana (seperti POS/kasir) dari Frame Of Rangga. Boleh saya tahu lebih lanjut tentang fitur dan harganya?`,

  // ── CONTACT PAGE ─────────────────────────────────────────
  contact: `Halo Rangga! Saya ingin berkonsultasi mengenai project kreatif. Apakah Anda tersedia untuk berdiskusi?`,

  // ── COLLAB / CTA ─────────────────────────────────────────
  collab: `Halo Rangga! Saya tertarik untuk berkolaborasi dengan Frame Of Rangga. Boleh kita diskusikan lebih lanjut?`,
}

/**
 * Generate WhatsApp URL with encoded message
 * @param {string} messageKey - key from WA_MESSAGES
 * @returns {string} - full WhatsApp URL
 */
export function waLink(messageKey = 'general') {
  const message = WA_MESSAGES[messageKey] || WA_MESSAGES.general
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
