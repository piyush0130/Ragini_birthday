# A Little Space of Her Own 🌷
> A dreamy, elegant, and interactive birthday greeting website created for **Ragini** (Birthday: **November 5, 2026**).

---

## ✨ Features & Highlights

- **Theme & Aesthetics:** "A Little Space of Her Own" — designed with a premium scrapbook aesthetic celebrating freedom, authenticity, and life's quiet magic.
- **Curated Color Palette:** Sage green, lavender, warm cream, and pastel blue with soft washi tape strips, wildflower botanical illustrations, and drifting cloud animations.
- **Section 1: Welcome Screen:** Warm greeting `"Hey, Ragini! 🌷"`, `"A little something for your special day."`, and an interactive `"Open Your Little Surprise ✨"` button with a sparkle burst.
- **Section 2: Interactive Wishes:** Three tactile keepsake cards (*A Little Adventure*, *A Little Peace*, and *A Little Happiness*) that expand into interactive modal keepsakes when tapped.
- **Section 3: Live Countdown:** Accurate live countdown to November 5, 2026 in the **Asia/Kolkata (IST)** timezone (`UTC+05:30`). On or after November 5, 2026, it gracefully celebrates with a birthday banner (`"Happy Birthday, Ragini! 🎂"`) rather than showing negative numbers.
- **Section 4: Interactive Birthday Cake:** Hand-crafted CSS/SVG cake with 3 flickering candles. Tap each candle to blow it out with a puff of smoke. Once all three are extinguished, a gentle celebratory pastel confetti shower triggers, revealing `"Make a Wish, Ragini! ✨"` along with a relight option.
- **Section 5: Personal Birthday Note:** An interactive wax-sealed envelope with a tulip stamp. Tapping the seal unseals the flap in 3D and smoothly slides out the personalized handwritten letter from Piyush.
- **Section 6: Final Screen:** Heartfelt signoff with `"Hope this little surprise made you smile. 💜"` and an `"Experience Again"` button that resets all states and smoothly scrolls back to the top.
- **Zero Dependencies:** Pure HTML5, Vanilla CSS3, and modern Vanilla JavaScript. No frameworks, no Node.js, no npm, and no build steps needed.
- **Accessibility & Performance:** Fully responsive for smartphones, tablets, and desktops. Includes touch optimizations, ARIA attributes, and respects `prefers-reduced-motion`.

---

## 📁 Repository Structure

```text
├── index.html     # Semantic HTML5 page structure and inline SVG illustrations
├── style.css      # Vanilla CSS styling, animations, scrapbook elements & layout
├── script.js      # Vanilla JavaScript for countdown, candles, envelope & modals
└── README.md      # Deployment guide and project documentation
```

All file paths are relative (`./style.css`, `./script.js`), ensuring the site works out-of-the-box when opened locally or deployed under any GitHub Pages subfolder (e.g., `https://<username>.github.io/<repo-name>/`).

---

## 🚀 How to Publish on GitHub Pages (Step-by-Step)

Follow these quick steps to host this website for free using **GitHub Pages**:

### Option A: Via the GitHub Web Interface (Easiest)

1. **Create a New Repository:**
   - Go to [github.com/new](https://github.com/new).
   - Enter a repository name (e.g. `ragini-birthday` or `a-little-space`).
   - Choose **Public**.
   - Leave "Add a README file" unchecked (since we already have one).
   - Click **Create repository**.

2. **Upload the Files:**
   - In your newly created repository page, click **uploading an existing file** (or click **Add file** > **Upload files**).
   - Drag and drop the four files:
     - `index.html`
     - `style.css`
     - `script.js`
     - `README.md`
   - In the commit message box, type: `Initial release: Ragini's Birthday Website`.
   - Click **Commit changes**.

3. **Enable GitHub Pages:**
   - Click on the **Settings** tab at the top of your repository.
   - In the left sidebar, click on **Pages** (under the "Code and automation" section).
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`.
     - **Branch**: Select `main` (or `master`) and leave the folder set to `/(root)`.
   - Click **Save**.

4. **View the Live Website:**
   - Wait 1 to 2 minutes for GitHub Actions to build and deploy.
   - Refresh the **Pages** settings screen. You will see a banner at the top:
     > *"Your site is live at `https://<your-username>.github.io/<repo-name>/`"*
   - Click the link to open Ragini's birthday website!

---

### Option B: Via Git Command Line

If you have Git installed on your computer:

```bash
# 1. Initialize git repository in this folder
git init

# 2. Add all files and commit
git add .
git commit -m "Initial release: Ragini's Birthday Website"

# 3. Create a main branch
git branch -M main

# 4. Link your remote GitHub repository
git remote add origin https://github.com/<your-username>/<repo-name>.git

# 5. Push code to GitHub
git push -u origin main
```

Then go to **Settings** > **Pages** > Select branch `main` > Save.

---

## 💻 Testing Locally

To preview or test the website on your local computer before pushing:
- Simply double-click `index.html` to open it in any modern browser (Chrome, Edge, Safari, Firefox).
- Or run any simple local HTTP server (optional), for example with Python:
  ```bash
  python -m http.server 8000
  ```
  and visit `http://localhost:8000`.

---

## 🎨 Color Palette Reference

| Swatch | Color Name | Hex Code | Purpose |
|---|---|---|---|
| 🌿 | Sage Green | `#708D79` / `#4F6B58` | Headers, botanical elements, primary gradients |
| 🪻 | Lavender | `#8E7CB5` / `#B8A9DC` | Accents, ribbons, candle sticks, subtle glows |
| 📜 | Warm Cream | `#FAF7F2` / `#FFFFFF` | Background, paper textures, postcard cards |
| ☁️ | Pastel Blue | `#6B95B8` / `#E3EEF8` | Drifting sky highlights, adventure card accent |
| ✨ | Warm Gold | `#E5A84B` / `#FFD488` | Candle glow, stars, festive highlights |

---

## 📜 Credits & Notes
- Crafted with care for **Ragini**.
- Created by **Piyush**.
- Birthday Date: **November 5, 2026**.
