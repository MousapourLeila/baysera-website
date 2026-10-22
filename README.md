# Baysera website

Marketing site for Baysera, an AI partner for small businesses that talks with you, learns your business in every conversation, and acts on what matters.

Plain HTML, CSS and a little JavaScript. No build step and no dependencies.

```
index.html                 Home: hero, how it works, questions, early-access form
service-businesses.html    Examples of client behaviour for service businesses
assets/styles.css          Design tokens and shared styles
assets/main.js             Voice waveform and early-access form submission
assets/favicon.svg
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Connect the early-access form

The form posts to a form endpoint that forwards each sign-up to your inbox. It is set up for [Formspree](https://formspree.io), which works on any static host:

1. Create a form in Formspree and set its notification email to your domain inbox (for example `hello@yourdomain.com`).
2. Copy the form ID (the part after `/f/` in the endpoint URL).
3. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` attribute.

Until this is done, submitting the form shows a "not connected yet" message instead of sending anything.

The form sends `name`, `email`, `business` and a `_subject` line, plus a hidden `_gotcha` field that catches spam bots. Any other endpoint that accepts a `multipart/form-data` POST and returns a 2xx response works the same way, for example a Netlify form or a small function on your own domain.

## Deploy

Any static host works: GitHub Pages, Netlify, Vercel or Cloudflare Pages. Publish the repository root as the site.

## Design

- Typeface: Geist (Google Fonts), light 300 for headlines.
- Colours: white background, ink `#0b0f0d`, Baysera green `#1f5a44`. All tokens are at the top of `assets/styles.css`.
- The waveform is generated in `assets/main.js` and respects reduced-motion settings.
