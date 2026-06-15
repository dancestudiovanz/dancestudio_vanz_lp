<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5eccab6e-deb2-4913-9062-5de64e19e126

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and set values:
   - `VITE_MEMBER_BOARD_URL` … GAS Webアプリの URL（会員専用掲示板）
3. Run the app:
   `npm run dev`

## 会員専用掲示板（LP 連携）

ヘッダーの「会員専用掲示板」から `#member-board` ページへ遷移し、GAS Webアプリを iframe で表示します。

### Vercel 本番環境

1. [Vercel](https://vercel.com) → プロジェクト → **Settings** → **Environment Variables**
2. 変数を追加:
   - **Name:** `VITE_MEMBER_BOARD_URL`
   - **Value:** GAS の Webアプリ URL（`https://script.google.com/macros/s/.../exec`）
   - **Environment:** Production（Preview も使う場合は同様に追加）
3. **Deployments** から **Redeploy**（環境変数反映のため再デプロイ必須）

GAS のセットアップ・スプシ投稿方法は [`gas/README.md`](gas/README.md) を参照してください。

