const input = document.getElementById("input");
const albumCard = document.querySelector(".album-card");
const albumList = document.querySelector(".album-list");
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  getArtistAlbums(input.value);
});

async function getArtistAlbums(artistName) {
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
  console.log(cleanAlbums);
  reRender(cleanAlbums);
}

function reRender(cleanAlbums) {
  const albumList = document.querySelector(".album-list");
  console.log(card);
  albumList.innerHTML = " ";
  for (let i = 0; i < cleanAlbums.length; i++) {
    const card = cleanAlbums[i];
    const li = document.createElement("li");
    albumList.append(li);
    li.innerHTML = `
    <img src = "${card.image}"/>
    <p>${card.year}</p>
    <h2>${card.name}</h2>`;
  }
}
