# YouTube × Embedding 自動教材生成アプリ 仕様書

## 1. プロジェクト概要

### アプリ名（仮）
**塾キョウザイAI** （Juku Kyouzai AI）

### コンセプト
学習テーマを入力するだけで、YouTubeから最適な教育動画を意味検索し、
教材（まとめプリント・クイズ・穴埋めワークシート）を自動生成するWebアプリ。

### ターゲットユーザー
- 小規模学習塾の先生（1〜5人規模）
- 家庭教師・個人指導の先生

### 解決する課題
- 授業準備に毎日1〜2時間 → **15分に短縮**
- 「いい動画はあるが探す時間がない」問題
- 教材の自作コストが高い問題

---

## 2. MVP機能要件（Phase 1）

### 2.1 テーマ入力
- テキスト入力フォーム（例：「中2 一次関数 グラフの書き方」）
- 学年・教科のドロップダウン選択（任意）
- 「教材を作成」ボタン

### 2.2 YouTube動画検索 & Embedding ランキング
- YouTube Data API v3 で候補動画を取得（上位20〜30件）
  - 検索クエリ: ユーザー入力テーマ + 「授業」「解説」などの教育系キーワード付与
  - フィルタ: 動画のみ、日本語、3分〜30分、再生回数1000以上
- 各動画のタイトル + 説明文を Gemini Embedding 2 でベクトル化
- ユーザー入力テーマのベクトルとのコサイン類似度でランキング
- 上位5件を「おすすめ動画」として表示

### 2.3 字幕テキスト取得
- YouTube Transcript API（youtube-transcript-api）で自動字幕 or 手動字幕を取得
- 字幕がない場合: Whisper API でフォールバック（Phase 2）
- 字幕テキストをチャンク分割（1000トークン単位）

### 2.4 教材生成（AI）
- 選択された動画（1〜3本）の字幕テキストをLLMに投入
- 以下の3形式で出力:

#### A. まとめプリント
```
入力: 字幕テキスト + テーマ
出力:
  - タイトル
  - 要点（箇条書き5〜10項目）
  - 重要用語リスト
  - 図表の説明（テキストベース）
  - 参考動画URL
```

#### B. 4択クイズ
```
入力: 字幕テキスト + テーマ
出力:
  - 問題文（5〜10問）
  - 選択肢A〜D
  - 正解
  - 解説（1〜2文）
```

#### C. 穴埋めワークシート
```
入力: まとめプリントの要点
出力:
  - 重要語句を（　）に変換した文章
  - 解答欄
```

### 2.5 出力 & 表示
- 画面上でプレビュー表示
- PDF出力（A4サイズ、印刷最適化）
- コピー用テキスト出力

---

## 3. 技術スタック

### フロントエンド
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** コンポーネント

### バックエンド
- **Next.js API Routes** (Route Handlers)
- **Node.js 22+**

### AI / API
- **YouTube Data API v3**: 動画検索
- **youtube-transcript-api** (Python) or **youtubei.js** (Node): 字幕取得
- **Gemini Embedding 2** (`gemini-embedding-exp-03-07`): テキストベクトル化
- **Claude API** or **Gemini API**: 教材テキスト生成
- **@react-pdf/renderer** or **jsPDF**: PDF生成

### データベース
- **Supabase** (PostgreSQL + pgvector)
  - ユーザー管理
  - 生成履歴
  - 動画Embeddingキャッシュ

### 認証
- **Supabase Auth** (メール + Google OAuth)

### ホスティング
- **Vercel** (フロントエンド + API Routes)
- **Supabase** (DB + Auth)

---

## 4. データフロー

```
[ユーザー]
    │
    ▼ テーマ入力 (例: "中2 一次関数")
[Next.js API Route: /api/search]
    │
    ├─▶ YouTube Data API v3 検索 → 候補動画20件
    │
    ├─▶ Gemini Embedding 2
    │   ├─ テーマテキスト → ベクトル化
    │   └─ 各動画タイトル+説明 → ベクトル化
    │
    ├─▶ コサイン類似度計算 → 上位5件ランキング
    │
    ▼ おすすめ動画リスト表示
[ユーザー]
    │
    ▼ 動画を1〜3本選択 → 「教材を作成」
[Next.js API Route: /api/generate]
    │
    ├─▶ 字幕テキスト取得（YouTube Transcript API）
    │
    ├─▶ Claude/Gemini API
    │   ├─ まとめプリント生成
    │   ├─ 4択クイズ生成
    │   └─ 穴埋めワークシート生成
    │
    ▼ 教材プレビュー表示
[ユーザー]
    │
    ▼ PDF出力 / コピー / 保存
```

---

## 5. DB スキーマ（Supabase）

```sql
-- ユーザー
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  plan TEXT DEFAULT 'free', -- free / basic / pro
  generation_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 生成履歴
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  theme TEXT NOT NULL,
  grade TEXT,
  subject TEXT,
  video_ids TEXT[], -- YouTube video IDs
  summary_text TEXT,
  quiz_json JSONB,
  worksheet_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 動画Embeddingキャッシュ
CREATE TABLE video_embeddings (
  video_id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  channel_name TEXT,
  duration_sec INT,
  view_count INT,
  embedding VECTOR(768), -- Gemini Embedding 2 dimension
  transcript_text TEXT,
  cached_at TIMESTAMPTZ DEFAULT NOW()
);

-- Embedding検索用インデックス
CREATE INDEX ON video_embeddings
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

---

## 6. API エンドポイント設計

| Method | Path | 説明 |
|--------|------|------|
| POST | `/api/search` | テーマで動画検索 + Embeddingランキング |
| POST | `/api/generate` | 選択動画から教材生成 |
| GET | `/api/generations` | 生成履歴一覧 |
| GET | `/api/generations/[id]` | 生成詳細取得 |
| GET | `/api/generations/[id]/pdf` | PDF出力 |
| POST | `/api/auth/signup` | ユーザー登録 |
| POST | `/api/auth/login` | ログイン |

---

## 7. 画面構成

| 画面 | 説明 |
|------|------|
| `/` | LP（サービス紹介 + CTA） |
| `/app` | メイン画面（テーマ入力 + 動画検索結果） |
| `/app/generate` | 教材生成 + プレビュー画面 |
| `/app/history` | 過去の生成履歴一覧 |
| `/app/history/[id]` | 生成詳細 + PDF再出力 |
| `/app/settings` | アカウント設定 + プラン管理 |
| `/auth/login` | ログイン |
| `/auth/signup` | 新規登録 |

---

## 8. LLMプロンプト設計

### まとめプリント生成
```
あなたは教育のプロフェッショナルです。
以下のYouTube動画の字幕テキストから、学習塾で使えるまとめプリントを作成してください。

【テーマ】{theme}
【対象学年】{grade}
【字幕テキスト】
{transcript}

以下の形式で出力してください：
1. タイトル（1行）
2. 要点（箇条書き5〜10項目、各項目は簡潔に）
3. 重要用語リスト（用語: 説明 の形式で5〜10個）
4. この単元のポイント（2〜3文で）
```

### 4択クイズ生成
```
以下の学習内容から、4択クイズを{count}問作成してください。

【テーマ】{theme}
【学習内容】
{summary}

各問題は以下のJSON形式で出力してください：
{
  "questions": [
    {
      "question": "問題文",
      "choices": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "解説（1〜2文）"
    }
  ]
}

注意：
- 難易度は{grade}レベルに合わせる
- 選択肢は紛らわしいものを含める
- 解説は簡潔に
```

### 穴埋めワークシート生成
```
以下の要点から穴埋め問題を作成してください。
重要な用語や数値を（　）に置き換えてください。

【要点】
{summary_points}

出力形式：
- 穴埋め文（（　）を含む文章を5〜10文）
- 解答一覧
```

---

## 9. 非機能要件

- **レスポンス**: 動画検索 < 3秒、教材生成 < 15秒
- **同時接続**: 100ユーザーまで（Vercel標準プラン）
- **データ保持**: 生成履歴は6ヶ月保持
- **セキュリティ**: Supabase RLS有効、APIキーはサーバーサイドのみ

---

## 10. Phase 2 以降の拡張

- [ ] Whisperフォールバック（字幕なし動画対応）
- [ ] 教育系チャンネルホワイトリスト
- [ ] テンプレートカスタマイズ（塾ロゴ、フォント変更）
- [ ] 生徒別レコメンド（間違えた問題 → 類似テーマ動画推薦）
- [ ] Googleドキュメント連携出力
- [ ] LINE通知（教材完成通知）
- [ ] 動画の正確性チェック機能

---

## 11. 開発タスク（MVP）

### Sprint 1（Week 1-2）: 基盤構築
- [ ] Next.js + Tailwind + shadcn/ui セットアップ
- [ ] Supabase プロジェクト作成 + DB スキーマ適用
- [ ] 認証（Supabase Auth）実装
- [ ] YouTube Data API v3 連携

### Sprint 2（Week 3-4）: コア機能
- [ ] Gemini Embedding 2 連携
- [ ] コサイン類似度計算 + ランキングロジック
- [ ] 字幕テキスト取得機能
- [ ] 動画Embeddingキャッシュ

### Sprint 3（Week 5-6）: 教材生成
- [ ] LLMプロンプト実装（まとめ / クイズ / 穴埋め）
- [ ] 教材プレビューUI
- [ ] PDF出力機能

### Sprint 4（Week 7-8）: 仕上げ
- [ ] 生成履歴管理
- [ ] LP作成
- [ ] プラン制限ロジック（月N回制限）
- [ ] テスト + バグ修正
- [ ] デプロイ
