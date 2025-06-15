export default async function handler(req, res) {
  const { contract } = req.query;
  if (!contract) {
    res.status(400).json({ error: 'Missing contract address' });
    return;
  }

  try {
    const apiUrl = `https://api.dexscreener.com/latest/dex/tokens/${contract}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // ส่ง header CORS ให้ frontend ใช้งานได้
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from DexScreener' });
  }
}
