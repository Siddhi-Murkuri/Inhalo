# Inhalo Website (Static POC)

If you're new, start here 👋

## What this is
This is a simple 2-page **visual prototype** for the redesigned **Inhalo** inhaler:
- **Device Settings** (`index.html`)
- **Emergency Contacts** (`contacts.html`)

## Important: POC behavior
This is intentionally a **non-functional model/demo**:
- No real Bluetooth device sync is required.
- No real SMS is sent.
- Emergency alert is simulated in the UI only.

## Run locally
### Option 1: Open files directly
- Open `index.html` in your browser.
- Use top navigation to open `contacts.html`.

### Option 2: Run a tiny local server
```bash
cd /workspace/Inhalo
python3 -m http.server 4173
```
Then open:
- `http://localhost:4173/index.html`
- `http://localhost:4173/contacts.html`

## Deploy as static website on Render
Since this is static-only, use **Render Static Site** (not Web Service).

1. Push this project to GitHub.
2. In Render click **New +** → **Static Site**.
3. Connect your GitHub repo.
4. Use these settings:
   - **Build Command**: *(leave empty)*
   - **Publish Directory**: `.`
5. Deploy.

Your pages will be available at:
- `https://<your-render-site>/index.html`
- `https://<your-render-site>/contacts.html`

## Notes
- Contacts are saved in browser `localStorage` for demo purposes.
- The emergency button is a simulation preview only.
