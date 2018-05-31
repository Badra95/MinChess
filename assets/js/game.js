$(document).ready();

var board1,
 game1 = new Chess(),
 statusEl1 = $('#status1'),
 fenEl1 = $('#fen1'),
 pgnEl1 = $('#pgn1');

//retrait du bg
  var removeGreySquares = function() {
    $('#board1 .square-55d63').css('background', '');
  };

//ajout du bg
  var greySquare = function(square) {
    var squareEl1 = $('#board1 .square-' + square);

    var background = '#a9a9a9';
    if (squareEl1.hasClass('black-3c85d') === true) {
      background = '#696969';
    }

    squareEl1.css('background', background);
  };

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (game1.game_over() === true ||
      (game1.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game1.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {
  removeGreySquares();
  // see if the move is legal
  var move = game1.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';

  updateStatus();
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board1.position(game1.fen());
};

var updateStatus = function() {
  var status = '';


  var moveColor = 'White';
  if (game1.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game1.in_checkmate() === true) {
    status = 'Game over, les pions' + moveColor + ' sont échec et mat.';
  }

  // draw?
  else if (game1.in_draw() === true) {
    status = 'Game over, le jeu touche à sa fin.';
  }

  // game still on
  else {
    status = "C'est aux pions " + moveColor + ' de jouer';

    // check?
    if (game1.in_check() === true) {
      status += ', ' + moveColor + ' sont en échec';
    }
  }

  statusEl1.html(status);
  fenEl1.html(game1.fen());
  pgnEl1.html(game1.pgn());
};

var onMouseoverSquare = function(square, piece) {
  // get list of possible moves for this square
  var moves = game1.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

var onMouseoutSquare = function(square, piece) {
  removeGreySquares();
};

var cfg1 = {
  draggable: true,
  position: 'start',
  showNotation: false,
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  dropOffBoard: 'trash',
};

board1 = ChessBoard('board1', cfg1);
$(window).resize(board1.resize);

updateStatus();

$('#startBtn1').on('click', board1.start);
$('#clearBtn1').on('click', board1.clear);
