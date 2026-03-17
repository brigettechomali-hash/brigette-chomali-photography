# Brigette Chomali Photography — Website

## Files in this folder

```
brigette-chomali-photography/
│
├── index.html          ← The main website page
├── style.css           ← All the styling / colours / fonts
├── script.js           ← Gallery filter, lightbox, mobile menu
├── README.md           ← This file
│
└── images/
    ├── hero.jpg                ← YOUR HERO PHOTO (full screen background)
    ├── brigette-portrait.jpg   ← YOUR PORTRAIT for the About section
    ├── studio.jpg              ← STUDIO PHOTO for the Contact section
    │
    └── portfolio/
        ├── newborns/           ← Drop newborn photos here
        ├── toddlers/           ← Drop toddler photos here
        ├── maternity/          ← Drop maternity photos here
        └── family/             ← Drop family photos here
```

---

## How to add your photos

### Hero, portrait & studio photos
1. Name your hero photo exactly: `hero.jpg`
2. Name your portrait photo exactly: `brigette-portrait.jpg`
3. Name your studio photo exactly: `studio.jpg`
4. Drop them into the `images/` folder

Then open `index.html` in a text editor (Notepad, TextEdit, VS Code) and:
- Find the line: `/* background-image: url('images/hero.jpg'); */`
- Remove the `/*` and `*/` to un-comment it

### Portfolio gallery photos
1. Save your photos into the correct subfolder inside `images/portfolio/`
   - e.g. `images/portfolio/newborns/baby-emma.jpg`

2. Open `index.html` in a text editor

3. Find the section that says `<!-- ADD YOUR PHOTOS HERE -->`

4. Copy and paste one of these lines for each photo:

**For a newborn photo:**
```html
<figure class="gallery-item" data-category="newborns">
  <img src="images/portfolio/newborns/your-photo-name.jpg" alt="Newborn portrait session" loading="lazy" />
</figure>
```

**For a toddler photo:**
```html
<figure class="gallery-item" data-category="toddlers">
  <img src="images/portfolio/toddlers/your-photo-name.jpg" alt="Toddler portrait session" loading="lazy" />
</figure>
```

**For a maternity photo:**
```html
<figure class="gallery-item" data-category="maternity">
  <img src="images/portfolio/maternity/your-photo-name.jpg" alt="Maternity portrait session" loading="lazy" />
</figure>
```

**For a family photo:**
```html
<figure class="gallery-item" data-category="family">
  <img src="images/portfolio/family/your-photo-name.jpg" alt="Family portrait session" loading="lazy" />
</figure>
```

5. Change `your-photo-name.jpg` to match your actual file name.
6. Save the file. Done!

---

## Photo tips before uploading
- Export photos at **2000px on the longest edge**
- Save as **JPG at 80–85% quality**
- Use descriptive filenames: `newborn-session-nyc-001.jpg`
- Use the free tool **Squoosh** (squoosh.app) to compress photos if needed

---

## How to go live on Netlify (free)

1. Go to **netlify.com** and create a free account
2. From your Netlify dashboard, click **"Add new site" → "Deploy manually"**
3. **Drag and drop the entire `brigette-chomali-photography` folder** onto the upload area
4. Netlify will give you a temporary URL like `random-name-123.netlify.app`
5. Your site is live!

### To connect your own domain (e.g. brigettechomaliphotography.com):
1. In Netlify, go to **Site settings → Domain management → Add custom domain**
2. Follow the instructions to point your domain to Netlify

---

## How to update the site after going live

1. Make your changes locally (add photos, edit text in index.html)
2. Go back to your Netlify dashboard
3. Drag and drop the updated folder again
4. Netlify replaces the old version automatically

---

## How to view contact form submissions
- Log into **netlify.com**
- Go to your site → **Forms**
- All inquiries submitted through the website appear here
- You can also set up email notifications in Netlify settings

---

## Questions?
The HTML file has comments throughout (lines starting with `<!--`) 
that explain exactly what to change and where.
