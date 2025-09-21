# Portfolio (Astro + Tailwind)

Clean, simple personal portfolio scaffold with:

- Astro 4
- Tailwind CSS
- Cal Sans for headings, Roboto for body
- Content collections for Newsletter (`articles`) and Projects (`projects`)
- Pages: Home, About, Contact, Projects, Articles, and dynamic detail routes

## Quickstart

Install dependencies and run the dev server:

```sh
npm install
npm run dev
```

Then open the local URL shown (typically http://localhost:4321).

## Structure

- `src/layouts/BaseLayout.astro` – shared layout with header/footer
- `src/styles/global.css` – Tailwind base and custom styles
- `src/styles/fonts.css` – imports Cal Sans and Roboto
- `src/content/config.ts` – defines `articles` and `projects` collections
- `src/content/articles/*` – newsletter posts (Markdown)
- `src/content/projects/*` – portfolio entries (Markdown)
- `src/pages/*` – routes

## Editing content

Add new newsletter posts in `src/content/articles/your-post.md` and projects in `src/content/projects/your-project.md`. Frontmatter examples are in the sample files.

## Notes

- Fonts are loaded from Google Fonts (Roboto) and Cal.com CDN (Cal Sans). You can self-host later if you prefer.
- Tailwind is configured with `font-display` for Cal Sans and `font-sans` for Roboto.

## Deploy

Run a production build and preview locally:

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` to your host of choice.