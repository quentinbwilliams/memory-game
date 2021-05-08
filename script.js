const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let firstMoveOfTurn = true;
let preventClick = false;
let matchedCards = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    gameContainer.append(newDiv);
    newDiv.addEventListener("click", handleCardClick);
  }
}

createDivsForColors(shuffledColors);

function handleCardClick(e) {
  if (matchedCards.includes(e.target)) return;
  if (preventClick) return;
  if (firstMoveOfTurn) {
    card1 = e.target;
    card1Value = card1.classList.value;
    giveBackgroundColor(e);
    firstMoveOfTurn = false;
    return;
  }
  preventClick = true;
  firstMoveOfTurn = true;
  card2 = e.target;
  card2Value = card2.classList.value;
  giveBackgroundColor(e);
  setTimeout(function () {
    checkIfCardsMatch();
    if (!match) {
      removeBackgroundColor();
    }
    preventClick = false;
  }, 1000);
  return;
}

function giveBackgroundColor(e) {
  color = e.target.classList.value;
  e.target.style.backgroundColor = color;
}

function removeBackgroundColor() {
  card1.style.backgroundColor = "";
  card2.style.backgroundColor = "";
}

function checkIfCardsMatch() {
  if (card1 === card2) {
    return (match = false);
  } else if (card1Value === card2Value) {
    matchedCards.push(card1, card2);
    return (match = true);
  }
  return (match = false);
}

// !
// *
// ?
