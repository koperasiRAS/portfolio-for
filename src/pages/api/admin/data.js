export const prerender = false;

import { getPhotos, getVideos, getDesigns, getWebsites, getProfile } from '../../../utils/content.js';

export async function GET({ request }) {
  try {
    const photos = getPhotos();
    const videos = getVideos();
    const designs = getDesigns();
    const websites = getWebsites();
    const profile = getProfile();

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          photos,
          videos,
          designs,
          websites,
          profile,
        },
      }),
      {
        status: 200,
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
