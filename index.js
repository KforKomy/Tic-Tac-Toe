class Player {
  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
    this.score = 0;
  }
  Win() {
    this.score++;
  }
  resetScore() {
    this.score = 0;
  }
}
class Board {
  boardDOM = document.querySelector("#grid");
  constructor() {
    this.boardarr = Array(9).fill("");
  }
  placeMark(index, mark) {
    if (this.boardarr[index] !== "") return false;
    this.boardarr[index] = mark;
    return true;
  }
  reset() {
    this.boardarr.fill("");
  }
  isfull() {
    return this.boardarr.every((cell) => cell !== "");
  }
}
class GameManager {
    winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];
gameOver = false;
  player1 = new Player("", "X");
  player2 = new Player("", "O");
  gameover=false;
  currentPlayer = this.player1;
  board = new Board();
  playBtn = document.querySelector("#playBtn");
  resetBtn=document.querySelector("#resetBtn")

  constructor() {
    this.playBtn.addEventListener("click", () => {
        if(this.getPlayerNames()){
          this.gameOver=false
      this.displayPlayersInfo();
      this.displayCells();
      this.board.reset();
      }
    });
    this.resetBtn.addEventListener("click",()=>{
        this.gameOver=false;
        this.player1.resetScore();
        this.player2.resetScore();
        this.displayPlayersInfo()
        this.board.reset();
        this.displayCells();
        console.log("test")
    })
  }
  displayPlayersInfo(){
    document.querySelector("#player1Info").textContent=`${this.player1.name} Score is : ${this.player1.score}`
    document.querySelector("#player2Info").textContent=`${this.player2.name} Score is : ${this.player2.score}`
  }
  getPlayerNames() {
    this.player1.name = document.querySelector("#nameInput1").value;
    this.player2.name = document.querySelector("#nameInput2").value;
    if(this.player1.name==""||this.player2.name==""){ 

            alert("Please enter both player names.");
             return false;;
        }
        console.log(this.player1.name, this.player2.name);
        return true;
  }
  displayCells() {
    this.board.boardDOM.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("id", `cell-${i}`);
      this.board.boardDOM.appendChild(cell);
    cell.addEventListener("click", () => {
        if (this.gameOver) return;

        const success = this.board.placeMark(i, this.currentPlayer.mark);

        if (!success) return;

        cell.textContent = this.currentPlayer.mark;

        if (this.checkWinner()) {
            this.currentPlayer.Win();
            this.displayPlayersInfo();

            this.gameOver = true;

            alert(`${this.currentPlayer.name} Wins!`);
            return;
        }

        if (this.board.isfull()) {
            this.gameOver = true;
            alert("It's a tie!");
            return;
        }

        this.changeTurn();
    });
    }
  }
  changeTurn() {
    this.currentPlayer == this.player1
      ? (this.currentPlayer = this.player2)
      : (this.currentPlayer = this.player1);
  }
  checkWinner() {
    const board = this.board.boardarr;

    for (const [a, b, c] of this.winningCombinations) {
        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return true;
        }
    }

    return false;
}

}
const gm = new GameManager();
