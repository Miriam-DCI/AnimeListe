/*

TODO:
- styling überarbeiten
- suche überarbeiten
- Filter hinzufügen
- zweite seite bei den such ergebnissen hinzufügen

*/

// Initialisiere die Liste mit Daten aus dem LocalStorage
const animeList = JSON.parse(localStorage.getItem("animeList")) || [];

// Funktion zum Anzeigen der Liste
function displayAnimeList() {
  const listContainer = document.querySelector(".animeList");
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

function addToAnimeList(name) {
  const inputElement = document.getElementById("animeInput");
  const newAnime = inputElement.value.trim();
  if (newAnime !== "" || name !== "") {
    if (newAnime !== name) {
      animeList.push(name);
      updateLocalStorage(); // sicherstellen, dass diese Zeile nach dem Hinzufügen steht
      displayAnimeList();
      inputElement.value = "";
    } else if (name === "") {
      animeList.push(newAnime);
      updateLocalStorage(); // sicherstellen, dass diese Zeile nach dem Hinzufügen steht
      displayAnimeList();
    } else {
      alert("Dieser Eintrag ist bereits vorhanden.");
    }
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
  const animeURL = `https://api.jikan.moe/v4/anime?q=${animeName}`;

  fetch(animeURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fehlerhafte API-Antwort");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const animeListContainer = document.querySelector(".anime-search-result");
      animeListContainer.innerHTML = "";

      const headlineElement = document.createElement("h2");
      headlineElement.textContent = "Suchergebnisse";

      animeListContainer.appendChild(headlineElement);

      if (data && data.data && data.data.length > 0) {
        for (let i = 0; i < data.data.length; i++) {
          const anime = data.data[i];

          // Hier werden verschiedene DOM-Elemente erstellt und konfiguriert
          const animeSearchResult = document.createElement("div");
          animeSearchResult.classList.add("anime-search-result");

          const animeItem = document.createElement("div");
          animeItem.classList.add("anime-search-item");

          // Ein span-Element für den Titel des Animes wird erstellt und konfiguriert
          const titleElement = document.createElement("span");
          titleElement.textContent = anime.title;

          // Ein Bild-Element wird erstellt und konfiguriert, um das Anime-Bild anzuzeigen
          const imageElement = document.createElement("img");
          const imageURL =
            anime.images.jpg?.large_image_url ||
            anime.images.jpg?.image_url ||
            anime.images.jpg?.small_image_url;
          imageElement.src = imageURL;
          imageElement.classList.add("anime-search-item-img");

          // Ein span-Element für die Bewertung des Animes wird erstellt und konfiguriert
          const ratingElement = document.createElement("span");
          ratingElement.textContent = `Rating: ${anime.score || "N/A"}`;

          // Ein span-Element für den Status des Animes (laufend oder nicht) wird erstellt und konfiguriert
          const ongoingElement = document.createElement("span");
          ongoingElement.textContent = `Ongoing: ${
            anime.airing ? "Yes" : "No"
          }`;

          // Ein Button-Element zum Hinzufügen des Animes zur Liste wird erstellt und konfiguriert
          const addButton = document.createElement("button");
          addButton.classList.add("btn", "btn-add");
          addButton.textContent = "Hinzufügen";
          // Hier wird die Funktion `addToAnimeList` aufgerufen, wenn der Button geklickt wird
          addButton.onclick = () => addToAnimeList(anime.title);

          // Die erstellten Elemente werden dem `animeItem`-Element hinzugefügt
          animeItem.appendChild(titleElement);
          animeItem.appendChild(imageElement);
          animeItem.appendChild(ratingElement);
          animeItem.appendChild(ongoingElement);
          animeItem.appendChild(addButton);

          // Das `animeItem`-Element wird dem `animeListContainer` hinzugefügt
          animeListContainer.appendChild(animeItem);
        }
      } else {
        animeListContainer.textContent = "Keine Ergebnisse gefunden.";
      }
    })
    .catch((error) => {
      console.error("Fehler bei der API-Anfrage:", error.message);
    });
}
// Initialanzeige der Liste
displayAnimeList();
