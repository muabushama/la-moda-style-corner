# LA MODA STYLE CORNER

Frontend-only fashion boutique demo. No database, backend, API keys, or payments.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Default language is Arabic (RTL). Switch to English from the header.

Demo coupon: `LAMA10` (10% off).  
Demo login: use **Continue with demo account** on `/login`.

## Production build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this project to GitHub.
2. Open Vercel and import the repository.
3. Keep the Next.js framework preset.
4. Deploy (no environment variables required).
5. Open the live URL and test cart, language switch, and checkout.

All catalog data lives in `src/data`. Cart, wishlist, language, demo session, and demo orders use `localStorage` in the browser.
