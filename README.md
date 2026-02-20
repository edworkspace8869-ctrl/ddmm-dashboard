# Parliament — Decision Dashboard

A personal PWA for your Delayed Decision-Making Mechanism.

## Files

```
index.html      ← The entire app (single page)
manifest.json   ← PWA manifest
sw.js           ← Service worker (offline support)
icon-192.png    ← PWA icon (you need to add this)
icon-512.png    ← PWA icon (you need to add this)
```

## Deploy to GitHub Pages

1. Create a new **public** GitHub repository (e.g. `parliament`)
2. Upload all files into the repo root
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your app will be live at `https://yourusername.github.io/parliament/`

> **Important**: Update the `"start_url"` in `manifest.json` if your repo is not at the root domain.  
> e.g. if hosted at `/parliament/`, change `"start_url": "/"` to `"start_url": "/parliament/"` and update the service worker ASSETS paths accordingly.

## Icons

You need two PNG icons for the PWA to install properly:
- `icon-192.png` — 192×192px
- `icon-512.png` — 512×512px

You can generate them from any image at https://realfavicongenerator.net or similar.

## Features

- ✅ Multiple decisions with full history & archive
- ✅ General weight (Blue/White coalition) per decision
- ✅ Fully editable categories per decision
- ✅ Stepper + direct input for all weights
- ✅ Export / Import JSON for backup & transfer
- ✅ PWA — installable, works offline
- ✅ All data stored in localStorage (private, no server)
