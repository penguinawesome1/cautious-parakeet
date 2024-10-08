let halfTurns = 1,
    selectedPiece = null,
    selectedSquare = null,
    squares = [];

const historyContainer = document.querySelector('.history'),
    chessboard = document.querySelector('.chessboard'),
    capturesWhite = document.getElementById('.capturesWhite'),
    capturesBlack = document.getElementById('.capturesBlack'),
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
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for (let row = 0; row < 8; row++) {
        const rowArr = [];
        squares.push(rowArr);
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add(row % 2 === col % 2 ? 'white_square' : 'black_square');
            square.id = `${letters[col]}${8-row}`;
            chessboard.appendChild(square);
            rowArr.push(square);
        }
    }
}

function setBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            squares[row][col].innerHTML = null;
        }
    }
    halfTurns = 1;
    historyContainer.innerHTML = null;
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const image = document.createElement('img');
            image.id = defaultChessboard[row][col];
            switch (image.id) {
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
            squares[row][col].appendChild(image);
        }
    }
    setListeners();
}

function setListeners() {
    chessboard.addEventListener('dragover', (event) => {
        event.preventDefault(); // Allow dropping within the chessboard
    });

    chessboard.addEventListener('drop', (event) => {
        event.preventDefault();

        const droppedSquare = event.target.closest('.square');
        const droppedPiece = event.dataTransfer.getData('text/plain'); // Get dragged piece ID

        if (selectedPiece && droppedSquare !== selectedSquare && isValidMove(selectedPiece, selectedSquare, droppedSquare)) {
            updateHistory(selectedSquare.firstChild.id, droppedSquare.id, ++halfTurns);
            droppedSquare.appendChild(selectedPiece);
            if (halfTurns % 2 === 0) capturesWhite = selectedPiece.firstChild;
            else capturesBlack = selectedPiece.firstChild;
            selectedPiece = null;
            selectedSquare = null;
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
            updateHistory(selectedSquare.firstChild.id, clickedSquare.id, ++halfTurns);
            if (halfTurns % 2 === 0) capturesWhite.appendChild(selectedPiece.firstChild);
            else capturesBlack.appendChild(selectedPiece.firstChild);
            clickedSquare.appendChild(selectedPiece);
            selectedPiece = null;
            selectedSquare = null;
        } else if (clickedPiece) {
            selectedPiece = clickedPiece;
            selectedSquare = clickedSquare;
        }
    });
}

function updateHistory(pieceType, move, halfTurns) {
    console.log(pieceType);

    if (halfTurns % 2 === 1) {
        pieceType = pieceType.toUpperCase();
        if (pieceType === 'P') pieceType = '';
        const lastBox = historyContainer.children[historyContainer.children.length - 1];
        lastBox.textContent += ` ${pieceType}${move}`;
        return;
    }

    const fills = ['#FFD700', '#259625'],
        colors = ['4px solid #DAA520', '4px solid darkgreen'],
        box = document.createElement('div');
    
    box.classList.add('container3');
    box.style.backgroundColor = fills[(halfTurns / 2) % colors.length];
    box.style.borderBottom = colors[(halfTurns / 2) % colors.length];
    pieceType = pieceType.toUpperCase();
    if (pieceType === 'P') pieceType = '';
    box.textContent = `${halfTurns/2}. ${pieceType}${move}`;
    historyContainer.appendChild(box);
    historyContainer.scrollTop = historyContainer.scrollHeight;
}

function isValidMove(piece, fromSquare, toSquare) {
    return true;
}

createSquares();
setBoard();