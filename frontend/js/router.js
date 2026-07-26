function renderRoute() {
  const path = location.pathname;

  if (path === "/library") {
    document.getElementById("app").innerHTML = renderLibraryPage();
    initLibraryPage();
  } else if (path === "/profile") {
    document.getElementById("app").innerHTML = renderProfilePage();
    initProfilePage();
  } else if (path.startsWith("/album/")) {
    const albumId = path.split("/")[2];
    document.getElementById("app").innerHTML = renderAlbumPage(albumId);
    initAlbumPage(albumId);
  } else {
    document.getElementById("app").innerHTML = renderSearchPage();
    initSearchPage();
  }

  updateActiveNavLink(path);
}

function updateActiveNavLink(path) {
  const links = document.querySelectorAll("[data-link]");
  links.forEach((link) => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

document.body.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (!link) return;

  e.preventDefault();

  const path = link.getAttribute("href");
  history.pushState({}, "", path);
  renderRoute();
});

renderRoute();
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 8) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document
  .getElementById("header-notif-btn")
  .addEventListener("click", function () {
    alert("اعلان‌ها به‌زودی فعال می‌شن 🚧");
  });
