# Alejandro Bernabeu — portfolio

Static portfolio ready for Cloudflare Pages. All public assets are in `public/`. No framework, dependencies, API keys, or build step are required.

## Recommended deployment: GitHub integration

1. Create a GitHub repository named `aberdur-portfolio` under your account. Either private or public is supported by Cloudflare Pages.
2. Upload the extracted contents of this package: keep the `public/` directory and this README at the repository root. Do not upload this ZIP as a single file.
3. In Cloudflare, open Workers & Pages, create a Pages application and connect the GitHub repository.
4. Use these settings:

| Setting | Value |
| --- | --- |
| Project name | `aberdur` |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `public` |
| Root directory | Leave empty |
| Environment variables | None |

5. Save and deploy. Cloudflare confirms the actual project URL. The requested URL is `https://aberdur.pages.dev`; availability has not been confirmed.

If Cloudflare assigns another name, update the canonical and Open Graph URLs in `public/index.html` to match the returned production URL.

## Alternative: Direct Upload

To publish without GitHub, create a Pages application with Direct Upload and upload the contents of `public/` (or drag the folder), using project name `aberdur`. Do not upload the whole source package as the deployment ZIP: its top-level folder contains `public/`, rather than `index.html`.

Cloudflare does not let Direct Upload projects switch to native Git integration later. A new project would be required. Git integration is recommended for future updates.

## Editing

- `public/index.html`: profile, experience, contributions, education and contact.
- `public/app.js`: projects, project dialogs, recruiter summary and filters.
- `public/style.css`: appearance and responsive layout.
- `public/portrait.js`: ASCII avatar sampling and animation lifecycle.
- `public/portrait-physics.mjs`: entrance scatter and cursor interaction.
- `public/assets/Alejandro_Bernabeu_CV.pdf`: English CV.

Email and LinkedIn links are real; no backend contact form is needed. The avatar and fonts are locally hosted. Keep `public/assets/OFL.txt` with the fonts.

The existing ChatGPT Sites publication is independent of this Cloudflare export.
