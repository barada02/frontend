// Game variables
const cards = [
  '🍕', '🍕', '🥪', '🥪', '🍰', '🍰', '🍦', '🍦', '🍬', '🍬', '🍨', '🍨',
  '🍫', '🍫', '🍗', '🍗', '🧸', '🧸', '🎁', '🎁', '🎄', '🎄', '🦋', '🦋',
  '🎉', '🎉', '🥥', '🥥', '🥝', '🥝'
];
let flippedCards = [];
let matchedCards = 0;
let gameStarted = false;
let score = 0;
let timer;
let timeRemaining = 160; // 1-minute time limit
const mismatchSound = new Audio('fail.mp3'); // Mismatch sound
const correctSound = new Audio('correct.mp3'); // Correct match sound
const successSound = new Audio('success.mp3'); // Success sound for completing all pairs

// Shuffle function
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Generate game board
function createGameBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Clear existing board
  cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.setAttribute('data-index', index);

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');

      const cardFront = document.createElement('div');
      cardFront.classList.add('card-face', 'card-front');
      cardFront.innerHTML = '?';

      const cardBack = document.createElement('div');
      cardBack.classList.add('card-face', 'card-back');
      cardBack.innerHTML = card;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);
      gameBoard.appendChild(cardElement);

      cardElement.addEventListener('click', () => flipCard(cardElement, card));
  });
}

// Flip card function
function flipCard(cardElement, cardValue) {
  if (flippedCards.length < 2 && !cardElement.classList.contains('flipped') && gameStarted) {
      cardElement.classList.add('flipped');
      flippedCards.push({ element: cardElement, value: cardValue });

      if (flippedCards.length === 2) {
          checkForMatch();
      }
  }
}

// Check if cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.value === card2.value) {
      matchedCards++;
      score += 3; // Add 3 points for each matched pair
      updateScore();
      correctSound.play(); // Play the correct sound
      flippedCards = [];
      if (matchedCards === cards.length / 2) {
          stopTimer(); // Stop timer when game is finished
          successSound.play(); // Play success sound
          setTimeout(() => {
              document.getElementById('successPopup').style.display = 'flex'; // Show success pop-up
          }, 500);
      }
  } else {
      mismatchSound.play(); // Play mismatch sound
      setTimeout(() => {
          card1.element.classList.remove('flipped');
          card2.element.classList.remove('flipped');
          flippedCards = [];
      }, 1000);
  }
}

// Update score
function updateScore() {
  document.getElementById('score').textContent = `Score: ${score}`;
}

// Timer function
function startTimer() {
  let elapsedTime = 0; // Start from 0 seconds
  timer = setInterval(() => {
      elapsedTime++;
      const timeRemaining = 160 - elapsedTime; // Calculate remaining time
      document.getElementById('timer').textContent = `Time: ${elapsedTime}s`; // Display elapsed time

      if (elapsedTime >= 160) { // Stop at 160 seconds
          clearInterval(timer);
          endGame(); // End the game when time runs out
      }
  }, 1000);
}


// Initialize game
window.onload = function () {
  shuffleCards();
  createGameBoard();
  gameStarted = true;
  document.getElementById('timer').textContent = `Time: 0s`; // Display initial time as 0 seconds
  startTimer();
};


// Initialize game
window.onload = function () {
  shuffleCards();
  createGameBoard();
  gameStarted = true;
  document.getElementById('timer').textContent = `Time: 0s`; // Display initial time as 0 seconds
  startTimer();
};


// Stop timer
function stopTimer() {
  clearInterval(timer);
}

// End game if time runs out
function endGame() {
  gameStarted = false;
  const timeoutMessage = document.createElement('div');
  timeoutMessage.classList.add('timeout-message');
  timeoutMessage.innerHTML = `
      <h2>Time's Up!</h2>
      <p>You couldn't match all pairs within the time limit.</p>
      <button class="btn btn-danger mt-4" onclick="tryAgain()">Try Again</button>
  `;
  document.body.appendChild(timeoutMessage);
}

// Try Again function to restart the game
function tryAgain() {
  const timeoutMessage = document.querySelector('.timeout-message');
  if (timeoutMessage) {
      timeoutMessage.remove();
  }
  startNewGame();
}

// Start new game
function startNewGame() {
  matchedCards = 0;
  flippedCards = [];
  score = 0;
  timeRemaining = 160; // Reset time to 1 minute
  updateScore();
  shuffleCards();
  createGameBoard();
  gameStarted = true;
  startTimer(); // Start the timer
}

// Close the pop-up and redirect
document.getElementById('closePopup').addEventListener('click', function () {
  window.location.href = 'celebratory.html'; // Redirect to celebratory page
});

// Initialize game
window.onload = function () {
  shuffleCards();
  createGameBoard();
  gameStarted = true;
  timeRemaining = 140; // Start timer at 60 seconds
  document.getElementById('timer').textContent = `Time: ${timeRemaining}s`; // Display initial time
  startTimer();
};
