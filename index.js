//Game Elements
import {checkForWin, compGame} from './game.js';
console.log();
let board = [], roundOver = false, player = 'X', comp = 'O';

reset();

function check(){
    let {hasWon, winner} = checkForWin(board, player);
    if (hasWon) {
        roundOver = true;
        alert((winner === player) ? 'Yay! You won' : 'Oops, I won');
    }
    if(!roundOver && !hasSpace(board)){
        roundOver = true;
        alert('It\'s a Tie');
    }
}

function hasSpace(board){
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
        setTimeout(check, 100);
        setTimeout(() => {
        if (!roundOver) {
            let {i, j} = compGame(board, player, comp, hasSpace);
            board[i][j] = comp;
            if(!roundOver){
                let box = document.querySelector(`.squares[data-i = "${i}"][data-j = "${j}"]`);
                box.innerText = comp;
                setTimeout(check, 300);
            }
        }}, 150);
    });
});

function clearScreen(){
    squares.forEach(el => {el.innerText = '';});
    if(document.getElementById('playAs').value === 'O'){
        board[1][1] = comp;
        let box = document.querySelector(`.squares[data-i = "1"][data-j = "1"]`);
        box.innerText = comp;
    }
}

function playerGame(event){
    event.target.innerText = player;
    board[+event.target.getAttribute('data-i')][+event.target.getAttribute('data-j')] = player;
}
choose.addEventListener('input', (event) => {
    player = (event.target.value === 'X') ? 'X' : 'O';
    comp = (player === 'O') ? 'X' : 'O';
    if(comp === 'X' && !roundOver){
        board[1][1] = comp;
        let box = document.querySelector(`.squares[data-i = "1"][data-j = "1"]`);
        box.innerText = comp;
    }
});
restart.addEventListener('click', () => {reset(); clearScreen()});
