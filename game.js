const checkForWin = function (board, player) {
    let winner, score = 0, hasWon = false;
    for(let i =0; i < 3; i++)
        if(board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
            winner = board[i][0];
            score = (winner === player) ? -10: 10;
            hasWon = true;
            return { hasWon, winner, score };
        }
    for (let i = 0; i < 3; i++)
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]){
            winner = board[0][i];
            score = (winner === player) ? -10 : 10;
            hasWon = true;
            return { hasWon, winner, score };
        }
    if(board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
        hasWon = true;
        winner = board[0][0];
        score = (winner === player) ? -10: 10;
    }
    else if(board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
        hasWon = true;
        winner = board[0][2];
        score = (winner === player) ? -10 : 10;
    }
    return { hasWon, winner, score };
};


const compGame = function (board, player, comp, hasSpace) {
    function findBestMove() {
        let best = -Infinity,
        bestMove;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    board[i][j] = comp;
                    let score = minimax(board, 0, false);
                    board[i][j] = '';
                    if(score > best){
                        bestMove = {i, j};
                        best = score;
                    }
                }
            }
        }

        return bestMove;
    }
    function minimax(depth, isMax) {
        let {score} = checkForWin(board, player);
        if(score === 10 || score === -10)
            return score;
        if(!hasSpace(board))
            return 0;
        if(isMax){
            let best = -Infinity;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(!board[i][j]){
                        board[i][j] = comp;
                        best = Math.max(best, minimax(depth+1, !isMax));
                        board[i][j] = '';
                    }
                }//end inner for
            }//end outer for
            return best;
        }//end if(isMax) 
        else{
            let best = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (!board[i][j]) {
                        board[i][j] = player;
                        best = Math.min(best, minimax(depth + 1, !isMax));
                        board[i][j] = '';
                    }
                }//end inner for
            }//end outer for
            return best;
        }
    }//end minimax

    return findBestMove();
};


export { checkForWin, compGame};