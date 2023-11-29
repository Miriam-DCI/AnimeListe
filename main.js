async function searchAnime() {
  const inputElement = document.getElementById("animeInput");
  const query = inputElement.value.trim();

  if (query !== "") {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&limit=6`
      );
      const data = await response.json();

      displayAnimeCards(data.results);
    } catch (error) {
      console.error("Error fetching anime data:", error);
      alert("Error fetching anime data. Please try again later.");
    }
  }
}

function displayAnimeCards(animeList) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${anime.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>${anime.synopsis}</p>
      <p>Rating: ${anime.score}</p>
      <button onclick="addToWatchedList('A', '${anime.title}')">Add to Watched List</button>
    `;
    cardContainer.appendChild(card);
  });
}
