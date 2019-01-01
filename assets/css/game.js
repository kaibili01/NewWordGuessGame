var faceCards = [
    'ace of diamonds',
    'ace of spades',
    'ace of clubs',
    'ace of hearts',
    'king of diamonds',
    'king of spades',
    'king of clubs',
    'king of hearts',
    'queen of diamonds',
    'queen of spades',
    'queen of clubs',
    'queen of hearts',
    'jack of diamonds',
    'jack of spades',
    'jack of clubs',
    'jack of hearts',
    
]

var wins = 0;
var losses = 0;
var remainingGuesses = 10;
var gameStart = false;
var randomCard = '';
var randomCardUnderscore = [];
var totalGuesses = [];
var wrongGuesses = [];

function startGame() {
    gameStart = true;
    remainingGuesses = 10;
    totalGuesses = [];
    wrongGuesses = [];
    randomCardUnderscore = [];
    
    document.getElementById('pokerCardDisplay').innerHTML = "";
    document.getElementById('resultAnswer').textContent = "";

    randomCard = faceCards[Math.floor(Math.random() * faceCards.length)];
    console.log(randomCard);

    for (var i = 0; i < randomCard.length; i++) {
        randomCardUnderscore.push('_');
    }

    document.getElementById('remainingLives').textContent = remainingGuesses;
    document.getElementById('underscored').textContent = randomCardUnderscore.join(' ');
    document.getElementById('lettersGuessed').textContent = wrongGuesses;

}

function generateCard(randomCard) {
   var img = document.createElement("img");
       console.log(img);
   img.setAttribute("src", "assets/images/cards/" + randomCard + ".png");
   document.getElementById("pokerCardDisplay").append(img);
}



function continueGame(input) {
    if (gameStart === true && wrongGuesses.indexOf(input) === -1) {
        for (var i = 0; i < randomCard.length; i++) {
            if (randomCard[i].toLowerCase() === input.toLowerCase()) {
                randomCardUnderscore[i] = randomCard[i];
            }
        }
        document.getElementById('underscored').textContent = randomCardUnderscore.join(' ');
        badGuess(input);

    } else {
        if (gameStart === false) {
            alert("Click Start Game button to start");
        } else {
            alert("You already tried this guess. Try another letter");
        }
    }
}

function badGuess(input) {
    if (randomCardUnderscore.indexOf(input.toLowerCase()) === -1 && randomCardUnderscore.indexOf(input.toUpperCase()) === -1) {
        remainingGuesses--;
        wrongGuesses.push(input);
        document.getElementById('lettersGuessed').textContent = wrongGuesses.join(' ');
        document.getElementById('remainingLives').textContent = remainingGuesses;

    }
    userLost();
}

function userLost() {
    if (remainingGuesses === 0) {
        losses++;
        gameStart = false;
        document.getElementById('lossesCount').textContent = losses;
        document.getElementById('resultAnswer').textContent = "You lost! Try again... Press Start Game";
    }

    userWin();
}

function userWin() {
    if (randomCard.toLowerCase() === randomCardUnderscore.join('').toLowerCase()) {
        wins++;
        gameStart = false;
        generateCard(randomCard);
        document.getElementById('winsCount').textContent = wins;
        document.getElementById('resultAnswer').textContent = "YOU WON! This is your card!";
    }
}


document.getElementById('startGameBtn').addEventListener('click', startGame);

document.onkeyup = function (event) {
    continueGame(event.key);
}
