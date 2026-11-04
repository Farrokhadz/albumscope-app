<div align="center">

# 🎧 AlbumScope

**Search any artist and explore their albums — a small vanilla JavaScript app built to learn how APIs really work.**

[**🚀 Live Demo**](https://albumscope.vercel.app) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<img src="docs/screenshots/demo.gif" alt="AlbumScope demo" width="800" />

</div>

---

## 📖 About

AlbumScope is a lightweight single-page web app that lets you look up an artist and browse their albums. I built it as a hands-on way to get comfortable with **core JavaScript** and the **logic behind working with REST APIs**: sending requests, handling asynchronous responses, and turning raw JSON into a clean interface.

No frameworks, no build step — just HTML, CSS and vanilla JS.

## ✨ Features

- 🔍 **Artist search** — type an artist's name and get their albums instantly
- 🔐 **Login / Sign up flow** — account screens with a dedicated user experience
- 🎨 **Custom UI** — designed from scratch with a focus on a clean, music-first look
- 📱 **Responsive layout** — works on desktop and mobile

<!-- ✏️ Add or remove features so this list matches the real app -->

## 🖼️ Screenshots

| Login | Search | Results |
| :---: | :----: | :-----: |
| <img src="docs/screenshots/login.png" width="250" /> | <img src="docs/screenshots/search.png" width="250" /> | <img src="docs/screenshots/results.png" width="250" /> |

## 🛠️ Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Markup & Styling | HTML5, CSS3 |
| Logic | Vanilla JavaScript (ES6+), Fetch API |
| Data | [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html) (free, no key required) |
| Hosting | Vercel |

## 📁 Project Structure

```text
albumscope-app/
├── ...   <!-- paste the output of `tree` here -->
```

## 🚀 Getting Started

The project is plain vanilla JS, so there is nothing to install.

```bash
# 1. Clone the repository
git clone https://github.com/Farrokhadz/albumscope-app.git

# 2. Move into the project folder
cd albumscope-app

# 3. Open login.html in your browser
#    (or use any static server, e.g. the VS Code "Live Server" extension)
```

## 🧠 What I Learned

- Working with asynchronous JavaScript (`fetch`, `async/await`, promises)
- Reading API documentation and shaping responses into UI components
- Handling loading, empty and error states in a real interface
- Structuring a multi-page vanilla JS project without a framework
- Deploying a static site on Vercel

<!-- ✏️ Add 1–2 real challenges you hit (e.g. "CORS issue with X", "rendering results fast") -->

## 🗺️ Roadmap

- [ ] Polish and refine the UI
- [ ] Build a proper backend for authentication and user data
- [ ] Favorites / saved albums
- [ ] Album detail page with track list

## 🤝 Contributing

Suggestions and pull requests are welcome. Open an issue first to discuss what you'd like to change.

## 👤 Author

**Farrokhadz** — Front-end developer
GitHub: [@Farrokhadz](https://github.com/Farrokhadz)

---

<div align="center">

If you like this project, a ⭐ on the repo means a lot!

</div>
