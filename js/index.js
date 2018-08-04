var game = {
    round: 0,
    hexagons: ['#green', '#blue', '#red', '#yellow'],
    currentGame: [],
    playerSequence: [],
    sound: {
        blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    },
    strictMode: false,
}

function newGame() {
    game.currentGame = [];
    game.round = 0;
    nextRound();
}

function restartGame(){
  newGame();
    $('.message').text('Game is restarted');
    $('.message').fadeIn();
    $(".message").delay(700).fadeOut();
}

function strictMode() {
    if (!game.strictMode) {
        game.strictMode = true;
          $('.message').text('Strict Mode is ON');
          $('.message').fadeIn();
          $(".message").delay(700).fadeOut();
    } else {
        game.strictMode = false;
          $('.message').text('Strict Mode is OFF');
          $('.message').fadeIn();
          $(".message").delay(700).fadeOut();
    }
    newGame();
}

function generateSequence() {
    var i = 0;
    var moves = setInterval(function() {
        playGame(game.currentGame[i]);
        i++;
        if (i >= game.currentGame.length) {
            clearInterval(moves);
        }
    }, 600)

    game.playerSequence = [];
}

function playGame(hexagon) {
    $(hexagon).addClass('lightening');
    setTimeout(function() {
        $(hexagon).removeClass('lightening');
    }, 300);
}

function savePlayerSequence(hex) {
    var hexagon = "#" + hex;
    game.playerSequence.push(hexagon);
    playerTurn(hexagon);
}

function playerTurn(turn) {
    if (game.playerSequence[game.playerSequence.length - 1] !== game.currentGame[game.playerSequence.length - 1]) {
        if (game.strictMode) {
            $('.message').text('Wrong move! Try again from the beginning!');
            $('.message').fadeIn();
            $(".message").delay(700).fadeOut();
            newGame();
        } else {
            $('.message').text('Wrong move! Try again!');
            $('.message').fadeIn();
            $(".message").delay(700).fadeOut();
            generateSequence();
        }
    } else {
        $('.message').text('Right move! Keep going!');
        if (game.playerSequence.length === game.currentGame.length) {
            if (game.round == 20) {
                $('.message').text('Congratulations! You won!');
                $('.message').fadeIn();
                $(".message").delay(700).fadeOut();
            } else {
                $('.message').text('Right move! Keep going!');
                $('.message').fadeIn();
                $(".message").delay(700).fadeOut();
                nextRound();
            }
        }
    }
}

function nextRound() {
    game.round++;
    $('#round-value').val(game.round);
    game.currentGame.push(game.hexagons[(Math.floor(Math.random() * 4))]);
    generateSequence();
 }
newGame();