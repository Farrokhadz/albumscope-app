function renderLibraryPage() {
  return `
    <h2 class="section-title">Your Library</h2>
    <div class="library-content"></div>
  `;
}

function initLibraryPage() {
  const savedAlbums = getSavedAlbums();
  const container = document.querySelector(".library-content");

  if (savedAlbums.length === 0) {
    container.innerHTML = `
  <div class="empty-state">
    <div class="empty-state-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
    </div>
    <p class="empty-state-title">Your library is empty</p>
    <p class="empty-state-subtitle">Albums you save will show up here</p>
    <a href="/" data-link class="empty-state-link">Find an album</a>
  </div>
`;
    return;
  }

  const list = document.createElement("ul");
  list.className = "album-list";

  savedAlbums.forEach((album) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="/album/${album.id}" data-link>
        <img src="${album.image}" />
        <p>${album.year}</p>
        <h2>${album.name}</h2>
      </a>
      <button class="remove-btn" data-remove-id="${album.id}">✕</button>
    `;
    list.append(li);
  });

  container.innerHTML = "";
  container.append(list);

  // گوش دادن به کلیک دکمه‌های حذف
  container.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-remove-id");
      removeFromLibrary(id);
      initLibraryPage(); // رفرش لیست بعد از حذف
    });
  });
}

// --- توابع کمکی برای کار با localStorage ---

function getSavedAlbums() {
  const raw = localStorage.getItem("savedAlbums");
  return raw ? JSON.parse(raw) : [];
}

function saveAlbumToLibrary(album) {
  const albums = getSavedAlbums();
  const alreadyExists = albums.some((a) => a.id === album.id);
  if (alreadyExists) return;

  albums.push(album);
  localStorage.setItem("savedAlbums", JSON.stringify(albums));
}

function removeFromLibrary(albumId) {
  const albums = getSavedAlbums();
  const filtered = albums.filter((a) => String(a.id) !== String(albumId));
  localStorage.setItem("savedAlbums", JSON.stringify(filtered));
}

function isAlbumSaved(albumId) {
  const albums = getSavedAlbums();
  return albums.some((a) => String(a.id) === String(albumId));
}
