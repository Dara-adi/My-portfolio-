// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');
const startButton = document.getElementById('startButton');

let player1 = {
    x: 50,
    y: canvas.height / 2 - 25,
    width: 10,
    height: 50,
    color: 'blue',
    speed: 2,
};

let player2 = {
    x: canvas.width - 60,
    y: canvas.height / 2 - 25,
    width: 10,
    height: 50,
    color: 'green',
    speed: 2,
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 4,
    speedY: 4,
};

let player1Score = 0;
let player2Score = 0;
let gameActive = false;

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    if (!gameActive) return;

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY; // Reverse direction on top/bottom collision
    }

    // Scoring
    if (ball.x - ball.radius < 0) {
        player2Score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player1Score++;
        resetBall();
    }

    // Ball collision with players
    if (
        ball.x - ball.radius < player1.x + player1.width &&
        ball.x + ball.radius > player1.x &&
        ball.y - ball.radius < player1.y + player1.height &&
        ball.y + ball.radius > player1.y
    ) {
        ball.speedX = -ball.speedX; // Reverse ball direction on player collision
    }

    if (
        ball.x - ball.radius < player2.x + player2.width &&
        ball.x + ball.radius > player2.x &&
        ball.y - ball.radius < player2.y + player2.height &&
        ball.y + ball.radius > player2.y
    ) {
        ball.speedX = -ball.speedX; // Reverse ball direction on player collision
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawPlayer(player1);
    drawPlayer(player2);
    drawBall();

    // Update scores
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;

    // Check for game over
    if (player1Score >= 5 || player2Score >= 5) {
        gameActive = false;
        alert(`Game Over! Player ${player1Score >= 5 ? 1 : 2} wins!`);
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 4 * (Math.random() > 0.5 ? 1 : -1); // Randomize ball direction
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

startButton.addEventListener('click', () => {
    player1Score = 0;
    player2Score = 0;
    gameActive = true;
    startButton.disabled = true; // Disable button during game
    gameLoop(); // Start the game loop
});

// Player controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && player1.y > 0) {
        player1.y -= player1.speed; // Move player 1 up
    } else if (event.key === 'ArrowDown' && player1.y < canvas.height - player1.height) {
        player1.y += player1.speed; // Move player 1 down
    }

    if (event.key === 'w' && player2.y > 0) {
        player2.y -= player2.speed; // Move player 2 up
    } else if (event.key === 's' && player2.y < canvas.height - player2.height) {
        player2.y += player2.speed; // Move player 2 down
    }
});
