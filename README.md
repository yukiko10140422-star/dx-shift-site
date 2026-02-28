# QuickShift DX — コーポレートサイト

飲食店・美容院向けDX支援会社のコーポレートサイト MVP。

## サイト構成

```
/
├── index.html              # トップ
├── services.html           # サービス
├── product/
│   └── time-shift.html     # 勤怠・シフトWeb化パック詳細（デモ付き）
├── process.html            # 導入の流れ
├── pricing.html            # 料金
├── cases.html              # 事例（jsonbin.ioから動的読み込み）
├── faq.html                # FAQ（jsonbin.ioから動的読み込み）
├── company.html            # 会社概要
├── contact.html            # お問い合わせフォーム
├── privacy.html            # プライバシーポリシー
├── terms.html              # 利用規約
├── css/style.css           # 共通スタイル
├── js/main.js              # 共通JS
├── functions/
│   ├── contact.js          # Netlify Function：お問い合わせ保存
│   └── content.js          # Netlify Function：コンテンツ取得
├── scripts/
│   └── init-jsonbin.js     # 初期データ投入スクリプト
└── netlify.toml            # Netlify設定
```

---

## 🚀 初回セットアップ手順（GitHub → Netlify）

### Step 1: GitHubリポジトリを作成

1. https://github.com にアクセス → 右上「+」→「New repository」
2. Repository name: `quickshift-dx-site`（任意）
3. Privateを選択（コードを非公開にする場合）
4. 「Create repository」をクリック

### Step 2: ローカルからGitHubにpush

ターミナルでこのフォルダを開いて実行：

```bash
git init
git add .
git commit -m "initial commit: QuickShift DX corporate site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quickshift-dx-site.git
git push -u origin main
```

> `YOUR_USERNAME` を自分のGitHubユーザー名に変えてください。

### Step 3: Netlifyにデプロイ

1. https://app.netlify.com にログイン（GitHubアカウントで連携可）
2. 「Add new site」→「Import an existing project」
3. 「GitHub」を選択 → `quickshift-dx-site` を選択
4. Build settingsはそのまま（netlify.tomlが自動読み込みされます）
5. 「Deploy site」をクリック

### Step 4: 環境変数を設定（必須）

Netlify管理画面: **Site settings** → **Environment variables** → **Add a variable**

| Variable name | Value |
|---------------|-------|
| `JSONBIN_MASTER_KEY` | `$2a$10$MzMkLRuDU9fhLvkwm.fuWO/wd6dr.n3GZbQm0BA3YzegoDR1wJ3D.` |
| `JSONBIN_BIN_ID` | `69a2730ad0ea881f40e0e925` |

設定後、**Deploys** → 「Trigger deploy」で再デプロイしてください。

### Step 5: jsonbin.io に初期データを投入

```bash
# .envファイルを作成
echo 'JSONBIN_MASTER_KEY=$2a$10$MzMkLRuDU9fhLvkwm.fuWO/wd6dr.n3GZbQm0BA3YzegoDR1wJ3D.' > .env
echo 'JSONBIN_BIN_ID=69a2730ad0ea881f40e0e925' >> .env

# 実行
node scripts/init-jsonbin.js
```

成功すると: `✅ 初期化成功！ レコード数 - cases: 3, faqs: 15, contacts: 0`

---

## 📝 コンテンツの更新方法

### 事例を追加する

https://jsonbin.io にログインしてBin `69a2730ad0ea881f40e0e925` を編集。`cases` 配列にオブジェクトを追加：

```json
{
  "id": 4,
  "published": true,
  "tag": "カフェ（スタッフ12名）",
  "title": "事例タイトル",
  "isEstimated": false,
  "metrics": [
    { "value": "2h→15分", "label": "集計時間" }
  ],
  "before": "課題の説明",
  "after": "解決後の説明",
  "point": "導入のポイント"
}
```

`"published": false` で非表示。`"isEstimated": true` で「想定ケース」バッジを表示。

### FAQを追加する

`faqs` 配列に追加：

```json
{
  "id": 16,
  "published": true,
  "category": "導入・準備",
  "question": "質問文",
  "answer": "回答文"
}
```

カテゴリ：`導入・準備` / `機能・仕様` / `セキュリティ・データ` / `料金・契約` / `サポート`

---

## 📊 お問い合わせデータの確認

フォーム送信 → Netlify Function → jsonbin.io に自動保存されます。

確認先: https://jsonbin.io/app/bins/69a2730ad0ea881f40e0e925

---

## 🔄 コード変更の反映

```bash
git add .
git commit -m "update: pricing page"
git push
```

GitHubにpushすると**Netlifyが自動再デプロイ**します（1〜2分）。

---

## 📈 GA4の設定

各HTMLの `<head>` 内に追加：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
