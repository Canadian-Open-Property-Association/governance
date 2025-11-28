import express from 'express';
import cors from 'cors';
import { createHash } from 'crypto';

const app = express();
const PORT = 3001;

app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Hash generation endpoint
app.get('/hash', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Fetch the resource
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch resource: ${response.statusText}`,
      });
    }

    // Get the content as an ArrayBuffer
    const buffer = await response.arrayBuffer();

    // Compute SHA-256 hash
    const hash = createHash('sha256');
    hash.update(Buffer.from(buffer));
    const hashBase64 = hash.digest('base64');

    // Return in SubResource Integrity format
    const integrityHash = `sha256-${hashBase64}`;

    res.json({
      url,
      hash: integrityHash,
      size: buffer.byteLength,
      contentType: response.headers.get('content-type'),
    });
  } catch (error) {
    console.error('Error fetching/hashing resource:', error);
    res.status(500).json({
      error: `Failed to process resource: ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`VCT Builder proxy server running on http://localhost:${PORT}`);
  console.log(`Hash endpoint: http://localhost:${PORT}/hash?url=<resource-url>`);
});
