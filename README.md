# Portfolio — alan-911.github.io/my-portfolio

Personal site for **Yves Alain Iragena** — Full-Stack AI Engineer and Graduate
Research Assistant at the Multimodal AI Lab (MAIL), Catholic University of America.

**[Visit the site →](https://alan-911.github.io/my-portfolio/)**

## What this is

A hand-written static site. No framework, no build step, no dependencies to
install — three files and a deploy workflow:

| File | Purpose |
|------|---------|
| `index.html` | All content and structure |
| `style.css` | Design system, layout, responsive rules, print styles |
| `script.js` | Scroll reveals, sticky nav, mobile menu, project filters |
| `.github/workflows/pages.yml` | Deploys `main` to GitHub Pages on push |

Fonts come from Google Fonts and icons from Font Awesome, both over CDN.
Everything else is local.

## Running it locally

There is nothing to build. Open `index.html` in a browser, or serve the folder
so that relative paths behave exactly as they do in production:

```bash
git clone https://github.com/Alan-911/my-portfolio.git
cd my-portfolio
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploying

Push to `main`. The GitHub Actions workflow uploads the repository root as a
Pages artifact and publishes it. No other step is needed.

## Editing the content

- **Projects** live in the `#work` section as `<article class="card" data-cat="...">`
  blocks. `data-cat` must be one of `research`, `agents`, `fullstack` or `data` so
  the filter buttons pick it up — and the counts in `.filters` are written by hand,
  so update them when you add or remove a card.
- **Scroll reveals** are opt-in: add `class="reveal"` to any element. Elements
  already on screen are shown immediately, and a failsafe reveals everything
  2.5s after load, so a card cannot get stuck invisible.
- **Résumé**: replace `Resume_Yves_Iragena_v7.pdf` and update the two download
  links in `index.html`.
