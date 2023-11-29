// AniList API credentials
const apiUrl = "https://Anilistmikilior1V1.p.rapidapi.com";
const apiKey = "f736ee409cmsh17c8916af343316p1bb6c9jsn7a63f7150ac5";

/**
 * @description Funktion zum Hinzufügen von Anime oder Manga zur Watchlist
 * @param {string} type - "A" für Anime, "M" für Manga
 */
async function addToWatchedList(type) {
  const inputElement = document.getElementById("animeInput");
  const title = inputElement.value.trim();

  if (title !== "") {
    addToLocalStorage(type, title);

    inputElement.value = "";

    updateWatchedList();
  }
}

/**
 * @description Funktion zum Hinzufügen von Anime oder Manga zur Watchlist in localStorage
 * @param {string} type - "A" für Anime, "M" für Manga
 * @param {string} title - Der Titel des Anime oder Manga
 */
function addToLocalStorage(type, title) {
  let watchedList = JSON.parse(localStorage.getItem("watchedList")) || [];
  // Füge den Typ und den Titel als Objekt hinzu
  watchedList.push({ type, title });
  localStorage.setItem("watchedList", JSON.stringify(watchedList));
}

/**
 * @description Funktion, um die Watchlist aus dem localStorage abzurufen
 * @returns {Array} - Die Watchlist als Array von Objekten { type, title }
 */
function getWatchedListFromLocalStorage() {
  return JSON.parse(localStorage.getItem("watchedList")) || [];
}

/**
 * @description Funktion, um die Watchlist auf der Seite zu aktualisieren
 */
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

// Function to delete an entry from the watched list
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

// Function to edit an entry in the watched list
function editEntry(index) {
  const watchedList = getWatchedListFromLocalStorage();
  const updatedTitle = prompt("Edit entry:", watchedList[index].title);

  if (updatedTitle !== null) {
    watchedList[index].title = updatedTitle;
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
    updateWatchedList();
  }
}

// Initial update when the page loads
updateWatchedList();
