var blockSize = 30; // Increase the size of each block
var rows = 25; // Increase the number of rows
var cols = 25; // Increase the number of columns
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var foodX;
var foodY;

var isFoodEaten = false; // New variable to track if the food is eaten

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}


var score = 0;
var highScore = localStorage.getItem("highscore") || 0;

function update() {
    if (gameOver) {
		updateHighScore();
		document.getElementById("restartBtn").style.display = "block";
        return;
    }

    context.fillStyle = "lightgray";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "black";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        isFoodEaten = true;
        placeFood();
		updateScore();
    }

    if (isFoodEaten) {
        snakeBody.push([snakeX, snakeY]);
        isFoodEaten = false;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Game Over. You lost :)");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over. You lost :)");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    isFoodEaten = false;
    gameOver = false;
	score = 0;

    placeFood();

    document.getElementById("restartBtn").style.display = "none"; 
	score = 0;
	updateScore();
	updateHighScore();

    update();
}
function updateScore(){
	score+=10;
	document.getElementById("scoreDisplay").innerText = "Score: " + score;
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }

    document.getElementById("highScoreDisplay").innerText = "High Score: " + highScore;
}