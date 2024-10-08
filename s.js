const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const player1Health = document.getElementById('player1-health');
const player2Health = document.getElementById('player2-health');
let health1 = 100;
let health2 = 100;

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        // Player 1 Controls (WASD + F for attack)
        case 'a': // Move left
            movePlayer(player1, -10, 0);
            break;
        case 'd': // Move right
            movePlayer(player1, 10, 0);
            break;
        case 'w': // Jump
            jumpPlayer(player1);
            break;
        case 'f': // Attack
            attack(player1, player2);
            break;

        // Player 2 Controls (Arrow Keys + L for attack)
        case 'ArrowLeft': // Move left
            movePlayer(player2, -10, 0);
            break;
        case 'ArrowRight': // Move right
            movePlayer(player2, 10, 0);
            break;
        case 'ArrowUp': // Jump
            jumpPlayer(player2);
            break;
        case 'l': // Attack
            attack(player2, player1);
            break;
    }
});

function movePlayer(player, xChange, yChange) {
    const currentX = player.offsetLeft;
    const newX = currentX + xChange;

    // Limit movement to within the game area
    if (newX >= 0 && newX <= (800 - player.clientWidth)) {
        player.style.left = newX + 'px';
    }
}

function jumpPlayer(player) {
    if (!player.classList.contains('jump')) {
        player.classList.add('jump');
        setTimeout(() => {
            player.classList.remove('jump');
        }, 500);
    }
}

function attack(attacker, target) {
    const attackerX = attacker.offsetLeft;
    const targetX = target.offsetLeft;

    // Determine which arm to animate based on direction
    const armClass = attackerX < targetX ? 'attack-right-arm' : 'attack-left-arm';
    const arms = attacker.getElementsByClassName(armClass.includes('right') ? 'right-arm' : 'left-arm');
    if (arms.length > 0) {
        const arm = arms[0];
        arm.classList.add(armClass);
        setTimeout(() => {
            arm.classList.remove(armClass);
        }, 300);
    }

    // Check if the target is within attack range (50px distance)
    if (Math.abs(attackerX - targetX) <= 50) {
        // Damage target's health
        if (target === player2) {
            health2 -= 10;
            player2Health.textContent = `Player 2: ${health2}`;
            target.classList.add('hit');
        } else {
            health1 -= 10;
            player1Health.textContent = `Player 1: ${health1}`;
            target.classList.add('hit');
        }

        // Remove hit effect after a short delay
        setTimeout(() => {
            target.classList.remove('hit');
        }, 200);

        // Check for game over
        if (health1 <= 0) {
            alert('Player 2 Wins!');
            resetGame();
        } else if (health2 <= 0) {
            alert('Player 1 Wins!');
            resetGame();
        }
    }
}

function resetGame() {
    health1 = 100;
    health2 = 100;
    player1Health.textContent = 'Player 1: 100';
    player2Health.textContent = 'Player 2: 100';
    player1.style.left = '50px';
    player2.style.right = '50px';
}
