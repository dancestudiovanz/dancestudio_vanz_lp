export default async function handler(request, response) {
  const sourceUrl = process.env.VITE_ANNOUNCEMENTS_URL || process.env.ANNOUNCEMENTS_URL;

  if (!sourceUrl) {
    response.status(500).json({ ok: false, message: 'Announcements URL is not configured.' });
    return;
  }

  try {
    const dataUrl = new URL(sourceUrl);
    dataUrl.searchParams.set('page', 'announcements-data');
    dataUrl.searchParams.delete('callback');

    const gasResponse = await fetch(dataUrl.toString(), {
      redirect: 'follow',
      headers: {
        Accept: 'application/json'
      }
    });

    if (!gasResponse.ok) {
      response.status(502).json({ ok: false, message: `GAS responded with ${gasResponse.status}.` });
      return;
    }

    const payload = await gasResponse.json();
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    response.status(200).json(payload);
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : 'Failed to load announcements.'
    });
  }
}
