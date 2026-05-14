// script.js — JOGO DA VELHA FUNCIONANDO 100%

document.addEventListener(
  "DOMContentLoaded",
  ()=>{

    const cells =
    document.querySelectorAll(".cell");

    const statusText =
    document.getElementById("status");

    const restartBtn =
    document.getElementById("restartBtn");

    const resetScoreBtn =
    document.getElementById("resetScoreBtn");

    const scoreXText =
    document.getElementById("scoreX");

    const scoreOText =
    document.getElementById("scoreO");

    const winnerScreen =
    document.getElementById("winnerScreen");

    const winnerText =
    document.getElementById("winnerText");

    const playAgain =
    document.getElementById("playAgain");

    let currentPlayer = "X";

    let gameRunning = true;

    let board = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ];

    let scoreX =
    Number(
      localStorage.getItem("scoreX")
    ) || 0;

    let scoreO =
    Number(
      localStorage.getItem("scoreO")
    ) || 0;

    scoreXText.textContent =
    scoreX;

    scoreOText.textContent =
    scoreO;

    const winPatterns = [

      [0,1,2],
      [3,4,5],
      [6,7,8],

      [0,3,6],
      [1,4,7],
      [2,5,8],

      [0,4,8],
      [2,4,6]

    ];

    cells.forEach((cell,index)=>{

      cell.addEventListener(
        "click",
        ()=>{

          if(
            board[index] !== "" ||
            !gameRunning
          ){

            return;

          }

          board[index] =
          currentPlayer;

          cell.textContent =
          currentPlayer;

          if(currentPlayer === "X"){

            cell.classList.add("x");

          }

          else{

            cell.classList.add("o");

          }

          checkWinner();

          if(gameRunning){

            currentPlayer =
            currentPlayer === "X"
            ? "O"
            : "X";

            statusText.textContent =
            `Vez do Jogador ${currentPlayer}`;

          }

        }
      );

    });

    function checkWinner(){

      let winner = null;

      winPatterns.forEach(pattern=>{

        const [a,b,c] = pattern;

        if(

          board[a] &&
          board[a] === board[b] &&
          board[a] === board[c]

        ){

          winner = board[a];

          cells[a].classList.add("win");
          cells[b].classList.add("win");
          cells[c].classList.add("win");

        }

      });

      if(winner){

        statusText.textContent =
        `🏆 Jogador ${winner} venceu`;

        winnerText.textContent =
        `🏆 Jogador ${winner} venceu`;

        winnerScreen.classList.remove(
          "hidden"
        );

        if(winner === "X"){

          scoreX++;

          localStorage.setItem(
            "scoreX",
            scoreX
          );

          scoreXText.textContent =
          scoreX;

        }

        else{

          scoreO++;

          localStorage.setItem(
            "scoreO",
            scoreO
          );

          scoreOText.textContent =
          scoreO;

        }

        gameRunning = false;

        return;

      }

      if(!board.includes("")){

        statusText.textContent =
        "🤝 Empate";

        winnerText.textContent =
        "🤝 Empate";

        winnerScreen.classList.remove(
          "hidden"
        );

        gameRunning = false;

      }

    }

    function restartGame(){

      board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ];

      currentPlayer = "X";

      gameRunning = true;

      statusText.textContent =
      "Vez do Jogador X";

      cells.forEach(cell=>{

        cell.textContent = "";

        cell.classList.remove(
          "x",
          "o",
          "win"
        );

      });

      winnerScreen.classList.add(
        "hidden"
      );

    }

    restartBtn.addEventListener(
      "click",
      restartGame
    );

    playAgain.addEventListener(
      "click",
      restartGame
    );

    resetScoreBtn.addEventListener(
      "click",
      ()=>{

        scoreX = 0;

        scoreO = 0;

        localStorage.removeItem(
          "scoreX"
        );

        localStorage.removeItem(
          "scoreO"
        );

        scoreXText.textContent = 0;

        scoreOText.textContent = 0;

      }
    );

  }
);