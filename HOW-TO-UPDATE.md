# casadique.com: how to update and host your website

## What's in the folder

| File / folder | What it is | Do you edit it? |
|---|---|---|
| `js/content.js` | **All your text, services, videos, blogs and notes** | **Yes, this is the only file you edit** |
| `images/profile.jpg` | Your photo (add it yourself) | Replace with your photo |
| `notes/` | PDF notes you want visitors to download | Drop PDFs here |
| `index.html`, `post.html`, `css/`, `js/main.js` | Site design and logic | No |

Open `js/content.js` in **Notepad** (right-click, then *Open with*, then *Notepad*) or, better, the free **VS Code** editor.

---

## Everyday updates

### Add a YouTube video
Copy one block inside `videos: [ ... ]`, paste it, and change it:
```js
{ title: "Section 194T explained",
  url: "https://youtu.be/abc123XYZ00",
  category: "Income Tax",
  description: "TDS on payments to partners." },
```
The thumbnail and player appear automatically. Any new `category` name becomes a filter button.

### Add a blog
**Write it on your site:**
```js
{ id: "advance-tax-dec",            // short name, no spaces, must be unique
  title: "Advance tax: December instalment",
  date: "2026-12-01",               // YYYY-MM-DD
  category: "Income Tax",
  summary: "One or two lines shown on the card.",
  body: `
    <p>First paragraph.</p>
    <h2>A sub-heading</h2>
    <p>Another paragraph.</p>
    <ul><li>Bullet point</li></ul>
  ` },
```
**Already published on LinkedIn, Medium or Blogger?** Use `link: "https://..."` instead of `body`.

Blogs are sorted newest first automatically.

### Add notes (PDF)
- **Option A (small PDFs, under about 10 MB):** copy the PDF into the `notes` folder and use `url: "notes/file-name.pdf"`. Use file names without spaces.
- **Option B (big files, or many files):** upload to Google Drive, set sharing to *Anyone with the link*, and paste that link as the `url` (add `type: "PDF"`).

### Common mistakes
- Each `{ ... }` block needs a **comma** after it.
- Keep the quotes `" "` around text. If your text contains a `"`, use `'` instead.
- If the page goes blank after an edit, a comma or quote is usually missing. Undo your last change.

---

## Where the site is hosted

- **Domain:** casadique.com is registered at **GoDaddy** (renew it there every year).
- **Hosting:** free on **GitHub Pages**. GoDaddy DNS points the domain to GitHub.
- The `CNAME` file in this folder tells GitHub your domain name. Keep it and don't edit it.

### To update the site (after editing `content.js` or adding PDFs)
1. Sign in at **github.com** and open your website repository.
2. Click **Add file, then Upload files**.
3. Drag in the changed files. For example, drag the `js` folder (it contains `content.js`) or the `notes` folder with new PDFs. Files with the same name are replaced.
4. Click **Commit changes**. The live site updates within 1 to 2 minutes. Press Ctrl+F5 to refresh.

Limits: each file can be at most **25 MB** through the website upload. Put bigger PDFs on Google Drive.

### GoDaddy DNS records (for reference; already set up once)
| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-GITHUB-USERNAME.github.io |

---

## Professional-conduct checklist (ICAI)
ICAI allows members and firms to have websites, but under its **Guidelines for Website of Members/Firms** and the Code of Ethics. Before going live, check the current guidelines on icai.org. In general:
- No client names, client logos or testimonials.
- No claims of being the "best" or "leading", and no comparisons with other CAs.
- No fee or price lists used to solicit work.
- Keep the information factual: name, qualifications, services, contact details and educational content.
- Show the disclaimer in the footer (already included).

The design deliberately leaves out testimonials and client sections for this reason.

---

## Optional next steps
- **Professional email** (info@casadique.com): GoDaddy/Microsoft 365 or Zoho Mail (Zoho has a free plan). Add their MX records in GoDaddy DNS.
- **Google Search Console**: submit casadique.com so Google lists it faster.
- **Google Business Profile**: helps local clients find your office on Maps.

---

## Other pages
- **Service pages** (`services/*.html`): one page per service. Edit the text directly in each file if needed.
- **Privacy Policy** (`privacy.html`) and **Thank-you page** (`thank-you.html`, shown after the contact form is sent).
- **Contact form**: messages go to info@casadique.com through FormSubmit (free). The very first message triggers an activation email from FormSubmit to info@casadique.com. Click the link in it once to start receiving messages.
- **Videos / Blogs / Notes** sections hide themselves automatically until you add at least one item in `js/content.js`.
- `sitemap.xml` and `robots.txt` help Google find the pages. Add new page addresses to `sitemap.xml` when you create them.
