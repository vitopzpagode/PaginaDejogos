// script.js — CORREÇÃO DEFINITIVA DO PLAY AGAIN

const startBtn =
document.getElementById("startBtn");

const guessBtn =
document.getElementById("guessBtn");

const restartBtn =
document.getElementById("restartBtn");

const playAgainBtn =
document.getElementById("playAgainBtn");

const guessInput =
document.getElementById("guessInput");

const difficulty =
document.getElementById("difficulty");

const message =
document.getElementById("message");

const attemptsText =
document.getElementById("attempts");

const turnText =
document.getElementById("turnText");

const score1Text =
document.getElementById("score1");

const score2Text =
document.getElementById("score2");

const recordText =
document.getElementById("record");

const winnerText =
document.getElementById("winnerText");

const victoryScreen =
document.getElementById("victoryScreen");

const name1 =
document.getElementById("name1");

const name2 =
document.getElementById("name2");

const player1Input =
document.getElementById("player1");

const player2Input =
document.getElementById("player2");

let secretNumber = 0;

let attempts = 0;

let currentPlayer = 1;

let maxNumber = 100;

let gameStarted = false;

let scores = {
  player1:0,
  player2:0
};

let bestRecord =
localStorage.getItem(
  "numberHunterRecord"
) || 0;

recordText.textContent =
bestRecord;

/* EVENTOS */

startBtn.addEventListener(
  "click",
  startGame
);

guessBtn.addEventListener(
  "click",
  makeGuess
);

restartBtn.addEventListener(
  "click",
  restartGame
);

/* BOTÃO PLAY AGAIN */

playAgainBtn.onclick = () => {

  victoryScreen.classList.add(
    "hidden"
  );

  setTimeout(() => {

    startGame();

  }, 100);

};

guessInput.addEventListener(
  "keydown",
  event => {

    if(event.key === "Enter"){

      makeGuess();

    }

  }
);

/* INICIAR */

function startGame(){

  const diff =
  difficulty.value;

  if(diff === "easy"){

    maxNumber = 50;

  }

  if(diff === "medium"){

    maxNumber = 100;

  }

  if(diff === "hard"){

    maxNumber = 300;

  }

  if(diff === "insane"){

    maxNumber = 1000;

  }

  secretNumber =
  Math.floor(
    Math.random() * maxNumber
  ) + 1;

  attempts = 0;

  currentPlayer = 1;

  gameStarted = true;

  guessInput.disabled = false;

  guessBtn.disabled = false;

  guessInput.value = "";

  updatePlayers();

  updateAttempts();

  updateTurn();

  message.innerHTML =
  `
  O número secreto foi gerado.<br>
  Intervalo: 1 até ${maxNumber}
  `;

  guessInput.focus();

}

/* PALPITE */

function makeGuess(){

  if(!gameStarted) return;

  const guess =
  Number(guessInput.value);

  if(
    !guess ||
    guess < 1 ||
    guess > maxNumber
  ){

    message.innerHTML =
    `
    Digite um número válido
    entre 1 e ${maxNumber}
    `;

    return;

  }

  attempts++;

  updateAttempts();

  const playerName =
  currentPlayer === 1
  ?
  (
    player1Input.value ||
    "Jogador 1"
  )
  :
  (
    player2Input.value ||
    "Jogador 2"
  );

  /* ACERTOU */

  if(guess === secretNumber){

    handleVictory(playerName);

    return;

  }

  /* DICAS */

  if(guess < secretNumber){

    message.innerHTML =
    `
    ${playerName} errou.<br>
    O número secreto é MAIOR.
    `;

  }else{

    message.innerHTML =
    `
    ${playerName} errou.<br>
    O número secreto é MENOR.
    `;

  }

  switchPlayer();

  guessInput.value = "";

  guessInput.focus();

}

/* VITÓRIA */

function handleVictory(playerName){

  gameStarted = false;

  guessInput.disabled = true;

  guessBtn.disabled = true;

  message.innerHTML =
  `
  ${playerName} acertou!
  `;

  if(currentPlayer === 1){

    scores.player1++;

  }else{

    scores.player2++;

  }

  updateScores();

  if(
    bestRecord == 0 ||
    attempts < bestRecord
  ){

    bestRecord = attempts;

    localStorage.setItem(
      "numberHunterRecord",
      bestRecord
    );

    recordText.textContent =
    bestRecord;

  }

  winnerText.innerHTML =
  `
  ${playerName} venceu!<br><br>

  Número secreto:
  <strong>${secretNumber}</strong><br>

  Tentativas:
  <strong>${attempts}</strong>
  `;

  victoryScreen.classList.remove(
    "hidden"
  );

}

/* TROCAR JOGADOR */

function switchPlayer(){

  currentPlayer =
  currentPlayer === 1
  ? 2
  : 1;

  updateTurn();

}

/* TURNO */

function updateTurn(){

  const playerName =
  currentPlayer === 1
  ?
  (
    player1Input.value ||
    "Jogador 1"
  )
  :
  (
    player2Input.value ||
    "Jogador 2"
  );

  turnText.textContent =
  `Vez de: ${playerName}`;

}

/* TENTATIVAS */

function updateAttempts(){

  attemptsText.textContent =
  attempts;

}

/* SCORE */

function updateScores(){

  score1Text.textContent =
  scores.player1;

  score2Text.textContent =
  scores.player2;

}

/* NOMES */

function updatePlayers(){

  name1.textContent =
  player1Input.value ||
  "Jogador 1";

  name2.textContent =
  player2Input.value ||
  "Jogador 2";

}

/* RESTART */

function restartGame(){

  gameStarted = false;

  attempts = 0;

  guessInput.value = "";

  guessInput.disabled = true;

  guessBtn.disabled = true;

  attemptsText.textContent = "0";

  turnText.textContent =
  "Clique em iniciar";

  message.textContent =
  "O jogo ainda não começou.";

}