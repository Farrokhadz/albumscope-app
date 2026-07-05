async function getArtistAlbums() {
  const artistName = "Joji";
  const searchUrl = `https://itunes.apple.com/search?term=${artistName}&entity=musicArtist`;
  const response = await fetch(searchUrl);
  const data = await response.json();
  const artistId = data.results[0].artistId;
  const lookupUrl = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`;
  const responseartistId = await fetch(lookupUrl);
  const dataArtistid = await responseartistId.json();
  console.log(data);
  console.log(dataArtistid);
}

getArtistAlbums();
