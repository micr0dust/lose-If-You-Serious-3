const winState = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const board = Array(9).fill(' ');
const players = ['O', 'X'];
let counter = 0;

function printBoard(board) {
    for (let i = 0; i < 9; i++)
        document.getElementById('btn' + i).innerText = board[i];
}

function getLegalMoves(board) {
    return board.map((val, idx) => val === ' ' ? idx : null).filter(val => val !== null);
}

function positionOccupied(board, position) {
    return board[position] !== ' ';
}

function boardIsFull(board) {
    return !board.includes(' ');
}

function checkWinLine(board) {
    for (let i = 0; i < 8; i++) {
        if (board[winState[i][0]] === board[winState[i][1]] && board[winState[i][1]] === board[winState[i][2]] && board[winState[i][0]] !== ' ') {
            return winState[i];
        }
    }
    return [];
}

function minimax(board, isMe, alpha, beta, team) {
    const winline = checkWinLine(board);
    if (winline.length > 0) return isMe ? -1 : 1;
    if (boardIsFull(board)) return 0;

    if (isMe) {
        let bestScore = -Infinity;
        for (const move of getLegalMoves(board)) {
            board[move] = players[team%2];
            const score = minimax(board, false, alpha, beta, team);
            board[move] = ' ';
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) {
                break;
            }
        }
        return bestScore;
    }

    let bestScore = Infinity;
    for (const move of getLegalMoves(board)) {
        board[move] = players[(team+1)%2];
        const score = minimax(board, true, alpha, beta, team);
        board[move] = ' ';
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) {
            break;
        }
    }
    return bestScore;
}

function AlphaBetaMove(team) {
    const role = players[team%2];
    let bestScore = -Infinity;
    let bestMove = -1;
    for (const move of getLegalMoves(board)) {
        board[move] = role;
        const score = minimax(board, false, -Infinity, Infinity, team);
        board[move] = ' ';
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }
    board[bestMove] = role;
}

function next(ele){
    const id = ele.id;
    
    const legalMoves = getLegalMoves(board);

    if (legalMoves.length > 0) {
        const move = parseInt(id[3]);
        if (counter!=2 && positionOccupied(board, move)) return;
        board[move] = players[++counter%2];
    } else {
        end();
        return;
    }

    const winline = checkWinLine(board);
    if (winline.length > 0) {
        end(winline);
        return;
    }

    AlphaBetaMove(++counter);
    printBoard(board);

    if (boardIsFull(board)) {
        end();
        return;
    }
    const winline2 = checkWinLine(board);
    if (winline.length > 0) {
        end(winline2);
        return;
    }
}

function disable(bool) {
    for (let i = 0; i < 9; i++)
        document.getElementById('btn' + i).disabled = bool;
}

function end(winline=[]){
    printBoard(board);
    disable(true);
    for (let i = 0; i < winline.length; i++)
        document.getElementById('btn' + winline[i]).style.backgroundColor = 'red';
    if (winline.length > 0 && board[winline[0]] == 'X')
        win();
}

function reset(){
    counter = 0;
    disable(false);
    for (let i = 0; i < 9; i++){
        board[i] = ' ';
        const btn = document.getElementById('btn' + i);
        btn.style.backgroundColor = '#343a40';
    }
    printBoard(board);
}

reset();
