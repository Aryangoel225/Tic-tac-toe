// select html elements
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// store the game board on a 2D array
const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// store the current player
let currentPlayer = 'X';

// Track whether the game is over
let gameOver = false;

cells.forEach((cell, index) => {
    cell.addEventListener('click', () =>{
        handleCellClick(index);
    })
});

// reset the game
restartBtn.addEventListener('click', () => { 
   board.forEach(row => row.fill(null));
    cells.forEach(cell => (cell.textContent = ""));
    currentPlayer = 'X';
    gameOver = false;
    statusText.textContent = ``;
})

// handles the click of cell
function handleCellClick(index){
    if (gameOver) return;
    // Check if the cell is already taken. 
    if(board[Math.floor(index / 3)][index % 3] !== null){
        return;
    } 
    // Updates board and UI
    board[Math.floor(index / 3)][index % 3] = currentPlayer;
    cells[index].textContent = currentPlayer;

    // check if game has finished
    checkGame()
    if (gameOver) return;

    //Switch to next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player: ${currentPlayer}`;

}

function checkGame(){
//check if the game is finished
    function checkLine(a ,b ,c){
        return a === b && b === c && a !== null;
    }
// check columns
    for(let i = 0; i < 3; i++){
       if(checkLine(board[i][0], board[i][1], board[i][2])){
            gameOver = true;
            statusText.textContent = `Player ${currentPlayer} wins!`;
            return;
       }
    }
// check rows
for(let i = 0; i < 3; i++){
    if(checkLine(board[0][i], board[1][i], board[2][i])){
     gameOver = true;
         statusText.textContent = `Player ${currentPlayer} wins!`;
         return;
    }
 }
// check diagonals
if (
    checkLine(board[0][0], board[1][1], board[2][2]) ||
    checkLine(board[0][2], board[1][1], board[2][0])
) {
    gameOver = true;
    statusText.textContent = `Player ${currentPlayer} wins!`;
    return;
}

// check for draw 
if(board.flat().every(cell => cell !==null)){
    gameOver = true;
    statusText.textContent = "It's a draw!";
    return;
}
}



