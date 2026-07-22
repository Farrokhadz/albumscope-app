function renderSearchPage() {
  return `
    <form class="Search">
      <input placeholder="Enter the name of singer" id="input" />
      <button type="submit" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
          <path d="M 21 4 C 11.082241 4 3 12.082241 3 22 C 3 31.917759 11.082241 40 21 40 C 24.62177 40 27.99231 38.91393 30.820312 37.0625 L 43.378906 49.621094 L 47.621094 45.378906 L 35.224609 32.982422 C 37.581469 29.938384 39 26.13473 39 22 C 39 12.082241 30.917759 4 21 4 z M 21 8 C 28.756241 8 35 14.243759 35 22 C 35 29.756241 28.756241 36 21 36 C 13.243759 36 7 29.756241 7 22 C 7 14.243759 13.243759 8 21 8 z"></path>
        </svg>
      </button>
    </form>

    <div class="album-card">
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

    <h2 class="section-title">Albums</h2>
    <ul class="album-list">
      <li>
        <img />
        <h2>album name</h2>
        <p>2026</p>
      </li>
    </ul>
  `;
}

function initSearchPage() {
  const input = document.getElementById("input");
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    getArtistAlbums(input.value);
  });
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
    reRender(cleanAlbums, artistName, profile);
  } catch (error) {
    console.log("خطا:", error);
  }
}

function reRender(cleanAlbums, artistName, profile) {
  const albumList = document.querySelector(".album-list");
  albumList.innerHTML = " ";
  for (let i = 0; i < cleanAlbums.length; i++) {
    const card = cleanAlbums[i];
    const li = document.createElement("li");
    albumList.append(li);
    li.innerHTML = `
    <img src="${card.image}"/>
    <p>${card.year}</p>
    <h2>${card.name}</h2>`;
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
