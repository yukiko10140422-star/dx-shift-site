/**
 * jsonbin.io 初期データ投入スクリプト
 * 
 * 使い方:
 *   node scripts/init-jsonbin.js
 * 
 * 事前に .env ファイルに以下を設定してください:
 *   JSONBIN_MASTER_KEY=your_master_key
 *   JSONBIN_BIN_ID=69a2730ad0ea881f40e0e925
 * 
 * または環境変数として直接渡す:
 *   JSONBIN_MASTER_KEY=xxx JSONBIN_BIN_ID=yyy node scripts/init-jsonbin.js
 */

require('dotenv').config();

const MASTER_KEY = process.env.JSONBIN_MASTER_KEY || '$2a$10$MzMkLRuDU9fhLvkwm.fuWO/wd6dr.n3GZbQm0BA3YzegoDR1wJ3D.';
const BIN_ID     = process.env.JSONBIN_BIN_ID     || '69a2730ad0ea881f40e0e925';

const initialData = {
  // お問い合わせデータ（フォームから追加される）
  contacts: [],

  // 事例データ（cases.htmlで動的に読み込む）
  cases: [
    {
      id: 1,
      published: true,
      tag: "居酒屋（スタッフ18名・深夜営業）",
      title: "紙の出勤票＋LINEシフト連絡をスマホアプリに一本化した想定ケース",
      description: "月末の集計が最長3時間かかっていた。シフト連絡ミスも月2〜3件あったが、導入後はほぼゼロに。深夜跨ぎシフトの自動計算も実装。",
      isEstimated: true,
      metrics: [
        { value: "3h→30分", label: "月次集計時間" },
        { value: "ほぼゼロ", label: "連絡ミス" },
        { value: "2週間", label: "導入期間" }
      ],
      before: "紙の出勤票を手書き→月末にExcel転記→時給計算に毎月3時間以上。シフトはLINEグループで管理→連絡見落とし月2〜3件。",
      after: "スタッフが店舗タブレットからワンタップ打刻。シフト希望もWebで提出。月末はCSV出力ボタンを押すだけ。集計30分以下。",
      point: "深夜0時跨ぎのシフト（例：23:00〜翌3:00）に対応。深夜割増（22〜翌5時）の自動計算も実装。店舗タブレット1台での端末固定打刻を採用し、不正打刻をほぼ防止。"
    },
    {
      id: 2,
      published: true,
      tag: "美容院（スタッフ8名・指名制）",
      title: "シフト提出がLINEからWebフォームに。店長の管理負担が激減した想定ケース",
      description: "スタッフ8名の希望シフトをLINEで個別収集する作業がなくなり、シフト確定まで丸1日かかっていた作業が2時間以下に短縮。",
      isEstimated: true,
      metrics: [
        { value: "1日→2h", label: "シフト確定時間" },
        { value: "100%", label: "スタッフ定着率" },
        { value: "初日", label: "全員使用開始" }
      ],
      before: "スタッフ8名の希望シフトをLINEで個別収集→手動で調整→確定連絡→「見てなかった」の繰り返し。確定まで丸1日かかることも。",
      after: "スタッフがWebフォームでシフト希望を提出→店長が一覧で確認しワンクリックで確定→全員のスマホに通知。確定作業2時間以下。",
      point: "「LINEに慣れていない60代のスタッフでも使える」シンプルなUIを実現。ログイン→自分の名前をタップ→シフト入力の3ステップのみ。初日から全員が問題なく操作できた。"
    },
    {
      id: 3,
      published: true,
      tag: "飲食チェーン（3店舗・スタッフ35名）",
      title: "店舗ごとバラバラだったExcel勤怠を本部で一元管理した想定ケース",
      description: "店舗ごとに異なるフォーマットのExcelが3つ。毎月の本部集計作業が5時間以上かかっていたが、一元管理で30分に短縮。",
      isEstimated: true,
      metrics: [
        { value: "5h→30分", label: "全店舗集計時間" },
        { value: "3店舗", label: "同時管理" },
        { value: "自動化", label: "CSV出力" }
      ],
      before: "店舗ごとに異なるフォーマットのExcelが3つ。本部が月末に集めて突合→手入力で統合→給与計算ソフトに転記。毎月5時間以上。",
      after: "全店舗のデータが本部管理画面に集約。店舗ごとのフィルタリング可能。給与計算ソフトのフォーマットに合わせたCSVを一発出力。",
      point: "複数店舗の権限管理（店長は自店舗のみ/本部は全店舗閲覧）を実装。既存の給与計算ソフトのCSVフォーマットに合わせてカスタマイズ。3店舗分を初期費用+α対応。"
    }
  ],

  // FAQデータ（faq.htmlで動的に読み込む）
  faqs: [
    {
      id: 1,
      published: true,
      category: "導入・準備",
      question: "導入に必要なものは何ですか？",
      answer: "インターネット環境とスマートフォン（またはタブレット）があれば導入できます。専用機器の購入は基本的に不要です。店頭での打刻用に1台のタブレットを用意いただくケースが多いですが、スタッフ各自のスマホでの打刻も可能です。"
    },
    {
      id: 2,
      published: true,
      category: "導入・準備",
      question: "スマートフォンに不慣れなスタッフでも使えますか？",
      answer: "はい。LINEやメルカリが使えるレベルであれば問題ありません。操作は「ログイン→ボタンを押す」だけになるよう設計し、簡易マニュアルと運用ルールもセットで納品します。初日から全員が問題なく使えることを目指しています。"
    },
    {
      id: 3,
      published: true,
      category: "導入・準備",
      question: "導入期間はどのくらいかかりますか？",
      answer: "無料相談から運用開始まで最短3〜4週間です。内訳は「要件確定まで1週間＋MVP開発2週間」が基本です。要件が複雑な場合（複数店舗、特殊なCSVフォーマット等）は4〜6週間程度になることがあります。"
    },
    {
      id: 4,
      published: true,
      category: "機能・仕様",
      question: "不正打刻が心配です。対策はありますか？",
      answer: "いくつかの対策から選択できます。①店舗設置タブレット1台に限定した「端末固定打刻」、②店内Wi-Fiに接続している場合のみ打刻可能にする「Wi-Fi制限」、③打刻後に管理者が承認する「ルール・承認運用」。コストとご要望に合わせてご提案します。"
    },
    {
      id: 5,
      published: true,
      category: "機能・仕様",
      question: "深夜をまたぐ勤務（例：23時〜翌3時）は対応できますか？",
      answer: "対応しています。居酒屋など深夜営業の現場を想定した設計のため、日をまたぐシフトや深夜割増（22時〜翌5時など）の自動計算も設定可能です。詳細はヒアリング時にご確認ください。"
    },
    {
      id: 6,
      published: true,
      category: "機能・仕様",
      question: "複数店舗に対応できますか？",
      answer: "はい、オプションとして対応しています。1店舗の基本プランに追加する形で、複数店舗の権限管理（店長は自店舗のみ閲覧/本部は全店舗閲覧）も実装できます。料金はご要件に合わせてお見積もりします。"
    },
    {
      id: 7,
      published: true,
      category: "機能・仕様",
      question: "既存の給与計算ソフトに対応したCSVは出力できますか？",
      answer: "可能です。ご利用の給与計算ソフト（freee給与、MFクラウド給与、弥生給与、独自Excelなど）のフォーマットに合わせてCSV出力をカスタマイズします。対応ソフトについてはヒアリング時にご確認ください。"
    },
    {
      id: 8,
      published: true,
      category: "セキュリティ・データ",
      question: "データはどこに保管されますか？",
      answer: "信頼性の高いクラウドサービス（AWS、Supabase等）を利用します。通信はHTTPS暗号化。バックアップは定期的に実施します。詳細なセキュリティ要件はお問い合わせください。"
    },
    {
      id: 9,
      published: true,
      category: "セキュリティ・データ",
      question: "データの保管期間はどのくらいですか？",
      answer: "標準では過去2年分のデータを保管します。法令上の保管義務（労働基準法：3年）にも対応できるよう設計しています。保管期間の延長はオプションで対応可能です。"
    },
    {
      id: 10,
      published: true,
      category: "料金・契約",
      question: "契約の縛りはありますか？",
      answer: "月額の保守・改善サービスは最低3ヶ月でのご契約をお願いしています。3ヶ月経過後は1ヶ月前通知で解約可能です。初期費用のみの一括払いプランも相談可能です。"
    },
    {
      id: 11,
      published: true,
      category: "料金・契約",
      question: "解約した場合、データはどうなりますか？",
      answer: "解約時に全データをCSV形式でお渡しします。データのエクスポートは解約月内に対応します。サーバー上のデータは解約後30日で削除します。"
    },
    {
      id: 12,
      published: true,
      category: "料金・契約",
      question: "相談だけでも費用はかかりますか？",
      answer: "かかりません。初回の無料相談・見積もり相談はすべて無料です。「費用感だけ確認したい」「これって対応できる？」というご確認だけでも歓迎です。"
    },
    {
      id: 13,
      published: true,
      category: "サポート",
      question: "導入後のサポートはどのくらいありますか？",
      answer: "月額プランには月1回の改善ミーティング、メール・チャットサポート、バグ修正が含まれます。初月は特に手厚くサポートし、スタッフが使い慣れるまでフォローします。"
    },
    {
      id: 14,
      published: true,
      category: "サポート",
      question: "勤怠以外の業務（予約、在庫など）にも対応できますか？",
      answer: "対応可能です。ただし初期MVPでは「勤怠・シフトWeb化パック」に注力することを推奨しています。運用が安定してきたら、次の業務改善を一緒に考えていきます。"
    },
    {
      id: 15,
      published: true,
      category: "サポート",
      question: "決済機能や個人情報の高度な管理も依頼できますか？",
      answer: "決済機能（クレジット処理）や医療・金融など高度なセキュリティ要件が必要なシステムは、現時点では対応範囲外です。まずはお問い合わせいただき、ご要件を確認した上で正直にお答えします。"
    }
  ]
};

async function initJsonbin() {
  console.log('📤 jsonbin.io にデータを初期化します...');
  console.log(`   Bin ID: ${BIN_ID}`);

  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': MASTER_KEY,
      },
      body: JSON.stringify(initialData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const json = await res.json();
    console.log('✅ 初期化成功！');
    console.log(`   レコード数 - cases: ${json.record.cases.length}, faqs: ${json.record.faqs.length}, contacts: ${json.record.contacts.length}`);
    console.log('\n📊 jsonbin.io ダッシュボードで確認:');
    console.log(`   https://jsonbin.io/app/bins/${BIN_ID}`);
  } catch (err) {
    console.error('❌ 初期化失敗:', err.message);
    process.exit(1);
  }
}

initJsonbin();
