function renderAlbumPage(albumId) {
  return `
    <button class="back-btn" data-link href="/">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
      <span>Back</span>
    </button>

    <div class="album-hero">
      <img class="album-hero-cover" src="" alt="cover" />
    </div>

    <h1 class="album-hero-title">در حال بارگذاری...</h1>
    <p class="album-hero-artist"></p>

    <div class="album-meta">
      <span class="meta-year"></span>
      <span class="meta-dot">•</span>
      <span class="meta-genre"></span>
      <span class="meta-dot">•</span>
      <span class="meta-count"></span>
    </div>

    <button class="add-library-btn" id="add-library-btn">+ Add to Library</button>

    <h2 class="section-title">Tracks</h2>
    <ul class="track-list"></ul>
  `;
}

async function initAlbumPage(albumId) {
  try {
    const lookupUrl = `https://itunes.apple.com/lookup?id=${albumId}&entity=song`;
    const response = await fetch(lookupUrl);
    const data = await response.json();

    const albumInfo = data.results[0];
    const tracks = data.results.filter((item) => item.wrapperType === "track");

    fillAlbumInfo(albumInfo, tracks.length);
    fillTrackList(tracks);
    setupLibraryButton(albumInfo);
  } catch (error) {
    console.log("خطا در گرفتن اطلاعات آلبوم:", error);
  }
}

function setupLibraryButton(albumInfo) {
  const btn = document.getElementById("add-library-btn");

  const updateButtonState = () => {
    if (isAlbumSaved(albumInfo.collectionId)) {
      btn.textContent = "✓ Added to Library";
      btn.classList.add("added");
    } else {
      btn.textContent = "+ Add to Library";
      btn.classList.remove("added");
    }
  };

  updateButtonState();

  btn.addEventListener("click", () => {
    if (isAlbumSaved(albumInfo.collectionId)) {
      removeFromLibrary(albumInfo.collectionId);
    } else {
      saveAlbumToLibrary({
        id: albumInfo.collectionId,
        name: albumInfo.collectionName,
        image: albumInfo.artworkUrl100,
        year: albumInfo.releaseDate.slice(0, 4),
      });
    }
    updateButtonState();
  });
}

function fillAlbumInfo(albumInfo, trackCount) {
  const bigCover = albumInfo.artworkUrl100.replace("100x100", "600x600");

  document.querySelector(".album-hero-cover").src = bigCover;
  document.querySelector(".album-hero-title").textContent =
    albumInfo.collectionName;
  document.querySelector(".album-hero-artist").textContent =
    albumInfo.artistName;
  document.querySelector(".meta-year").textContent =
    albumInfo.releaseDate.slice(0, 4);
  document.querySelector(".meta-genre").textContent =
    albumInfo.primaryGenreName;
  document.querySelector(".meta-count").textContent = `${trackCount} tracks`;
}

function fillTrackList(tracks) {
  const trackList = document.querySelector(".track-list");
  trackList.innerHTML = "";

  tracks.forEach((track) => {
    const li = document.createElement("li");
    const duration = formatDuration(track.trackTimeMillis);

    li.innerHTML = `
      <span class="track-number">${track.trackNumber}</span>
      <span class="track-name">${track.trackName}</span>
      <span class="track-duration">${duration}</span>
    `;
    trackList.append(li);
  });
}

function formatDuration(millis) {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
