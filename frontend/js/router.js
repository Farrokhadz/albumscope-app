function renderRoute() {
  const path = location.pathname;

  if (path === "/library") {
    document.getElementById("app").innerHTML = renderLibraryPage();
  } else if (path === "/profile") {
    document.getElementById("app").innerHTML = renderProfilePage();
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
