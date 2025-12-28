# Yearly Activity Analysis 2025

このプロジェクトは、GitHub および Nostr での活動を収集・分析し、年報としてまとめるためのツールセットです。
デフォルトでは TsukemonoGit (mono) のデータに基づいたレポートが含まれていますが、コンフィグを書き換えることで**誰でも自分自身の活動レポートを生成することが可能**です。

## 📊 活動レポート

2025年の活動成果は以下のドキュメントにまとめられています：

- **[2025年 活動全史 (Master Chronicle)](./TsukemonoGit_2025_Master_Chronicle_JP.md)**  
  GitHub のコントリビューションと Nostr のエンゲージメント、月ごとのハイライトを統合した完全版レポートです。
- **[2025年 エグゼクティブ・サマリー](./TsukemonoGit_2025_Executive_Summary_JP.md)**  
  主要な実績と社会的インパクトを簡潔にまとめた改訂版サマリーです。
- **[2025年 GitHub 活動詳細](./TsukemonoGit_2025_Review_JP_Full.md)**  
  コミット数、PR、Issue など、GitHub でのエンジニアリング活動に特化した詳細レポートです。
- **[Nostr 活動詳細ディレクトリ](./Nostr/)**  
  Nostr での 10,000 件を超えるエンゲージメント分析と月次サマリーを含むデータ収集用ディレクトリです。

## 🛠️ プロジェクト構造

### ルートディレクトリ
- **`fetch_activity.js`**: GitHub GraphQL API を使用して活動データを取得するためのスクリプト。
- **`summarize_activity.js`**: 取得した GitHub データを分析し、レポートを生成するスクリプト。
- **`how_to_prompt.md`**: AI を活用して活動報告を生成するためのプロンプトガイド。

### [Nostr ディレクトリ](./Nostr/)
Nostr のデータ取得・分析用スクリプト群です。詳細は [Nostr/README.md](./Nostr/README.md) を参照してください。

## 🚀 セットアップ

### 設定のカスタマイズ
ルートディレクトリの `config.js` を編集することで、取得対象のユーザーや年を変更できます。

- `GITHUB_USER_NAME`: GitHub のユーザー名
- `GITHUB_YEAR`: 対象とする年

### 環境変数
GitHub データの取得には、以下の環境変数が必要です。`.env.sample` を `.env` にコピーして設定してください：

- `GITHUB_TOKEN`: GitHub の Personal Access Token
- `GITHUB_USER_NAME`: (任意) GitHub のユーザー名
- `YEAR`: (任意) 対象とする年

### 実行手順
1. 依存関係のインストール
   ```bash
   npm install
   ```
2. データの取得と分析
   ```bash
   node fetch_activity.js
   node summarize_activity.js
   ```

---
*2025年の活動記録を、未来の自分とコミュニティのために。*
