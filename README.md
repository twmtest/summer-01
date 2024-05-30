This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



```
summer-01
├─ .eslintrc.json
├─ next-env.d.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ src
│  └─ app
│     ├─ api
│     │  ├─ auth
│     │  ├─ SearchImage
│     │  │  └─ route.ts
│     │  ├─ SelectImage
│     │  │  └─ route.ts
│     │  ├─ UploadImage
│     │  │  └─ route.ts
│     │  └─ UserImage
│     │     └─ route.ts
│     ├─ Components
│     │  ├─ Search.tsx
│     │  ├─ Spinner.tsx
│     │  └─ Upload.tsx
│     ├─ context
│     │  ├─ client-provider.tsx
│     │  └─ search-provider.tsx
│     ├─ image
│     │  └─ [imageId]
│     │     └─ page.tsx
│     ├─ layout.tsx
│     ├─ lib
│     │  ├─ auth.ts
│     │  ├─ db.ts
│     │  └─ session.ts
│     ├─ Login
│     │  └─ page.tsx
│     ├─ MyPictures
│     │  └─ page.tsx
│     ├─ page.tsx
│     ├─ SearchImages
│     │  └─ page.tsx
│     ├─ SearchPictures
│     │  └─ page.tsx
│     ├─ types
│     │  ├─ next-auth.d.ts
│     │  ├─ uploadDatabase.ts
│     │  └─ user.ts
│     ├─ ui
│     │  ├─ global.css
│     │  └─ TopBar.tsx
│     └─ User
│        └─ page.tsx
├─ tailwind.config.ts
└─ tsconfig.json

```