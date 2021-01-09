//Game Elements
import {checkColumn, checkRow, checkDiagonal} from './game.js';
console.log();
let board = [], roundOver = false, player = 'O', comp = 'X';

reset();

const checkForWin = function(){
    let result = checkRow(board);
    if(result.hasWon)
        return result;
    result = checkColumn(board);
    if(result.hasWon)
        return result;
    return checkDiagonal(board);
};

function compGame(){
    const getRandom = function() {
        return Math.floor(Math.random() * 9);
    }
    if(hasSpace())
        while(true){
            let number = getRandom();
            if(!squares[number].textContent){
                board[+squares[number].getAttribute('data-i')][+squares[number].getAttribute('data-j')] = comp;
                squares[number].textContent = comp;
                break;
            }
        }
}

function check(){
    let { hasWon, winner } = checkForWin();
    if (hasWon) {
        roundOver = true;
        alert((winner === player) ? 'Yay! You won' : 'Oops, I won');
    }
    if(!hasSpace()){
        roundOver = true;
        alert('It\'s a Tie');
    }
}

function hasSpace(){
    for (let i of board) {
        for (let e of i)
            if (!e) return true;
    }
    return false;
}
function reset(){
    board = [];
    for (let i = 0; i < 3; i++) {
        board.push(['', '', '']);
    };
    roundOver = false;
}
//DOM Elements
const squares = document.querySelectorAll('.squares'),
restart = document.getElementsByClassName('restart')[0],
choose = document.getElementById('playAs');

squares.forEach(el => {
    el.addEventListener('click', (event) => {
        if(roundOver || event.target.innerText !== '')
            return;
        playerGame(event);
        if(!roundOver) compGame();
        setTimeout(check, 300);
    });
});

function clearScreen(){
    squares.forEach(el => {el.innerText = '';});
}

function playerGame(event){
    event.target.innerText = player;
    board[+event.target.getAttribute('data-i')][+event.target.getAttribute('data-j')] = player;
}
choose.addEventListener('input', (event) => {
    player = (event.target.value === 'X') ? 'X' : 'O';
    comp = (player === 'O') ? 'X' : 'O';
    if(comp === 'O' && !roundOver) 
        compGame();
});
restart.addEventListener('click', () => {reset(); clearScreen()});