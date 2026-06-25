import https from 'node:https';

function requestText(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'dancestudio-vanz-lp/1.0'
        }
      },
      (res) => {
        const statusCode = res.statusCode || 0;
        const location = res.headers.location;

        if ([301, 302, 303, 307, 308].includes(statusCode) && location) {
          res.resume();
          if (redirectCount >= 5) {
            reject(new Error('Too many redirects while loading announcements.'));
            return;
          }
          resolve(requestText(new URL(location, url).toString(), redirectCount + 1));
          return;
        }

        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          if (statusCode < 200 || statusCode >= 300) {
            reject(new Error(`GAS responded with ${statusCode}.`));
            return;
          }
          resolve(body);
        });
      }
    );

    request.setTimeout(25000, () => {
      request.destroy(new Error('Announcements request timed out.'));
    });
    request.on('error', reject);
  });
}

function normalizeSourceUrl(value) {
  return String(value || '')
    .trim()
    .replace(/^Value\s*:\s*/i, '')
    .replace(/^["']|["']$/g, '')
    .trim();
}

export default async function handler(request, response) {
  const sourceUrl = normalizeSourceUrl(process.env.VITE_ANNOUNCEMENTS_URL || process.env.ANNOUNCEMENTS_URL);

  if (!sourceUrl) {
    response.status(500).json({ ok: false, message: 'Announcements URL is not configured.' });
    return;
  }

  try {
    const dataUrl = new URL(sourceUrl);
    dataUrl.searchParams.set('page', 'announcements-data');
    dataUrl.searchParams.delete('callback');

    const text = await requestText(dataUrl.toString());
    const payload = JSON.parse(text);
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    response.status(200).json(payload);
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : 'Failed to load announcements.'
    });
  }
}
