$(document).ready();

var board,
game2 = new Chess(),
statusEl2 = $('#status2'),
fenEl2 = $('#fen2'),
pgnEl2 = $('#pgn2');

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
// var onDragStart = function(source, piece, position, orientation) {
//   if (game.game_over() === true ||
//       (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
//       (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
//     return false;
//   }
// };

var onDragStart = function(source, piece, position, orientation) {
if (game2.in_checkmate() === true || game2.in_draw() === true ||
  piece.search(/^b/) !== -1) {
  return false;
}
};

var makeRandomMove = function() {
var possibleMoves = game2.moves();

// game over
if (possibleMoves.length === 0) return;

var randomIndex = Math.floor(Math.random() * possibleMoves.length);
game2.move(possibleMoves[randomIndex]);
board2.position(game2.fen());
updateStatus();
};

var onDrop = function(source, target) {
// see if the move is legal
var move = game2.move({
  from: source,
  to: target,
  promotion: 'q' // NOTE: always promote to a queen for example simplicity
});

// illegal move
if (move === null) return 'snapback';


window.setTimeout(makeRandomMove, 750);
updateStatus();
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
board2.position(game2.fen());
};

var updateStatus = function() {
var status = '';


var moveColor = 'White';
if (game2.turn() === 'b') {
  moveColor = 'Black';
}

// checkmate?
if (game2.in_checkmate() === true) {
  status = 'Game over, ' + moveColor + ' is in checkmate.';
}

// draw?
else if (game2.in_draw() === true) {
  status = 'Game over, drawn position';
}

// game still on
else {
  status = moveColor + ' to move';

  // check?
  if (game2.in_check() === true) {
    status += ', ' + moveColor + ' is in check';
  }
}

statusEl2.html(status);
fenEl2.html(game2.fen());
pgnEl2.html(game2.pgn());
};

var cfg2 = {
draggable: true,
position: 'start',
showNotation: false,
onDragStart: onDragStart,
onDrop: onDrop,
onSnapEnd: onSnapEnd,
dropOffBoard: 'trash',
};

board2 = ChessBoard('board2', cfg2);
$(window).resize(board2.resize);

updateStatus();

$('#startBtn2').on('click', board2.start);
$('#clearBtn2').on('click', board2.clear);
