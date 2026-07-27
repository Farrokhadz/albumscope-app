# AlbumScope

A single-page music discovery app where you can search any artist, browse their albums, view track listings, and save your favorites to a personal library — all built with **vanilla JavaScript**, no frameworks.

> 🔗 **Live Demo:** _coming soon_

---

## ✨ Features

- **Signup / Login** — dedicated onboarding flow with a draggable bottom-sheet login screen
- **Artist Search** — live search with debounce and autocomplete suggestions as you type
- **Album Discovery** — browse an artist's full discography with cover art and release years
- **Album Details** — dedicated page per album with full track listing, duration, and genre
- **Personal Library** — save/remove albums, persisted with `localStorage`
- **Profile Page** — quick stats on saved albums
- **Custom SPA Router** — client-side routing built from scratch with the History API (no React Router, no frameworks)
- **Loading / Empty / Error States** — thoughtful UX for every network request
- **Fully Responsive** — mobile-first design, tested across phone/tablet/desktop viewports

## 🛠️ Tech Stack

- **HTML5 / CSS3** — custom design system with CSS variables
- **Vanilla JavaScript (ES6+)** — no frameworks, no build tools
- **iTunes Search API** — album and track data
- **TheAudioDB API** — artist images and profiles
- **localStorage** — client-side persistence for the library feature

## 🧠 Why Vanilla JS?

This project was built without a framework on purpose — to properly learn how single-page routing, state management, and DOM manipulation work under the hood before relying on tools like React that abstract them away.

## 📂 Project Structure

```
AlbumScope/
├── index.html          # main SPA shell (Search / Library / Profile / Album)
├── login.html          # login screen (draggable bottom sheet)
├── signup.html         # signup form
│
├── css/
│   ├── style.css       # main SPA stylesheet
│   ├── login.css
│   └── signup.css
│
├── js/
│   ├── router.js        # client-side routing logic
│   ├── login.js          # login screen interactions
│   └── pages/
│       ├── search.js    # search page + live search + autocomplete
│       ├── album.js     # album detail page
│       ├── library.js   # saved albums (localStorage)
│       └── profile.js   # user profile page
│
└── image/               # static assets
```

## 🚀 Running Locally

This is a static site with no build step or dependencies.

1. Clone the repo
   ```bash
   git clone https://github.com/Farrokhadz/AlbumScope.git
   ```
2. Open the project folder in VS Code
3. Install the **Live Server** extension (if you don't have it)
4. Right-click `login.html` (the entry point) → **Open with Live Server**

That's it — no `npm install`, no build tools.

> ⚠️ Signup/Login are currently front-end only (no backend yet — see Roadmap below). Submitting the login form takes you straight into the app.

## 🗺️ Roadmap

- [ ] Backend (Node.js + database) for real user accounts
- [ ] Move saved albums from `localStorage` to a real database
- [ ] Authentication (signup/login)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
