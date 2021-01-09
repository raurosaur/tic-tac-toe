//Game Elements
const checkRow = function (board) {
    for (let i = 0; i < board.length; i++) {
        let initial = board[i][0], aWin = true;
        for (let j = 1; j < board[i].length; j++) {
            if (!board[i][j] || initial !== board[i][j]) {
                aWin = false;
                break;
            }
        }
        if (aWin)
            return { hasWon: true, winner: initial };
    }
    return { hasWon: false, winner: undefined };
},
checkColumn = function (board) {
    for (let i = 0; i < board.length; i++) {
        let initial = board[0][i], aWin = true;

        for (let j = 0; j < 3; j++) {
            if (!board[j][i] || initial !== board[j][i]) {
                aWin = false;
                break;
            }
        }

        if (aWin)
            return { hasWon: true, winner: initial };
    }
    return { hasWon: false, winner: undefined };
},
checkDiagonal = function (board) {
    let topLeft = board[0][0], topRight = board[0][3], aWin = true;
    for (let i = 0; i < 3; i++) {
        if (!board[i][i] || board[i][i] !== topLeft) {
            aWin = false;
            break;
        }
    }
    if (aWin)
        return { hasWon: true, winner: topLeft };
    aWin = true;
    for (let i = 0, j = 2; i < 3; i++, j--) {
        if (!board[i][j] || topRight !== board[i][j]) {
            aWin = false;
            break;
        }
    }
    if (aWin)
        return { hasWon: true, winner: topRight };
    else
        return { hasWon: false, winner: undefined };
};

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