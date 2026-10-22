The Briech UAS website, built with Next.js App Router, TypeScript, and Tailwind CSS.

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

The homepage is in `src/app/page.tsx`. Navigation and hero components are in `src/components`, with styles in `src/app/globals.css`.

The supplied logos are in `assets/`, with browser-ready light and dark copies and a hero poster in `public/assets/`. Both hero players stream the external URL configured in `src/components/hero.tsx`. Drone studio videos are supplied in `assets/video/`; served copies and poster frames are in `public/assets/drones/`. Videos respect reduced motion and the drone videos pause when off screen. Damisa uses its official photograph until studio footage is supplied.

Fleet and About us link to local homepage sections. The Fleet panel and Learn More buttons open `/argini`, `/arsenio`, `/xander`, `/bfly`, and `/damisa`. Other destinations use the current Briech website or an email inquiry. Menu content is in `src/lib/navigation.ts`; published specifications, source URLs, and drone media paths are in `src/lib/drones.ts`.

Run `npm run build` to verify the production build, then `npm start` to serve it.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
