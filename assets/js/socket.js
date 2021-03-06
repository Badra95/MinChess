
(function () {

    WinJS.UI.processAll().then(function () {

      var socket, serverGame;
      var serverGame = {id: null};
      var username, playerColor;
      var game, board;
      var usersOnline = [];
      var myGames = [];
      socket = io();


      socket.on('login', function(msg) {
            usersOnline = msg.users;
            updateUserList();

            myGames = msg.games;
            updateGamesList();
      });

      socket.on('joinlobby', function (msg) {
        addUser(msg);

        console.log("Le joueur " + msg + " a rejoind la partie");
      });

       socket.on('leavelobby', function (msg) {
        removeUser(msg);

        console.log("Le joueur " + msg + " a quitté la partie");
      });

      socket.on('gameadd', function(msg) {
        console.log(msg);
        console.log('Une nouvelle partie à été lancer ' + msg.gameState.users.white + ' vs ' + msg.gameState.users.black);
      });

      socket.on('resign', function(msg) {
            if (msg.gameId == serverGame.id) {

              socket.emit('login', username);

              $('#page-lobby').show();
              $('#page-game').hide();
            }
      });

      socket.on('joingame', function(msg) {
        console.log("joined as game id: " + msg.game.id );
        playerColor = msg.color;
        initGame(msg.game);

        $('#page-lobby').hide();
        $('#page-game').show();

      });

      socket.on('move', function (msg) {
        if (serverGame && msg.gameId === serverGame.id) {
           game.move(msg.move);
           board.position(game.fen());
        }
      });


      socket.on('logout', function (msg) {
        removeUser(msg.username);
      });



      //////////////////////////////
      // Menus
      //////////////////////////////
      $('#m-start').on('click', function() {
        console.log(sessionStorage.getItem('name'));
        username = sessionStorage.getItem('name');

        if (username == null) {
          alert("Tu n'est pas connecté")
        }

        if (username.length > 0) {
            $('#userLabel').text(username);
            socket.emit('login', username);

            $('#page-login').hide();
            $('#page-lobby').show();
        }
      });

      $('#game-back').on('click', function() {
        socket.emit('login', username);

        $('#page-game').hide();
        $('#page-lobby').show();
      });

      $('#game-resign').on('click', function() {
        socket.emit('resign', {userId: username, gameId: serverGame.id});

        socket.emit('login', username);
        $('#page-game').hide();
        $('#page-lobby').show();
      });

      var addUser = function(userId) {
        usersOnline.push(userId);
        updateUserList();
      };

     var removeUser = function(userId) {
          for (var i=0; i<usersOnline.length; i++) {
            if (usersOnline[i] === userId) {
                usersOnline.splice(i, 1);
            }
         }

         updateUserList();
      };

      var updateGamesList = function() {
        document.getElementById('gamesList').innerHTML = '';
        myGames.forEach(function(game) {
          $('#gamesList').append($('<button>')
                        .text('#'+ game)
                        .on('click', function() {
                          socket.emit('resumegame',  game);
                        }));
        });
      };

      var updateUserList = function() {
        document.getElementById('userList').innerHTML = '';
        usersOnline.forEach(function(user) {
          $('#userList').append($('<button>')
                        .text(user)
                        .on('click', function() {
                          socket.emit('invite',  user);
                        }));
        });
      };

      //////////////////////////////
      // Chess Game
      //////////////////////////////

      var initGame = function (serverGameState) {
        serverGame = serverGameState;

          var cfg = {
            draggable: true,
            showNotation: false,
            orientation: playerColor,
            position: serverGame.board ? serverGame.board : 'start',
            onDragStart: onDragStart,
            onDrop: onDrop,
            onSnapEnd: onSnapEnd
          };

          game = serverGame.board ? new Chess(serverGame.board) : new Chess();
          board = new ChessBoard('game-board', cfg);
      }

      var onDragStart = function(source, piece, position, orientation) {
        if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1) ||
            (game.turn() !== playerColor[0])) {
          return false;
        }
      };



      var onDrop = function(source, target) {
        // see if the move is legal
        var move = game.move({
          from: source,
          to: target,
          promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) {
          return 'snapback';
        } else {
           socket.emit('move', {move: move, gameId: serverGame.id, board: game.fen()});
        }

      };


      var onSnapEnd = function() {
        board.position(game.fen());
      };
    });
})();
