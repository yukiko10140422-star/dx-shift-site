// functions/contact.js
// Netlify Function: お問い合わせデータをjsonbin.ioに保存する
// 環境変数 JSONBIN_MASTER_KEY と JSONBIN_BIN_ID を Netlify の環境変数に設定してください

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { shopName, name, email, phone, industry, staffCount, message, contactPref } = body;

  if (!shopName || !name || !email || !industry || !staffCount || !message) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "必須項目が不足しています" }) };
  }

  const MASTER_KEY = process.env.JSONBIN_MASTER_KEY;
  const BIN_ID = process.env.JSONBIN_BIN_ID || "69a2730ad0ea881f40e0e925";

  if (!MASTER_KEY) {
    console.error("JSONBIN_MASTER_KEY is not set");
    return { statusCode: 500, headers, body: JSON.stringify({ error: "サーバー設定エラー" }) };
  }

  try {
    // まず既存データを取得
    const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        "X-Master-Key": MASTER_KEY,
      },
    });

    if (!getRes.ok) {
      throw new Error(`GET failed: ${getRes.status}`);
    }

    const existing = await getRes.json();
    const currentData = existing.record;

    // 既存データが配列でなければ初期化
    const contacts = Array.isArray(currentData.contacts) ? currentData.contacts : [];

    const newEntry = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      shopName,
      name,
      email,
      phone: phone || "",
      industry,
      staffCount,
      message,
      contactPref: contactPref || "email",
      status: "new",
    };

    contacts.push(newEntry);

    // 更新データをPUT
    const putRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
      body: JSON.stringify({ contacts }),
    });

    if (!putRes.ok) {
      throw new Error(`PUT failed: ${putRes.status}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "お問い合わせを受け付けました" }),
    };
  } catch (err) {
    console.error("jsonbin error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "送信に失敗しました。しばらくしてから再度お試しください。" }),
    };
  }
};
