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
}
