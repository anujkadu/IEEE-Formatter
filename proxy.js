import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

app.post('/latex-proxy', async (req, res) => {
  try {
    const latexContent = req.body.text;
    console.log('Received LaTeX:', latexContent.substring(0, 100)); // Log first 100 chars for debugging
    const response = await fetch('https://latexonline.cc/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: latexContent })
    });
    if (!response.ok) {
      console.error('LaTeX service response:', response.status, response.statusText);
      throw new Error(`LaTeX service failed: ${response.statusText}`);
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.type('application/pdf');
    const blob = await response.blob();
    blob.stream().pipe(res);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));