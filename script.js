// Initialisiere die Liste mit Daten aus dem LocalStorage
let animeList = JSON.parse(localStorage.getItem("animeList")) || [];

// Funktion zum Anzeigen der Liste
function displayList() {
  const listContainer = document.getElementById("animeList");
  listContainer.innerHTML = "";

  animeList.forEach((item, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("anime-item");
    listItem.innerHTML = `
      <span>${item}</span>
      <button class="btn btn-edit" onclick="editItem(${index})">Bearbeiten</button>
      <button class="btn btn-delete" onclick="deleteItem(${index})">Löschen</button>
    `;
    listContainer.appendChild(listItem);
  });
}

// Funktion zum Hinzufügen von Einträgen
function addToList() {
  const inputElement = document.getElementById("animeInput");
  const newItem = inputElement.value.trim();

  if (newItem !== "") {
    animeList.push(newItem);
    inputElement.value = "";
    updateLocalStorage();
    displayList();
  }
}

// Funktion zum Bearbeiten von Einträgen
function editItem(index) {
  const updatedItem = prompt("Bearbeite den Eintrag:", animeList[index]);
  if (updatedItem !== null) {
    animeList[index] = updatedItem.trim();
    updateLocalStorage();
    displayList();
  }
}

// Funktion zum Löschen von Einträgen
function deleteItem(index) {
  const confirmDelete = confirm(
    "Bist du sicher, dass du diesen Eintrag löschen möchtest?"
  );
  if (confirmDelete) {
    animeList.splice(index, 1);
    updateLocalStorage();
    displayList();
  }
}

// Funktion zum Aktualisieren des LocalStorage
function updateLocalStorage() {
  localStorage.setItem("animeList", JSON.stringify(animeList));
}

// API Jikan zum Abrufen von Informationen zu Anime

function searchAnime() {
  const animeName = document.getElementById("animeInput").value;
  const animeURL = `https://api.jikan.moe/v3/search/anime?q=${animeName}`;

  fetch(animeURL)
    .then((response) => response.json())
    .then((data) => {
      const animeList = document.getElementById("animeList");
      animeList.innerHTML = "";

      data.results.forEach((anime) => {
        const animeItem = document.createElement("div");
        animeItem.classList.add("anime-item");
        animeItem.innerHTML = `
          <img src="${anime.image_url}" />
          <span>${anime.title}</span>
          <button class="btn btn-add" onclick="addToAnimeList('${anime.title}')">Hinzufügen</button>
        `;
        animeList.appendChild(animeItem);
      });
    });
}

// Initialanzeige der Liste
displayList();
