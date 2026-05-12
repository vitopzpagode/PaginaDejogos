// script.js — PEDRA PAPEL TESOURA MULTIPLAYER FINAL

const choices =
document.querySelectorAll(".choice");

const turnText =
document.getElementById("turnText");

const resultText =
document.getElementById("resultText");

const score1Text =
document.getElementById("score1");

const score2Text =
document.getElementById("score2");

const choice1Box =
document.getElementById("choice1");

const choice2Box =
document.getElementById("choice2");

const player1Input =
document.getElementById("player1");

const player2Input =
document.getElementById("player2");

const player1Name =
document.getElementById("player1Name");

const player2Name =
document.getElementById("player2Name");

const restartBtn =
document.getElementById("restartBtn");

const resetScoreBtn =
document.getElementById("resetScoreBtn");

const winnerScreen =
document.getElementById("winnerScreen");

const winnerTitle =
document.getElementById("winnerTitle");

const winnerMessage =
document.getElementById("winnerMessage");

const playAgainBtn =
document.getElementById("playAgainBtn");

/* ESTADO */

let currentPlayer = 1;

let player1Choice = "";

let player2Choice = "";

let scores = {

  player1:
  Number(
    localStorage.getItem(
      "rpsScore1"
    )
  ) || 0,

  player2:
  Number(
    localStorage.getItem(
      "rpsScore2"
    )
  ) || 0

};

updateScores();

/* EVENTOS */

choices.forEach(choice => {

  choice.addEventListener(
    "click",
    () => {

      handleChoice(
        choice.dataset.choice
      );

    }
  );

});

restartBtn.addEventListener(
  "click",
  restartMatch
);

resetScoreBtn.addEventListener(
  "click",
  resetScores
);

playAgainBtn.addEventListener(
  "click",
  () => {

    winnerScreen.classList.add(
      "hidden"
    );

    restartMatch();

  }
);

player1Input.addEventListener(
  "input",
  updateNames
);

player2Input.addEventListener(
  "input",
  updateNames
);

/* NOMES */

function updateNames(){

  player1Name.textContent =
  player1Input.value ||
  "Jogador 1";

  player2Name.textContent =
  player2Input.value ||
  "Jogador 2";

  updateTurn();

}

/* ESCOLHAS */

function handleChoice(choice){

  /* JOGADOR 1 */

  if(currentPlayer === 1){

    player1Choice = choice;

    choice1Box.textContent =
    "🔒";

    resultText.innerHTML =
    `
    ${getPlayerName(1)}
    já escolheu.
    <br><br>

    Passe para
    ${getPlayerName(2)}.
    `;

    currentPlayer = 2;

    updateTurn();

    return;

  }

  /* JOGADOR 2 */

  player2Choice = choice;

  choice2Box.textContent =
  "🔒";

  determineWinner();

}

/* DEFINIR VENCEDOR */

function determineWinner(){

  const p1 =
  player1Choice;

  const p2 =
  player2Choice;

  /* REVELAR JOGADAS */

  choice1Box.textContent =
  getEmoji(p1);

  choice2Box.textContent =
  getEmoji(p2);

  let winner = "";

  /* EMPATE */

  if(p1 === p2){

    resultText.innerHTML =
    `
    EMPATE!
    `;

    showWinnerScreen(
      "EMPATE",
      `
      Ambos escolheram
      ${p1.toUpperCase()}.
      `
    );

    return;

  }

  /* VITÓRIA JOGADOR 1 */

  if(

    (p1 === "pedra" &&
    p2 === "tesoura")

    ||

    (p1 === "papel" &&
    p2 === "pedra")

    ||

    (p1 === "tesoura" &&
    p2 === "papel")

  ){

    winner =
    getPlayerName(1);

    scores.player1++;

  }

  /* VITÓRIA JOGADOR 2 */

  else{

    winner =
    getPlayerName(2);

    scores.player2++;

  }

  localStorage.setItem(
    "rpsScore1",
    scores.player1
  );

  localStorage.setItem(
    "rpsScore2",
    scores.player2
  );

  updateScores();

  resultText.innerHTML =
  `
  ${winner} venceu!
  `;

  showWinnerScreen(
    "VITÓRIA",
    `
    ${winner} venceu a rodada!
    `
  );

}

/* TELA FINAL */

function showWinnerScreen(
  title,
  text
){

  winnerTitle.textContent =
  title;

  winnerMessage.innerHTML =
  `
  ${text}
  <br><br>

  ${getPlayerName(1)}:
  ${scores.player1}
  pontos
  <br>

  ${getPlayerName(2)}:
  ${scores.player2}
  pontos
  `;

  winnerScreen.classList.remove(
    "hidden"
  );

}

/* REINICIAR PARTIDA */

function restartMatch(){

  currentPlayer = 1;

  player1Choice = "";

  player2Choice = "";

  choice1Box.textContent = "?";

  choice2Box.textContent = "?";

  resultText.innerHTML =
  `
  Escolham suas jogadas
  `;

  updateTurn();

}

/* RESETAR SCORE */

function resetScores(){

  scores.player1 = 0;

  scores.player2 = 0;

  localStorage.setItem(
    "rpsScore1",
    0
  );

  localStorage.setItem(
    "rpsScore2",
    0
  );

  updateScores();

  restartMatch();

}

/* PLACAR */

function updateScores(){

  score1Text.textContent =
  scores.player1;

  score2Text.textContent =
  scores.player2;

}

/* TURNO */

function updateTurn(){

  turnText.textContent =
  currentPlayer === 1
  ?
  `Vez de ${getPlayerName(1)}`
  :
  `Vez de ${getPlayerName(2)}`;

}

/* PEGAR NOME */

function getPlayerName(player){

  if(player === 1){

    return (
      player1Input.value ||
      "Jogador 1"
    );

  }

  return (
    player2Input.value ||
    "Jogador 2"
  );

}

/* PEGAR EMOJI */

function getEmoji(choice){

  if(choice === "pedra"){

    return "🪨";

  }

  if(choice === "papel"){

    return "📄";

  }

  return "✂️";

}

/* INICIAR */

updateNames();

restartMatch();