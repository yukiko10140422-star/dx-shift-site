// functions/content.js
// GET /api/content?type=cases|faqs|all
// jsonbin.io からコンテンツを取得して返す読み取り専用エンドポイント

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=60', // 60秒キャッシュ
  };

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const type = event.queryStringParameters?.type || 'all';
  const MASTER_KEY = process.env.JSONBIN_MASTER_KEY;
  const BIN_ID = process.env.JSONBIN_BIN_ID || '69a2730ad0ea881f40e0e925';

  if (!MASTER_KEY) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server config error' }) };
  }

  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': MASTER_KEY },
    });

    if (!res.ok) throw new Error(`jsonbin GET failed: ${res.status}`);
    const { record } = await res.json();

    let data;
    if (type === 'cases') {
      data = { cases: (record.cases || []).filter(c => c.published !== false) };
    } else if (type === 'faqs') {
      data = { faqs: (record.faqs || []).filter(f => f.published !== false) };
    } else {
      data = {
        cases: (record.cases || []).filter(c => c.published !== false),
        faqs:  (record.faqs  || []).filter(f => f.published !== false),
      };
    }

    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    console.error('content function error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'コンテンツの取得に失敗しました' }) };
  }
};
