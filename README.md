# Portfolio: Jayateertha Handigol

**Live:** https://jayateertha-portfolio.vercel.app (Vercel, redeploys automatically on every push to `main`)

A single-page portfolio built with React 19 and Vite 7. All text lives in `src/data/profile.js`; the components only lay it out.

## Run it

```bash
cd Portfolio
npm install
npm run dev        # http://localhost:5173
npm run build      # production files in dist/
```

## Before you publish: fill these in `src/data/profile.js`

- `problemSolving.rating`: your exact LeetCode contest rating (the card is hidden until you set it).
- `otherProjects[0].repo`: GitHub link for the Medical Record Management System.
- `profile.resumeUrl`: export your resume to PDF, save it as `public/Jayateertha_Handigol_Resume.pdf`, then set `resumeUrl: "/Jayateertha_Handigol_Resume.pdf"`. The button appears once this is set.

## Deployment

Deployed on Vercel (project `jayateertha-portfolio`), connected to this GitHub repo. Push to `main` and Vercel builds (`npm run build`, output `dist`) and publishes automatically. Manual deploy if ever needed: `npx vercel --prod`.

## Structure

```
src/
  data/profile.js        all content: edit this
  components/            one component per section
    Hero.jsx             name, headline and a JSON "response" card
    Featured.jsx         one project case study (used for both projects)
    Architecture.jsx     microservices diagram (gateway, Eureka, config, 7 services)
    RequestTrace.jsx     one registration request, microservices vs monolith
    Skills.jsx           skills, "currently learning", problem solving
  styles.css             design tokens (light and dark) and layout
```

Keep the rule from your resume: only list what you have built and can explain.
