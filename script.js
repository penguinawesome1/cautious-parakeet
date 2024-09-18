const chessboard = document.querySelector('.chessboard');

// Create chessboard squares
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        square.classList.add('square');   
        square.classList.add(row % 2 === col % 2 ? 'white_square' : 'black_square');
        chessboard.appendChild(square);
    }
}

// Get all squares and create image elements
const squares = document.querySelectorAll('.square');
const images = [];
for (let i = 0; i < 64; i++) {
    if (i > 10) { continue; }
    const image = document.createElement('img');
    /*switch (ChessWithEngine.getPiece(i)) {
        case 'P': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/50px-Chess_plt45.svg.png`;
        case 'N': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/50px-Chess_nlt45.svg.png`;
        case 'B': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/50px-Chess_blt45.svg.png`;
        case 'R': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/50px-Chess_rlt45.svg.png`;
        case 'Q': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/50px-Chess_qlt45.svg.png`;
        case 'K': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/50px-Chess_klt45.svg.png`;
        case 'p': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/50px-Chess_pdt45.svg.png`;
        case 'n': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/50px-Chess_ndt45.svg.png`;
        case 'b': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/50px-Chess_bdt45.svg.png`;
        case 'r': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png`;
        case 'q': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/50px-Chess_qdt45.svg.png`;
        case 'k': image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/50px-Chess_kdt45.svg.png`;
        default: continue;
    }*/
    image.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/50px-Chess_plt45.svg.png`;
    image.classList.add('piece');
    image.style.width = '100%';
    image.style.height = '100%';
    squares[i].appendChild(image);
    images.push(image);
}

// Handle image movement
let selectedPiece = null;
let selectedSquare = null;

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
  }
});

chessboard.querySelectorAll('.piece').forEach((piece) => {
  piece.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', piece.id); // Set dragged piece ID
    selectedPiece = piece;
    selectedSquare = piece.parentNode; // Store the starting square
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
    } else if (clickedPiece) {
      selectedPiece = clickedPiece;
      selectedSquare = clickedSquare;
    }
});

function isValidMove(piece, fromSquare, toSquare) {
    return true;
}