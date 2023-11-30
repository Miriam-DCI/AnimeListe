// Initialisiere die Liste mit Daten aus dem LocalStorage
const animeList = JSON.parse(localStorage.getItem("animeList")) || [];

// Funktion zum Anzeigen der Liste
function displayAnimeList() {
  const listContainer = document.getElementById("animeList");
  listContainer.innerHTML = "";

  animeList.forEach((item, index) => {
    const listItem = document.createElement("div");
    listItem.id = `animeItem_${index}`; // Füge eine eindeutige ID hinzu, falls benötigt
    listItem.classList.add("anime-item");

    const spanElement = document.createElement("span");
    spanElement.textContent = item;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button");

    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-edit");
    editButton.textContent = "Bearbeiten";
    editButton.onclick = () => editAnimeItem(index);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-delete");
    deleteButton.textContent = "Löschen";
    deleteButton.onclick = () => deleteAnimeItem(index);

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(spanElement);
    listItem.appendChild(buttonContainer);

    listContainer.appendChild(listItem);
  });
}

// Funktion zum Hinzufügen von Einträgen
function addToAnimeList() {
  const inputElement = document.getElementById("animeInput");
  const newAnime = inputElement.value.trim();

  if (newAnime !== "") {
    animeList.push(newAnime);
    updateLocalStorage();
    displayAnimeList();
    inputElement.value = ""; // Eingabefeld leeren nach dem Hinzufügen
  }
}

// Funktion zum Bearbeiten von Einträgen
function editAnimeItem(index) {
  const updatedItem = prompt("Bearbeite den Eintrag:", animeList[index]);
  if (updatedItem !== null) {
    animeList[index] = updatedItem.trim();
    updateLocalStorage();
    displayAnimeList();
  }
}

// Funktion zum Löschen von Einträgen
function deleteAnimeItem(index) {
  const confirmDelete = confirm(
    "Bist du sicher, dass du diesen Eintrag löschen möchtest?"
  );
  if (confirmDelete) {
    animeList.splice(index, 1);
    updateLocalStorage();
    displayAnimeList();
  }
}

// Funktion zum Aktualisieren des LocalStorage
function updateLocalStorage() {
  localStorage.setItem("animeList", JSON.stringify(animeList));
}

// API Jikan zum Abrufen von Informationen zu Anime
function searchAnime() {
  const animeName = document.getElementById("animeInput").value;
  const animeURL = `https://api.jikan.moe/v4/search/anime?q=${animeName}`;

  fetch(animeURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fehlerhafte API-Antwort");
      }
      return response.json();
    })
    .then((data) => {
      const animeListContainer = document.getElementById("animeList");
      animeListContainer.innerHTML = "";

      data.results.forEach((anime) => {
        const animeItem = document.createElement("div");
        animeItem.classList.add("anime-item");
        animeItem.innerHTML = `
          <img src="${anime.image_url}" />
          <span>${anime.title}</span>
          <button class="btn btn-add" onclick="addToAnimeList('${anime.title}')">Hinzufügen</button>
        `;
        animeListContainer.appendChild(animeItem);
      });
    })
    .catch((error) => {
      console.error("Fehler bei der API-Anfrage:", error.message);
    });
}

// Initialanzeige der Liste
displayAnimeList();
