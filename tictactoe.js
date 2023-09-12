let gameState = ['','','','','','','','',''];
let currentPlayer = 'X';
let gameActive = true;

const cell = document.querySelectorAll('.cell');
cell.forEach(cell => cell.addEventListener('click',handleCellClick));
const turnNotification = () => document.querySelector('.message').innerHTML = `It's ${currentPlayer} turn`;
document.querySelector('.reset-button').addEventListener('click', handleResetGame);

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
    if(gameState[clickedCellIndex] !== '' || !gameActive)
        return;
    
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function handleResultValidation(){
    let roundWon = false;
    for(let i = 0; i <= 7; i++){
        const winCondition = winConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '',b === '',c === ''){
            continue;
        } 
        if(a === b && b === c){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        document.querySelector('.message').innerHTML = `${currentPlayer} has won`;
        gameActive = false;
        return;
    }
    roundDraw = !gameState.includes('');
    if(roundDraw){
        document.querySelector('.message').innerHTML = 'Game ended in a draw';
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handlePlayerChange(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnNotification();
}

function handleResetGame(){
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['','','','','','','','',''];
    cell.forEach(cell => cell.innerHTML = '');
    turnNotification();
}