function renderSearchPage() {
  return `
    <form class="Search">
      <div class="search-input-wrapper">
        <input placeholder="Enter the name of singer" id="input" autocomplete="off" />
        <ul class="suggestions-list"></ul>
      </div>
      <button type="submit" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
          <path d="M 21 4 C 11.082241 4 3 12.082241 3 22 C 3 31.917759 11.082241 40 21 40 C 24.62177 40 27.99231 38.91393 30.820312 37.0625 L 43.378906 49.621094 L 47.621094 45.378906 L 35.224609 32.982422 C 37.581469 29.938384 39 26.13473 39 22 C 39 12.082241 30.917759 4 21 4 z M 21 8 C 28.756241 8 35 14.243759 35 22 C 35 29.756241 28.756241 36 21 36 C 13.243759 36 7 29.756241 7 22 C 7 14.243759 13.243759 8 21 8 z"></path>
        </svg>
      </button>
    </form>

    <div class="search-status"></div>

    <div class="album-card" style="display: none;">
      <div class="card-profile">
        <img width="64" height="64" src="image/defultalbum-card.png" alt="artist" />
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
let lastSearchResult = null;

function renderSearchPage() {
  return `
    <form class="Search">
      <div class="search-input-wrapper">
        <input placeholder="Enter the name of singer" id="input" autocomplete="off" />
        <ul class="suggestions-list"></ul>
      </div>
      <button type="submit" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
          <path d="M 21 4 C 11.082241 4 3 12.082241 3 22 C 3 31.917759 11.082241 40 21 40 C 24.62177 40 27.99231 38.91393 30.820312 37.0625 L 43.378906 49.621094 L 47.621094 45.378906 L 35.224609 32.982422 C 37.581469 29.938384 39 26.13473 39 22 C 39 12.082241 30.917759 4 21 4 z M 21 8 C 28.756241 8 35 14.243759 35 22 C 35 29.756241 28.756241 36 21 36 C 13.243759 36 7 29.756241 7 22 C 7 14.243759 13.243759 8 21 8 z"></path>
        </svg>
      </button>
    </form>

    <div class="search-status"></div>

    <div class="album-card" style="display: none;">
      <div class="card-profile">
        <img width="64" height="64" src="image/defultalbum-card.png" alt="artist" />
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

  let debounceTimer;

  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);

    const value = input.value.trim();

    if (value === "") {
      suggestionsList.innerHTML = "";
      document.querySelector(".search-status").innerHTML = "";
      document.querySelector(".album-card").style.display = "none";
      document.querySelector(".section-title").style.display = "none";
      document.querySelector(".album-list").innerHTML = "";
      return;
    }

    debounceTimer = setTimeout(function () {
      fetchSuggestions(value);
    }, 500);
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-input-wrapper")) {
      suggestionsList.innerHTML = "";
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  if (lastSearchResult) {
    reRender(
      lastSearchResult.cleanAlbums,
      lastSearchResult.artistName,
      lastSearchResult.profile,
    );
  }
}

async function fetchSuggestions(query) {
  try {
    const url = `https://itunes.apple.com/search?term=${query}&entity=musicArtist&limit=5`;
    const response = await fetch(url);
    const data = await response.json();

    renderSuggestions(data.results);
  } catch (error) {
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
      <p class="status-message">در حال جستجو...</p>
    </div>
  `;
  document.querySelector(".album-card").style.display = "none";
  document.querySelector(".section-title").style.display = "none";
  document.querySelector(".album-list").innerHTML = "";
}

function showNotFoundState(artistName) {
  document.querySelector(".search-status").innerHTML = `
    <p class="status-message">هیچ خواننده‌ای با اسم "${artistName}" پیدا نشد.</p>
  `;
}

function showNoAlbumsState(artistName) {
  document.querySelector(".search-status").innerHTML = `
    <p class="status-message">"${artistName}" پیدا شد، ولی آلبومی براش موجود نیست.</p>
  `;
}

function showErrorState() {
  document.querySelector(".search-status").innerHTML = `
    <p class="status-message error">مشکلی پیش اومد. لطفاً دوباره امتحان کن.</p>
  `;
}

async function getArtistAlbums(artistName) {
  console.log("تابع شروع شد");
  try {
    const profile_url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artistName}`;
    const profile_response = await fetch(profile_url);
    const profile = await profile_response.json();
    console.log(profile);

    const searchUrl = `https://itunes.apple.com/search?term=${artistName}&entity=musicArtist`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.results.length === 0) {
      showNotFoundState(artistName);
      return;
    }

    const artistId = data.results[0].artistId;

    const lookupUrl = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`;
    const albumsResponse = await fetch(lookupUrl);
    const albumsData = await albumsResponse.json();

    const albumsOnly = albumsData.results.filter((item) => {
      return item.wrapperType === "collection";
    });
    const realAlbums = albumsOnly.filter((item) => item.trackCount > 1);
    const cleanAlbums = realAlbums.map((item) => {
      return {
        name: item.collectionName,
        image: item.artworkUrl100,
        year: item.releaseDate.slice(0, 4),
        id: item.collectionId,
      };
    });

    console.log("تعداد آلبوم‌های نهایی:", cleanAlbums.length);

    if (cleanAlbums.length === 0) {
      showNoAlbumsState(artistName);
      return;
    }

    lastSearchResult = { cleanAlbums, artistName, profile };
    reRender(cleanAlbums, artistName, profile);
  } catch (error) {
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
        <a href="/album/${card.id}" data-link>
        <img src="${card.image}"/>
        <p>${card.year}</p>
        <h2>${card.name}</h2>
        </a>`;
  }

  document.querySelector(".singer-name").textContent = `${artistName}`;
  document.querySelector(".album-length").textContent =
    `Found ${cleanAlbums.length} albums by ${artistName}`;

  console.log(profile);
  if (profile.artists) {
    document.querySelector(".card-profile").innerHTML =
      `<img src="${profile.artists[0].strArtistFanart}"/>`;
  } else {
    document.querySelector(".card-profile").innerHTML = `<img src=""/>`;
  }
}
