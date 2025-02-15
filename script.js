const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');

let playerPosition = 180; // Initial position of the player
let score = 0;
let gameOver = false;

// Event listener for moving the player
document.addEventListener('keydown', (event) => {
  if (gameOver) return;

  if (event.key === 'ArrowLeft' && playerPosition > 0) {
    playerPosition -= 20;
  } else if (event.key === 'ArrowRight' && playerPosition < 360) {
    playerPosition += 20;
  }
  player.style.left = `${playerPosition}px`;
});

// Function to create falling objects
function createFallingObject() {
  const object = document.createElement('div');
  object.classList.add('falling-object');
  object.style.left = `${Math.random() * 370}px`; // Random position
  gameContainer.appendChild(object);

  let objectPosition = 0;

  const fallInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(fallInterval);
      return;
    }

    objectPosition += 5;
    object.style.top = `${objectPosition}px`;

    // Check collision
    if (
      objectPosition > 560 &&
      parseInt(object.style.left) < playerPosition + 40 &&
      parseInt(object.style.left) + 30 > playerPosition
    ) {
      clearInterval(fallInterval);
      endGame();
    }

    // Remove object when it goes out of bounds
    if (objectPosition > 600) {
      clearInterval(fallInterval);
      gameContainer.removeChild(object);
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }
  }, 20);
}

// Function to end the game
function endGame() {
  gameOver = true;
  alert(`Game Over! Your Score: ${score}`);
  window.location.reload(); // Reload the page to restart the game
}

// Start creating falling objects
setInterval(createFallingObject, 1000);