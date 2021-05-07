const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let selections = [];
let firstMoveOfTurn = true;
let preventClick = false;

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
  if (preventClick) return;
  if (firstMoveOfTurn) {
    card1 = e.target;
    card1Value = card1.classList.value;
    selections.push(card1Value);
    giveBackgroundColor(e);
    firstMoveOfTurn = false;
    return;
  }
  preventClick = true;
  firstMoveOfTurn = true;
  card2 = e.target;
  card2Value = card2.classList.value;
  selections.push(card2Value);
  giveBackgroundColor(e);
  setTimeout(function () {
    checkIfCardsMatch(selections);
    if (!match) {
      removeBackgroundColor();
    }
    preventClick = false;
    selections = [];
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

function checkIfCardsMatch(selections) {
  if (card1 === card2) {
    return (match = false);
  } else if (selections[0] === selections[1]) {
    return (match = true);
  }
  return (match = false);
}

// !
// *
// ?
