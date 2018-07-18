/* Settings */
const maxAttempts = 5;
const phrases = [
  "be the reason someone smiles",
  "make improvements instead of execuses",
  "playing wheel of success is enjoyable",
  "the only thing we need to fear is fear itself",
  "life is short and focus on what really matters",
  "it is no use going back to yesterday",
  "hardship prepares an excellent person",
  "a bird is safe in its nest",
  "I know I do not know anything",
  "it is never too late"
];

/* Initialization */
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const phraseCharList = phrase.getElementsByTagName("ul")[0];
const startBtn = document.getElementsByClassName("btn__reset")[0];
const overlay = document.getElementById("overlay");
const lifeItem = document.getElementsByClassName("tries");
const hint = document.createElement("p");
hint.className = "hint";
hint.textContent = "";
overlay.appendChild(hint);
var missed = 0;
var numMatchedLetters = 0;
var answer;

function reset() {
  answer = getRandomPhraseArray(phrases);
  missed = 0;
  numMatchedLetters = 0;
  addPhraseToDisplay(answer);
  dispLife();
  let buttons = qwerty.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; ++i) {
    buttons[i].classList.remove("chosen");
    buttons[i].removeAttribute("disabled");
    buttons[i].style.cursor = "pointer";
  }
}

function getRandomPhraseArray(arr){
  return arr[Math.floor(Math.random() * arr.length)].split('');
}

function addPhraseToDisplay(arr) {
  while (phraseCharList.hasChildNodes()) {
    phraseCharList.removeChild(phraseCharList.lastChild);
  }
  for (let i = 0; i < arr.length; ++i) {
    let item = document.createElement("li");
    item.textContent = arr[i].toUpperCase();
    phraseCharList.appendChild(item);
    if (arr[i] !== ' ')
      item.setAttribute("class", "letter");
  }
}

/* Overlay */
startBtn.addEventListener("click", (event) => {
  overlay.className += " slide-up";
  reset();
});

/* Game */
function checkLetter(button) {
  let letter = button.textContent;
  let allLetterElems = phraseCharList.getElementsByClassName("letter");
  let isMatched = false;
  for (let i = 0; i < allLetterElems.length; ++i) {
    if (letter.toUpperCase() == allLetterElems[i].textContent) {
      isMatched = true;
      numMatchedLetters += 1;
      allLetterElems[i].className += " show";
    }
  }
  if (isMatched)
    return letter;
  else
    return null;
}

qwerty.addEventListener("click", (event) => {
  let letterFound = null;
  let button = event.target;
  if (button.tagName.toLowerCase() == "button") {
    letterFound = checkLetter(button);
    button.setAttribute("disabled", "disabled");
    button.setAttribute("class", "chosen");
    button.style.cursor = "default";
    if (letterFound === null) {
      missed += 1;
    }
    dispLife();
    checkWin();
  }
})

/* Status Checking */
function checkWin() {
  if (missed >= maxAttempts) {
    overlay.setAttribute("class", "lose");
    hint.textContent = "You lose. Try again!";
    startBtn.textContent = "Reset and Restart";
  } else {
    if (numMatchedLetters >= phraseCharList.getElementsByClassName("letter").length) {
      overlay.setAttribute("class", "win");
      hint.textContent = "You win!";
      startBtn.textContent = "Reset and Restart";
    }
  }
}

/* Life Display */
function dispLife() {
  let life = maxAttempts - missed;
  for (let i = 0; i < maxAttempts; ++i) {
    if (i < life) {
      lifeItem[i].getElementsByTagName("img")[0].setAttribute("src", "images/liveHeart.png");
    } else {
      lifeItem[i].getElementsByTagName("img")[0].setAttribute("src", "images/lostHeart.png");
    }
  }
}
