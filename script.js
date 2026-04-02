// Variables
let main = document.querySelector("main");
let favoriteSection = document.querySelector(".favorite-section");
let header = document.querySelector("header");
let clearButton = document.querySelector("#clear");
let favHeader = document.querySelector(".favHeader");
let characterCounter = 1;
let allCheckboxes = "";
let favorites = [];

// API call
async function apiCall() {
  let response = await fetch("https://rickandmortyapi.com/api/character");

  data = await response.json();

  // set variable for array of results
  let results = data.results;

  // Loop through results and create cards
  for (const character of results) {
    // create card div and give it a class
    let card = document.createElement("div");
    card.classList.add("card");
    card.id = characterCounter;

    // Add it to the body:
    main.appendChild(card);

    // get name and add to card
    let cardName = document.createElement("h3");
    cardName.textContent = character.name;
    card.appendChild(cardName);

    // get photo and add
    let cardImg = document.createElement("img");
    cardImg.src = character.image;
    card.appendChild(cardImg);

    // descriptions
    let cardStatus = document.createElement("p");
    cardStatus.textContent = "Status: " + character.status;
    card.appendChild(cardStatus);

    let cardSpecies = document.createElement("p");
    cardSpecies.textContent = "Species: " + character.species;
    card.appendChild(cardSpecies);

    // favorite checkbox
    let favoriteLabel = document.createElement("label");
    favoriteLabel.textContent = "Favorite";
    favoriteLabel.htmlFor = "box" + characterCounter;
    card.appendChild(favoriteLabel);

    let favoriteBox = document.createElement("input");
    favoriteBox.type = "checkbox";
    favoriteBox.id = "box" + characterCounter;
    card.appendChild(favoriteBox);
    characterCounter += 1;

    // Add event listeners to check box
    favoriteBox.addEventListener("change", updateFavorites);
  }
  // get all checkboxes
  allCheckboxes = document.querySelectorAll("input[type='checkbox']");

  // check for local storage
  if (localStorage["storageFavorites"]) {
    favorites = JSON.parse(localStorage.getItem("storageFavorites"));

    // re-check the saved boxes
    for (const id of favorites) {
      let box = document.querySelector("#box" + id);
      //   if box is assigned (found using id from favorites)
      if (box) box.checked = true;
    }

    //   updateFavorites(); this does not work here so re write end of updateFavorites function
    favHeader.textContent = "Favorites";
    for (const div of favorites) {
      let favCard = document.getElementById(div);
      //   Clone card
      let cloneFavCard = favCard.cloneNode(true);
      // Remove ID from clone
      cloneFavCard.id = "";
      favoriteSection.appendChild(cloneFavCard);
    }
  }
}
// call function to render cards
apiCall();

function updateFavorites() {
  favorites = [];
  for (const checkBox of allCheckboxes) {
    if (checkBox.checked) {
        // remove "box" from id and just add the number to favorites array 
      favorites.push(checkBox.id.replace("box", ""));
    }
  }
  localStorage.setItem("storageFavorites", JSON.stringify(favorites));

  // wipe favorite section
  favoriteSection.innerHTML = "";

  // add title
  if (favorites.length === 1) {
    favHeader.textContent = "Favorites";
  }

// Loop through and cards to favorite section
  for (const div of favorites) {
    let favCard = document.getElementById(div);
    let cloneFavCard = favCard.cloneNode(true);
    // Remove ID from clone
    cloneFavCard.id = "";
    favoriteSection.appendChild(cloneFavCard);
  }
}

// Clear memory
clearButton.addEventListener("click", clearMemory);

function clearMemory() {
  favorites = [];
  localStorage.clear();
  favoriteSection.innerHTML = "";
  favHeader.innerHTML = "";

  // uncheck all boxes
  for (const box of allCheckboxes) {
    box.checked = false;
  }
}
