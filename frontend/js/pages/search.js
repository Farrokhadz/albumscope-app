let lastSearchResult = null;
let outsideClickHandler = null;
let suggestionsController = null;
let albumsController = null;

const popularArtists = [
  "Drake",
  "The Weeknd",
  "Taylor Swift",
  "Dua Lipa",
  "Eminem",
];

function renderSearchPage() {
  return `
    <form class="Search">
      <div class="search-input-wrapper">
        <input placeholder="Enter the name of singer" id="input" autocomplete="off" />
        <ul class="suggestions-list"></ul>
      </div>
      <button type="submit" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>

    <div class="search-welcome">
      <div class="welcome-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
      <p class="welcome-title">Discover your next favorite album</p>
      <p class="welcome-subtitle">Search any artist, or try one of these</p>
      <div class="popular-grid" id="popular-grid">
        <div class="popular-skeleton"></div>
        <div class="popular-skeleton"></div>
        <div class="popular-skeleton"></div>
        <div class="popular-skeleton"></div>
        <div class="popular-skeleton"></div>
      </div>
    </div>

    <div class="search-status"></div>

    <div class="album-card" style="display: none;">
      <div class="card-profile">
        <img width="64" height="64" src="/image/defultalbum-card.png" alt="artist" />
      </div>
      <div class="card-tint"></div>
      <div class="card-overlay"></div>
      <div class="card-info">
        <h2 class="singer-name">singer name</h2>
        <p class="album-length">this is a test for singer name</p>
      </div>
    </div>

    <h2 class="section-title" style="display: none;">Albums</h2>
    <ul class="album-list"></ul>
  `;
}

function initSearchPage() {
  const input = document.getElementById("input");
  const form = document.querySelector("form");
  const suggestionsList = document.querySelector(".suggestions-list");
  const welcomeSection = document.querySelector(".search-welcome");

  let debounceTimer;

  if (lastSearchResult) {
    welcomeSection.style.display = "none";
  } else {
    loadPopularArtists();
  }

  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);

    const value = input.value.trim();

    if (value === "") {
      suggestionsList.innerHTML = "";
      document.querySelector(".search-status").innerHTML = "";
      document.querySelector(".album-card").style.display = "none";
      document.querySelector(".section-title").style.display = "none";
      document.querySelector(".album-list").innerHTML = "";
      welcomeSection.style.display = "flex";
      return;
    }

    welcomeSection.style.display = "none";

    debounceTimer = setTimeout(function () {
      fetchSuggestions(value);
    }, 500);
  });

  if (outsideClickHandler) {
    document.removeEventListener("click", outsideClickHandler);
  }

  outsideClickHandler = function (e) {
    if (!e.target.closest(".search-input-wrapper")) {
      suggestionsList.innerHTML = "";
    }
  };

  document.addEventListener("click", outsideClickHandler);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (value === "") return;

    suggestionsList.innerHTML = "";
    welcomeSection.style.display = "none";
    showLoadingState();
    getArtistAlbums(value);
  });

  if (lastSearchResult) {
    reRender(
      lastSearchResult.cleanAlbums,
      lastSearchResult.artistName,
      lastSearchResult.profile,
    );
  }
}

async function loadPopularArtists() {
  const grid = document.getElementById("popular-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const track = document.createElement("div");
  track.className = "popular-track";
  grid.append(track);

  const marqueeArtists = [...popularArtists, ...popularArtists];

  for (const artistName of marqueeArtists) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "popular-card";
    card.innerHTML = `<div class="popular-card-loading"></div>`;
    track.append(card);

    card.addEventListener("click", function () {
      selectPopularArtist(artistName);
    });

    fetchPopularArtistImage(artistName, card);
  }
}

async function fetchPopularArtistImage(artistName, card) {
  try {
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artistName)}`;
    const response = await fetch(url);
    const data = await response.json();

    const image =
      data.artists && data.artists.length > 0
        ? data.artists[0].strArtistThumb
        : "";

    card.innerHTML = `
      <img src="${escapeHTML(image || "")}" alt="${escapeHTML(artistName)}" />
      <div class="popular-card-overlay"></div>
      <span class="popular-card-name">${escapeHTML(artistName)}</span>
    `;
  } catch (error) {
    card.innerHTML = `<span class="popular-card-name">${escapeHTML(artistName)}</span>`;
  }
}

function selectPopularArtist(artistName) {
  const input = document.getElementById("input");
  input.value = artistName;
  document.querySelector(".search-welcome").style.display = "none";
  showLoadingState();
  getArtistAlbums(artistName);
}

async function fetchSuggestions(query) {
  if (suggestionsController) suggestionsController.abort();
  suggestionsController = new AbortController();

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=musicArtist&limit=5`;
    const response = await fetch(url, { signal: suggestionsController.signal });
    const data = await response.json();

    renderSuggestions(data.results);
  } catch (error) {
    if (error.name === "AbortError") return;
    console.log("خطا تو گرفتن پیشنهادها:", error);
  }
}

function renderSuggestions(artists) {
  const suggestionsList = document.querySelector(".suggestions-list");
  suggestionsList.innerHTML = "";

  if (artists.length === 0) {
    suggestionsList.style.display = "none";
    return;
  }

  suggestionsList.style.display = "block";

  artists.forEach((artist) => {
    const li = document.createElement("li");
    li.textContent = artist.artistName;
    li.addEventListener("click", function () {
      selectArtist(artist.artistName);
    });
    suggestionsList.append(li);
  });
}

function selectArtist(artistName) {
  const input = document.getElementById("input");
  input.value = artistName;
  document.querySelector(".suggestions-list").innerHTML = "";

  showLoadingState();
  getArtistAlbums(artistName);
}

function showLoadingState() {
  document.querySelector(".search-status").innerHTML = `
    <div class="status-box loading">
      <div class="spinner"></div>
      <p class="status-message">Searching...</p>
    </div>
  `;
  document.querySelector(".album-card").style.display = "none";
  document.querySelector(".section-title").style.display = "none";
  document.querySelector(".album-list").innerHTML = "";
}

function showNotFoundState(artistName) {
  document.querySelector(".search-status").innerHTML = `
    <p class="status-message">هیچ خواننده‌ای با اسم "${escapeHTML(artistName)}" پیدا نشد.</p>
  `;
}

function showNoAlbumsState(artistName) {
  document.querySelector(".search-status").innerHTML = `
    <p class="status-message">"${escapeHTML(artistName)}" پیدا شد، ولی آلبومی براش موجود نیست.</p>
  `;
}

function showErrorState() {
  document.querySelector(".search-status").innerHTML = `
    <p class="status-message error">مشکلی پیش اومد. لطفاً دوباره امتحان کن.</p>
  `;
}

async function getArtistAlbums(artistName) {
  if (albumsController) albumsController.abort();
  albumsController = new AbortController();
  const signal = albumsController.signal;

  try {
    const profile_url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artistName)}`;
    const profile_response = await fetch(profile_url, { signal });
    const profile = await profile_response.json();

    const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=musicArtist`;
    const response = await fetch(searchUrl, { signal });
    const data = await response.json();

    if (data.results.length === 0) {
      showNotFoundState(artistName);
      return;
    }

    const artistId = data.results[0].artistId;

    const lookupUrl = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`;
    const albumsResponse = await fetch(lookupUrl, { signal });
    const albumsData = await albumsResponse.json();

    const albumsOnly = albumsData.results.filter((item) => {
      return item.wrapperType === "collection";
    });
    const realAlbums = albumsOnly.filter((item) => item.trackCount > 1);
    const cleanAlbums = realAlbums.map((item) => {
      return {
        name: item.collectionName,
        image: item.artworkUrl100,
        year: item.releaseDate ? item.releaseDate.slice(0, 4) : "",
        id: item.collectionId,
      };
    });

    if (cleanAlbums.length === 0) {
      showNoAlbumsState(artistName);
      return;
    }

    lastSearchResult = { cleanAlbums, artistName, profile };
    reRender(cleanAlbums, artistName, profile);
  } catch (error) {
    if (error.name === "AbortError") return;
    console.log("خطا:", error);
    showErrorState();
  }
}

function reRender(cleanAlbums, artistName, profile) {
  document.querySelector(".search-status").innerHTML = "";
  document.querySelector(".album-card").style.display = "block";
  document.querySelector(".section-title").style.display = "block";

  const albumList = document.querySelector(".album-list");
  albumList.innerHTML = "";

  for (let i = 0; i < cleanAlbums.length; i++) {
    const card = cleanAlbums[i];
    const li = document.createElement("li");
    albumList.append(li);
    li.innerHTML = `
          <a href="/album/${escapeHTML(card.id)}" data-link>
          <div class="album-thumb">
            <img src="${escapeHTML(card.image)}"/>
            <div class="play-overlay">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </div>
          </div>
          <p>${escapeHTML(card.year)}</p>
          <h2>${escapeHTML(card.name)}</h2>
          </a>`;
  }

  document.querySelector(".singer-name").textContent = `${artistName}`;
  document.querySelector(".album-length").textContent =
    `Found ${cleanAlbums.length} albums by ${artistName}`;

  if (profile.artists && profile.artists.length > 0) {
    document.querySelector(".card-profile").innerHTML =
      `<img src="${escapeHTML(profile.artists[0].strArtistFanart)}"/>`;
  } else {
    document.querySelector(".card-profile").innerHTML = `<img src=""/>`;
  }
}
