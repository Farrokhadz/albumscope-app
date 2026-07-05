async function getArtistAlbums() {
  const artistName = "joji";
  const searchUrl = `https://itunes.apple.com/search?term=${artistName}&entity=musicArtist`;
  const response = await fetch(searchUrl);
  const data = await response.json();
  console.log(data);
}

getArtistAlbums();
