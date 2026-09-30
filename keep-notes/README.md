# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


# Keep Notes

Ek simple notes app (Google Keep jaisa) jo React + Vite me bana hai.

## Features

- Naya note likhna (title + text)
- 6 colors me se note ka color chunna
- Note ko pin karna, delete karna, ya click karke edit karna
- Search bar se notes dhundhna
- Notes browser me save rehte hain (localStorage), refresh karne par bhi gayab nahi hote
- Mobile par bhi sahi dikhta hai, aur dark mode support hai

## Files

| File | Kaam |
| --- | --- |
| `index.jsx` | Poori app ka code (components + page mount) |
| `index.css` | Poora design aur styling |

## Requirements

- Windows / Mac / Linux
- [Node.js](https://nodejs.org) (LTS version)
- VS Code (ya koi bhi code editor)

## Setup (step by step)

### Step 1: Node.js check karo

VS Code me terminal kholo (`Ctrl + ~`) aur ye chalao:

```bash
node -v
npm -v
```

Dono me version number aana chahiye. Agar error aaye to pehle [nodejs.org](https://nodejs.org) se Node.js install karo, phir VS Code band karke dobara kholo.

### Step 2: Vite project banao

Folder ke naam me **space nahi** hona chahiye. Isliye `keep-notes-app` jaisa naam use karo.

```bash
cd D:\git
npm create vite@latest keep-notes-app -- --template react
```

Agar koi sawal pooche (jaise "Use rolldown-vite?" ya "Install with npm and start now?"), to **No** chuno.

### Step 3: Project folder me jao aur packages install karo

```bash
cd keep-notes-app
npm install
```

Ye `node_modules` folder banayega aur `package.json` wala error nahi aayega.

### Step 4: Keep Notes ki files lagao

1. `index.jsx` aur `index.css` ko `keep-notes-app\src\` folder me copy karo. Template ki purani `index.css` replace ho jayegi.
2. `src\` folder se ye 3 files delete kar do:
   - `main.jsx`
   - `App.jsx`
   - `App.css`
3. `keep-notes-app\index.html` kholo aur ye line dhundo:

   ```html
   <script type="module" src="/src/main.jsx"></script>
   ```

   Usko aise badal do:

   ```html
   <script type="module" src="/src/index.jsx"></script>
   ```

Us file me `<div id="root"></div>` pehle se hoti hai. Usko mat hatana.

### Step 5: App chalao

```bash
npm run dev
```

Terminal me is tarah ka link aayega:

```
Local: http://localhost:5173/
```

Us link par `Ctrl + Click` karo. App browser me khul jayegi.

## Use kaise kare

1. **Note likhne ke liye:** upar "Take a note…" par click karo, title aur text likho, color chuno, phir "Save note" dabao.
2. **Pin karne ke liye:** note par mouse le jao aur "Pin" dabao. Pinned notes sabse upar "Pinned" section me aate hain.
3. **Edit karne ke liye:** note par click karo, badlav karo, phir "Save changes" dabao.
4. **Color badalne ke liye:** note par mouse le jao aur neeche ke color dots me se koi chuno.
5. **Delete karne ke liye:** note par mouse le jao aur "Delete" dabao.
6. **Dhundhne ke liye:** upar search bar me koi bhi word likho.

## Band kaise kare

Terminal me `Ctrl + C` dabao.

## Dobara chalana ho to

```bash
cd D:\git\keep-notes-app
npm run dev
```

## Production build (website upload karne ke liye)

```bash
npm run build
```

Ye `dist` folder banayega. Usko Netlify, Vercel ya kisi bhi hosting par upload kar sakte ho.

## Common errors aur solution

| Error | Wajah | Solution |
| --- | --- | --- |
| `ENOENT ... package.json` | Galat folder me `npm install` ya `npm run dev` chala | `cd D:\git\keep-notes-app` karke chalao |
| `node is not recognized` | Node.js install nahi hai | Node.js install karo aur VS Code restart karo |
| Blank white page | `index.html` me `/src/main.jsx` badla nahi | Step 4 ka point 3 dobara dekho |
| `Failed to resolve import "./App.jsx"` | Purani `main.jsx` abhi bhi `src` me hai | `main.jsx`, `App.jsx`, `App.css` delete karo |
| Port 5173 already in use | Pehle se ek server chal raha hai | Purana terminal band karo, ya naya port lene do |

## Aage kya jod sakte ho

- Archive aur Trash
- Labels / tags
- Login aur backend (taaki notes kisi bhi device par dikhen)