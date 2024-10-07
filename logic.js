let depth = 6,
    halfTurns = 1,
    selectedPiece = null,
    selectedSquare = null,
    squares = [];

const btnGameMode = document.getElementById("game_mode"),
    btnOpponent = document.getElementById("opponent"),
    btnColor = document.getElementById("color"),
    btnDepth = document.getElementById("depth"),
    btnReset = document.getElementById("reset"),
    fills = ['#FFD700', '#259625'],
    colors = ['4px solid #DAA520', '4px solid darkgreen'],
    historyContainer = document.querySelector('.history'),
    chessboard = document.querySelector('.chessboard'),
    defaultChessboard = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

function createSquares() {
    squares = [];
    for (let row = 0; row < 8; row++) {
        const rowArr = [];
        squares.push(rowArr);
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add(row % 2 === col % 2 ? 'white_square' : 'black_square');            
            chessboard.appendChild(square);
            rowArr.push(square);
        }
    }
}

function setBoard() {
    halfTurns = 1;
    historyContainer.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const image = document.createElement('img');
            switch (defaultChessboard[row][col]) {
                case 'P': image.src = `https://www.symbols.com/images/symbol/3409_white-pawn.png`; break;
                case 'N': image.src = `https://www.symbols.com/images/symbol/3408_white-knight.png`; break;
                case 'B': image.src = `https://www.symbols.com/images/symbol/3407_white-bishop.png`; break;
                case 'R': image.src = `https://www.symbols.com/images/symbol/3406_white-rook.png`; break;
                case 'Q': image.src = `https://www.symbols.com/images/symbol/3405_white-queen.png`; break;
                case 'K': image.src = `https://www.symbols.com/images/symbol/3404_white-king.png`; break;
                case 'p': image.src = `https://www.symbols.com/images/symbol/3403_black-pawn.png`; break;
                case 'n': image.src = `https://www.symbols.com/images/symbol/3402_black-knight.png`; break;
                case 'b': image.src = `https://www.symbols.com/images/symbol/3401_black-bishop.png`; break;
                case 'r': image.src = `https://www.symbols.com/images/symbol/3400_black-rook.png`; break;
                case 'q': image.src = `https://www.symbols.com/images/symbol/3399_black-queen.png`; break;
                case 'k': image.src = `https://www.symbols.com/images/symbol/3398_black-king.png`; break;
                default: continue; // No piece;
            }
            image.classList.add('piece');        
            image.style.width = '100%';
            image.style.height = '100%';
            // squares[row][col].childNodes[0] = image;
            squares[row][col].appendChild(image);
        }
    }
}

function updateHistory(move, halfTurns) {
    if (halfTurns % 2 === 1) {
        const lastBox = historyContainer.children[historyContainer.children.length - 1];
        lastBox.textContent += ` ${move}`;
        return;
    }

    const box = document.createElement('div');
    box.classList.add('container3');
    box.style.backgroundColor = fills[(halfTurns / 2) % colors.length];
    box.style.borderBottom = colors[(halfTurns / 2) % colors.length];
    box.textContent = `${halfTurns/2}. ${move}`;
    historyContainer.appendChild(box);
    historyContainer.scrollTop = historyContainer.scrollHeight;
}

function isValidMove(piece, fromSquare, toSquare) {
    return true;
}

createSquares();
setBoard();

btnGameMode.onclick = () => {
    if (btnGameMode.innerHTML === "Chess") btnGameMode.innerHTML = "Chess960";
    else btnGameMode.innerHTML = "Chess";
};

btnOpponent.onclick = () => {
    if (btnOpponent.innerHTML === "Player") {
        btnOpponent.innerHTML = "Engine";
        btnColor.id = "";
        btnDepth.id = "";
    } else {
        btnOpponent.innerHTML = "Player";
        btnColor.id = "off";
        btnDepth.id = "off";
    }
};

btnColor.onclick = () => {
    if (btnColor.innerHTML === "White") btnColor.innerHTML = "Black";
    else btnColor.innerHTML = "White";
};

btnDepth.onclick = () => {
    ++depth;
    if (depth > 6) depth = 1;
    btnDepth.innerHTML = "Depth: " + depth;
};

btnReset.addEventListener('click', setBoard);

chessboard.addEventListener('dragover', (event) => {
    event.preventDefault(); // Allow dropping within the chessboard
});

chessboard.addEventListener('drop', (event) => {
    event.preventDefault();

    const droppedSquare = event.target.closest('.square');
    const droppedPiece = event.dataTransfer.getData('text/plain'); // Get dragged piece ID

    if (selectedPiece && droppedSquare !== selectedSquare && isValidMove(selectedPiece, selectedSquare, droppedSquare)) {
        selectedSquare.removeChild(selectedPiece);
        droppedSquare.appendChild(selectedPiece);
        selectedPiece = null;
        selectedSquare = null;
        updateHistory('e2', ++halfTurns);
    }
});

chessboard.querySelectorAll('.piece').forEach((piece) => {
    piece.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', piece.id); // Set dragged piece ID
        selectedPiece = piece;
        selectedSquare = piece.parentNode;
    });
});

chessboard.addEventListener('click', (event) => {
    const clickedSquare = event.target.closest('.square');
    const clickedPiece = clickedSquare.querySelector('.piece');

    if (selectedPiece && clickedSquare !== selectedSquare && isValidMove(selectedPiece, selectedSquare, clickedSquare)) {
        selectedSquare.removeChild(selectedPiece);
        clickedSquare.appendChild(selectedPiece);
        selectedPiece = null;
        selectedSquare = null;
        updateHistory('e2', ++halfTurns);
    } else if (clickedPiece) {
        selectedPiece = clickedPiece;
        selectedSquare = clickedSquare;
    }
});