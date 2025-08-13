// api/content.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/javascript');
  // Opcional: métodos permitidos
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // O código do seu content.js (como string)
  const script = `
    (() => {
      console.log('%cExtensão desenvolvida por Nathan ...', 'color: ...');
      // resto do conteúdo...
    })();
  `;

  res.send(script);
}