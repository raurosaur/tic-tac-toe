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

export {checkColumn, checkRow, checkDiagonal};