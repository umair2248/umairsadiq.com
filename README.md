# Umair Sadiq — Portfolio

One-page portfolio built with Next.js (App Router), TypeScript, and a React Three Fiber hero scene.

## Run it

```bash
npm install      # only needed once, or after changing dependencies
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Edit your details

Everything personal lives in **`src/data/site.ts`**:

| What | Where |
| --- | --- |
| Live domain (SEO, sitemap, social previews) | `profile.siteUrl` |
| Email, phone, WhatsApp, LinkedIn, GitHub, CV | `contact` |
| Services, skills, process steps | `services`, `skillGroups`, `processSteps` |
| Projects: description, tags, URL, screenshot | `projects` |

- **Project screenshots:** put images in `public/projects/` (e.g. `public/projects/visiventro.webp`, 1600 × 1000) and set `image: "/projects/visiventro.webp"`. With `image: ""`, a designed placeholder is shown instead.
- **Project links:** set `url`. An empty URL hides the "Visit website" link.
- **CV:** put your PDF at `public/cv/umair-sadiq-cv.pdf`, or point `contact.cv` to a hosted file.

## Contact form

The form validates input and then opens the visitor's email app with the message filled in, addressed to `contact.email`. **Nothing is sent to a server.** To receive submissions directly, connect a form service (Formspree, Web3Forms, etc.) or a Next.js route handler in `src/components/ContactForm.tsx`.

## Note about this machine's setup

C: was out of space during setup, so `node_modules` and `.next` are **directory junctions to `D:\umair-portfolio-deps\`**. Because of that:

- The npm scripts run Next.js with `--preserve-symlinks`, using webpack (Turbopack can't follow a junction to another drive), and `next.config.ts` keeps junction paths unresolved.
- `npm install` can replace the `node_modules` junction with a real folder on C:. If that happens and space is tight, move the folder back to `D:\umair-portfolio-deps\node_modules` and recreate the junction:
  `cmd /c mklink /J node_modules D:\umair-portfolio-deps\node_modules`
- If you move the project to a drive with enough space, you can delete the junctions, run `npm install`, and use the plain `next dev` / `next build` commands again.

## Deploy to Hostinger (umairsadiq.com)

**One command (recommended):** fill in `.env.deploy` once with your FTP details (hPanel → Files → FTP Accounts), then:

```bash
npm run deploy        # build + upload to public_html over FTP
npm run deploy:only   # upload the existing out/ without rebuilding
npm run preview       # preview the built site at http://localhost:3000
```

**Manual alternative:**

The site is a **static export** (`output: "export"` in `next.config.ts`), so it runs on any shared hosting with no Node.js server.

1. `npm run build` → creates the `out/` folder (plain HTML/CSS/JS, plus `.htaccess` from `public/`).
2. Zip the **contents** of `out/` (not the folder itself), including the hidden `.htaccess`.
3. hPanel → **Files → File Manager** → open `public_html` → delete the default files there (e.g. `default.php`) → **Upload** the zip → right-click → **Extract** into `public_html` → delete the zip.
4. To update the site later: edit, `npm run build` again, and upload the new `out/` contents over the old ones.

Note: with static export, `npm run start` no longer works. To preview a build locally, serve the `out/` folder, e.g. `python -m http.server 3000` inside `out/`, or just use `npm run dev`.
