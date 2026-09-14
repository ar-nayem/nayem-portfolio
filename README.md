# Nayem's Portfolio Website

A modern, dark-themed portfolio website built with Next.js, React, and Tailwind CSS. Showcasing Project Management and International Operations expertise with a dark elegant design and gold accents.

## Features

- Dark elegant theme with gold accents
- Fully responsive, mobile-first layout
- Framer Motion scroll animations
- Multi-section single page: Hero, About, Work, Services, Contact, Footer
- Contact form with client-side validation
- Social links: LinkedIn, GitHub, Facebook, Instagram

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout + metadata
│   │   ├── page.tsx          # Combines all sections
│   │   └── globals.css       # Theme tokens + animations
│   └── components/
│       ├── Header.tsx        # Nav, mobile menu, language toggle
│       ├── Hero.tsx          # Hero section
│       ├── About.tsx         # Bio, stats, skills, languages
│       ├── Work.tsx          # Projects grid
│       ├── Services.tsx      # Services grid
│       ├── Contact.tsx       # Contact form + info
│       └── Footer.tsx        # Footer
├── public/                   # Static assets
└── package.json
```

## Customization

### Colors
Edit the tokens in `src/app/globals.css` (`:root` and `@theme inline`):
```css
--color-dark-primary: #1a1a1a;
--color-dark-secondary: #2a2a2a;
--color-dark-border: #404040;
--color-gold: #d4af37;
--color-gold-light: #e5c158;
--color-gold-dark: #c9a961;
```

### Content
- **Hero**: `src/components/Hero.tsx` — headline, tagline, socials
- **About**: `src/components/About.tsx` — bio, `STATS`, `SKILLS`, `LANGUAGES`
- **Projects**: `src/components/Work.tsx` — edit the `PROJECTS` array
- **Services**: `src/components/Services.tsx` — edit the `SERVICES` array
- **Contact info**: `src/components/Contact.tsx` and `src/components/Footer.tsx`

### Professional Photo
Replace `public/profile-placeholder.svg` with a real photo and update the `src` in `src/components/Hero.tsx`. Drop the `unoptimized` prop once it's a raster image (jpg/png/webp).

## Site Metadata
Edit `src/app/layout.tsx` for title, description, keywords, author, and Open Graph tags. Update `siteUrl` when the domain is live.

## Contact Form

Currently logs submissions to the browser console (`src/components/Contact.tsx`). To send real emails:

1. Pick an email service (Resend, SendGrid, Mailgun, etc.)
2. Add an API route (e.g. `src/app/api/contact/route.ts`) that calls the service
3. Store the API key in `.env.local`:
   ```
   RESEND_API_KEY=your_api_key
   ```
4. Replace the `console.log` in `handleSubmit` with a `fetch` call to that route

## Deployment on Vercel

```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

Then on [vercel.com](https://vercel.com): New Project → select the repo → Deploy. Add a custom domain (e.g. `arnayem.top`) under Settings → Domains once deployed.

## Next Steps

1. Add a real professional photo
2. Fill in real project details in `Work.tsx`
3. Add a resume PDF to `public/` and link it from About
4. Wire up the contact form to an email service
5. Deploy to Vercel and point the custom domain
6. Add analytics (e.g. Google Analytics)

## Contact

- Email: nayem3622@gmail.com
- WhatsApp: +880 1817535007
- LinkedIn: https://www.linkedin.com/in/ar-nayem-04b53126b/

## License

MIT — feel free to fork and adapt for your own portfolio.
