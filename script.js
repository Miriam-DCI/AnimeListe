/**
 * @description Die Liste von Animes, die aus dem LocalStorage geladen wird oder eine leere Liste, falls keine vorhanden ist.
 * @type {Array.<string>}
 */
const animeList = JSON.parse(localStorage.getItem("animeList")) || [];

/**
 * @description Erstellt ein DOM-Element (Listenelement) mit einem Textinhalt.
 * @param {string} item - Der Textinhalt für das Listenelement.
 * @param {number} index - Der Index des Listenelements.
 * @returns {HTMLElement} - Das erstellte DOM-Element (Listenelement).
 */
function createListItem(item, index) {
  const listItem = document.createElement("div");
  listItem.id = `animeItem_${index}`;
  listItem.classList.add("anime-item");

  const spanElement = createElementWithText("span", item);
  const buttonContainer = createButtonContainer(index);

  [spanElement, buttonContainer].forEach((element) => {
    listItem.appendChild(element);
  });

  return listItem;
}

/**
 * @description Erstellt ein DOM-Element für einen Anime-Eintrag basierend auf den API-Daten.
 * @param {Object} anime - Die Informationen zum Anime.
 * @returns {HTMLElement} - Das erstellte DOM-Element für den Anime-Eintrag.
 */
function createAnimeItem(anime) {
  // ...
  const imageElement = createImageElement(anime.images.jpg);
  // ...
}

/**
 * @description Erstellt ein Bild-Element für den Anime-Eintrag.
 * @param {string} image - URL des Bildes.
 * @returns {HTMLImageElement} - Das erstellte Bild-Element.
 */
function createImageElement(image) {
  const imageElement = document.createElement("img");
  const imageURL =
    image?.large_image_url || image?.image_url || image?.small_image_url;
  imageElement.src = imageURL;
  imageElement.classList.add("anime-search-item-img");
  return imageElement;
}

/**
 * @description Erstellt ein DOM-Element mit Textinhalt.
 * @param {string} elementType - Der Typ des DOM-Elements (z. B. "span", "div").
 * @param {string} textContent - Der Textinhalt für das DOM-Element.
 * @returns {HTMLElement} - Das erstellte DOM-Element.
 */
function createElementWithText(elementType, textContent) {
  const element = document.createElement(elementType);
  element.textContent = textContent;
  return element;
}

/**
 * @description Erstellt den Container für die Buttons (Bearbeiten und Löschen).
 * @param {number} index - Der Index des Listenelements.
 * @returns {HTMLElement} - Der Container für die Buttons.
 */
function createButtonContainer(index) {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button");

  const editButton = createButton("Bearbeiten", "btn-edit", () =>
    editAnimeItem(index)
  );
  const deleteButton = createButton("Löschen", "btn-delete", () =>
    deleteAnimeItem(index)
  );

  [editButton, deleteButton].forEach((button) => {
    buttonContainer.appendChild(button);
  });

  return buttonContainer;
}

/**
 * @description Erstellt einen Button mit einem Event-Handler.
 * @param {string} text - Der Text auf dem Button.
 * @param {string} className - Die CSS-Klasse für den Button.
 * @param {Function} onClick - Die Funktion, die beim Klicken auf den Button ausgeführt wird.
 * @returns {HTMLButtonElement} - Der erstellte Button.
 */
function createButton(text, className, onClick) {
  const button = document.createElement("button");
  button.classList.add("btn", className);
  button.textContent = text;
  button.onclick = onClick;
  return button;
}

/**
 * @description Anzeigt die gespeicherte Anime-Liste im DOM.
 */
function displayAnimeList() {
  const listContainer = document.querySelector(".animeList");
  listContainer.innerHTML = "";

  animeList.forEach((item, index) => {
    const listItem = createListItem(item, index);
    listContainer.appendChild(listItem);
  });
}

/**
 * @description Fügt einen neuen Eintrag zur Anime-Liste hinzu.
 * @param {string} name - Der Name des neuen Eintrags.
 */
function addToAnimeList(name) {
  const inputElement = document.getElementById("animeInput");
  const newAnime = inputElement.value.trim();

  if ((newAnime !== "" || name !== "") && newAnime !== name) {
    animeList.push(name || newAnime);
    updateLocalStorage();
    displayAnimeList();
    inputElement.value = "";
  } else if (name === "") {
    animeList.push(newAnime);
    updateLocalStorage();
    displayAnimeList();
  } else {
    alert("Dieser Eintrag ist bereits vorhanden.");
  }
}

/**
 * @description Bearbeitet einen Eintrag in der Anime-Liste.
 * @param {number} index - Der Index des zu bearbeitenden Eintrags.
 */
function editAnimeItem(index) {
  const updatedItem = prompt("Bearbeite den Eintrag:", animeList[index]);
  if (updatedItem !== null) {
    animeList[index] = updatedItem.trim();
    updateLocalStorage();
    displayAnimeList();
  }
}

/**
 * @description Löscht einen Eintrag aus der Anime-Liste.
 * @param {number} index - Der Index des zu löschenden Eintrags.
 */
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

/**
 * @description Aktualisiert den LocalStorage mit der aktuellen Anime-Liste.
 */
function updateLocalStorage() {
  localStorage.setItem("animeList", JSON.stringify(animeList));
}

/**
 * @description Erstellt ein DOM-Element für einen Anime-Eintrag basierend auf den API-Daten.
 * @param {Object} anime - Die Informationen zum Anime.
 * @returns {HTMLElement} - Das erstellte DOM-Element für den Anime-Eintrag.
 */
function createAnimeItem(anime) {
  const animeItem = document.createElement("div");
  animeItem.classList.add("anime-search-item");

  const titleElement = createElementWithText("span", anime.title);
  const imageElement = createImageElement(anime.images.jpg);
  const ratingElement = createElementWithText(
    "span",
    `Rating: ${anime.score || "N/A"}`
  );
  const ongoingElement = createElementWithText(
    "span",
    `Ongoing: ${anime.airing ? "Yes" : "No"}`
  );
  const addButton = createButton("Hinzufügen", "btn-add", () =>
    addToAnimeList(anime.title)
  );

  [
    titleElement,
    imageElement,
    ratingElement,
    ongoingElement,
    addButton,
  ].forEach((element) => {
    animeItem.appendChild(element);
  });

  return animeItem;
}

/**
 * @description Zeigt die Suchergebnisse im DOM an.
 * @param {Object} data - Die Daten der Suchergebnisse.
 */
function displaySearchResults(data) {
  const animeListContainer = document.querySelector(".anime-search-result");
  animeListContainer.innerHTML = "";

  const headlineElement = createElementWithText("h2", "Suchergebnisse");
  animeListContainer.appendChild(headlineElement);

  if (data && data.data && data.data.length > 0) {
    data.data.forEach((anime) => {
      const animeItem = createAnimeItem(anime);
      animeListContainer.appendChild(animeItem);
    });
  } else {
    animeListContainer.textContent = "Keine Ergebnisse gefunden.";
  }
}

/**
 * @description Führt eine Anime-Suche basierend auf dem eingegebenen Suchbegriff durch.
 */
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
      displaySearchResults(data);
    })
    .catch((error) => {
      console.error("Fehler bei der API-Anfrage:", error.message);
    });
}

// Zeigt die gespeicherte Anime-Liste beim Laden der Seite an.
displayAnimeList();
