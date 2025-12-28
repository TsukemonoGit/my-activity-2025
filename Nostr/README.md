# Nostr Activity Analysis Tools

このディレクトリには、2025年のNostr活動データを取得・分析するためのスクリプトが含まれています。

## 📋 ファイル構成

- **`fetch_nostr.js`**: 指定した公開鍵の2025年分のテキスト投稿（kind 1）を月ごとに分けて取得し、`nostr_activity.json` に保存します。
- **`fetch_engagement.js`**: 公開鍵に対するリアクション、リポスト、Zap（kind 6, 7, 9735）を取得し、`nostr_engagement.json` に保存します。
- **`analyze_engagement.js`**: 取得した投稿とエンゲージメントを紐付け、各月で反響の大きかった投稿を `nostr_viral_insights.json` に抽出します。
- **`convert_npubs.js`**: `npub` 形式の公開鍵を16進数（hex）形式に変換するためのユーティリティです。

## 🚀 使い方

### 1. セットアップ
初回実行前に依存関係をインストールしてください。
```bash
npm install
```

### 2. 自分用にカスタマイズ
`config.js` を開き、自分の公開鍵（hex形式）と、使用したいリレーを設定してください。
環境変数 `NOSTR_PUBKEYS` や `NOSTR_RELAYS` でも上書き可能です。

### 2. コンフィグ設定
取得対象のリレーや公開鍵は `Nostr/config.js` で管理しています。
直接ファイルを編集するか、環境変数で上書きすることが可能です。

- **`NOSTR_RELAYS`**: カンマ区切りのリレーURLリスト
- **`NOSTR_PUBKEYS`**: カンマ区切りの公開鍵（hex）リスト

### 3. データの取得
まず、テキスト投稿とエンゲージメントデータを取得します。
```bash
node fetch_nostr.js
node fetch_engagement.js
```

### 3. 分析の実行
取得したデータを元に、統計と「バズった投稿」の分析を行います。
```bash
node analyze_engagement.js
```

## 📊 出力データ
分析結果は [nostr_summary_2025.md](../Nostr/nostr_summary_2025.md) およびルートディレクトリの [2025年 活動全史（Master Chronicle）](../TsukemonoGit_2025_Master_Chronicle_JP.md) に反映されています。
