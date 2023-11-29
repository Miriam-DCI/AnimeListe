/**
 * @description Funktion zum Hinzufügen von Anime oder Manga zur Watchlist
 * @param {string} type - "A" für Anime, "M" für Manga
 */
// Hauptfunktion für das Hinzufügen von Anime oder Manga zur Watchlist
async function addToWatchedList(type) {
  const inputElement = document.getElementById("animeInput");
  const title = inputElement.value.trim();

  if (title !== "") {
    addToLocalStorage(type, title);

    inputElement.value = "";

    updateWatchedList();
  }
}

// Funktion zum Suchen nach Anime über die Jikan API
async function searchAnime() {
  const inputElement = document.getElementById("animeInput");
  const query = inputElement.value.trim();

  if (query !== "") {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&limit=1`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const anime = data.results[0];
        displayAnimeInfo(anime);
      } else {
        alert("No anime found!");
      }
    } catch (error) {
      console.error("Error fetching anime data:", error);
      alert("Error fetching anime data. Please try again later.");
    }
  }
}

// Funktion zum Anzeigen von Anime-Informationen auf der Seite
function displayAnimeInfo(anime) {
  const animeElement = document.getElementById("anime");
  animeElement.innerHTML = `
    <h2>${anime.title}</h2>
    <img src="${anime.image_url}" alt="${anime.title}">
    <p>${anime.synopsis}</p>
    <button onclick="addToWatchedList('A')">Add to Watched List</button>
  `;
}

// Funktion zum Hinzufügen von Anime oder Manga zur Watchlist in localStorage
function addToLocalStorage(type, title) {
  let watchedList = JSON.parse(localStorage.getItem("watchedList")) || [];
  watchedList.push({ type, title });
  localStorage.setItem("watchedList", JSON.stringify(watchedList));
}

// Funktion zum Abrufen der Watchlist aus dem localStorage
function getWatchedListFromLocalStorage() {
  return JSON.parse(localStorage.getItem("watchedList")) || [];
}

// Funktion zum Aktualisieren der Watchlist auf der Seite
function updateWatchedList() {
  const watchedListElement = document.getElementById("watchedList");
  watchedListElement.innerHTML = "";

  const watchedList = getWatchedListFromLocalStorage();

  watchedList.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${entry.type === "A" ? "Anime" : "Manga"}: ${entry.title}</span>
      <button onclick="editEntry(${index})">Edit</button>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;
    watchedListElement.appendChild(listItem);
  });
}

// Funktion zum Löschen eines Eintrags aus der Watchlist
function deleteEntry(index) {
  const watchedList = getWatchedListFromLocalStorage();
  const isConfirmed = confirm(
    `Are you sure you want to delete "${watchedList[index].title}"?`
  );

  if (isConfirmed) {
    watchedList.splice(index, 1);
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
    updateWatchedList();
  }
}

// Funktion zum Bearbeiten eines Eintrags in der Watchlist
function editEntry(index) {
  const watchedList = getWatchedListFromLocalStorage();
  const updatedTitle = prompt("Edit entry:", watchedList[index].title);

  if (updatedTitle !== null) {
    watchedList[index].title = updatedTitle;
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
    updateWatchedList();
  }
}
