const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAME_SPEEDS = {
  easy: 150,
  medium: 100,
  hard: 70,
};

let snake = [];
let food = {};
let direction = "RIGHT";
let nextDirection = "RIGHT";
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let gameSpeed = GAME_SPEEDS.easy;
let gameRunning = false;
let gamePaused = false;
let gameLoop;
let snakeColor = "#3498db";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const currentScoreElement = document.getElementById("current-score");
const highScoreElement = document.getElementById("high-score");
const finalScoreElement = document.getElementById("final-score");
const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const pauseScreen = document.getElementById("pause-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const newGameButton = document.getElementById("new-game-btn");
const pauseButton = document.getElementById("pause-btn");
const resumeButton = document.getElementById("resume-btn");
const settingsButton = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettings = document.getElementById("close-settings");
const saveSettingsButton = document.getElementById("save-settings");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const gameOverAnimation = document.getElementById("game-over-animation");
const upButton = document.getElementById("up-btn");
const leftButton = document.getElementById("left-btn");
const downButton = document.getElementById("down-btn");
const rightButton = document.getElementById("right-btn");
const mobilePauseButton = document.getElementById("mobile-pause-btn");

function setupCanvas() {
  canvas.width = GRID_SIZE * CELL_SIZE;
  canvas.height = GRID_SIZE * CELL_SIZE;
}

function initGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  direction = "RIGHT";
  nextDirection = "RIGHT";
  score = 0;
  currentScoreElement.textContent = score;
  highScoreElement.textContent = highScore;

  generateFood();

  draw();

  startScreen.classList.add("active");
  gameOverScreen.classList.remove("active");
  pauseScreen.classList.remove("active");

  gameRunning = false;
  gamePaused = false;
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };

  for (let segment of snake) {
    if (segment.x === food.x && segment.y === food.y) {
      return generateFood();
    }
  }
}

function gameUpdate() {
  if (gamePaused) return;

  direction = nextDirection;

  const head = { ...snake[0] };

  switch (direction) {
    case "UP":
      head.y -= 1;
      break;
    case "DOWN":
      head.y += 1;
      break;
    case "LEFT":
      head.x -= 1;
      break;
    case "RIGHT":
      head.x += 1;
      break;
  }

  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    gameOver();
    return;
  }

  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      gameOver();
      return;
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    currentScoreElement.textContent = score;

    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore;
      localStorage.setItem("snakeHighScore", highScore);
    }

    generateFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(
    "--card-bg"
  );
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue(
    "--border"
  );
  ctx.lineWidth = 0.5;

  for (let i = 0; i <= GRID_SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(canvas.width, i * CELL_SIZE);
    ctx.stroke();
  }

  snake.forEach((segment, index) => {
    if (index === 0) {
      ctx.fillStyle = snakeColor;
    } else {
      const gradient = ctx.createLinearGradient(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        (segment.x + 1) * CELL_SIZE,
        (segment.y + 1) * CELL_SIZE
      );
      gradient.addColorStop(0, snakeColor);
      gradient.addColorStop(1, lightenColor(snakeColor, 30));
      ctx.fillStyle = gradient;
    }

    ctx.fillRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    ctx.strokeStyle = snakeColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  });

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(
    "--food-color"
  );

  ctx.beginPath();
  ctx.arc(
    food.x * CELL_SIZE + CELL_SIZE / 2,
    food.y * CELL_SIZE + CELL_SIZE / 2,
    CELL_SIZE / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = "#8BC34A";
  ctx.fillRect(
    food.x * CELL_SIZE + CELL_SIZE / 2 - 2,
    food.y * CELL_SIZE + 2,
    4,
    6
  );

  ctx.beginPath();
  ctx.moveTo(food.x * CELL_SIZE + CELL_SIZE / 2 + 2, food.y * CELL_SIZE + 2);
  ctx.quadraticCurveTo(
    food.x * CELL_SIZE + CELL_SIZE / 2 + 8,
    food.y * CELL_SIZE - 2,
    food.x * CELL_SIZE + CELL_SIZE / 2 + 2,
    food.y * CELL_SIZE + 2
  );
  ctx.fill();
}

function gameOver() {
  gameRunning = false;
  clearInterval(gameLoop);

  finalScoreElement.textContent = score;
  gameOverScreen.classList.add("active");

  createConfetti();
}

function createConfetti() {
  gameOverAnimation.innerHTML = "";
  gameOverAnimation.style.opacity = "1";

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDelay = Math.random() * 2 + "s";
    gameOverAnimation.appendChild(confetti);
  }

  setTimeout(() => {
    gameOverAnimation.style.opacity = "0";
  }, 1000);
}

function startGame() {
  initGame();
  startScreen.classList.remove("active");
  gameRunning = true;

  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(gameUpdate, gameSpeed);
}

function togglePause() {
  if (!gameRunning) return;

  gamePaused = !gamePaused;
  if (gamePaused) {
    pauseScreen.classList.add("active");
  } else {
    pauseScreen.classList.remove("active");
  }
}

function changeDirection(newDirection) {
  if (
    (direction === "UP" && newDirection === "DOWN") ||
    (direction === "DOWN" && newDirection === "UP") ||
    (direction === "LEFT" && newDirection === "RIGHT") ||
    (direction === "RIGHT" && newDirection === "LEFT")
  ) {
    return;
  }
  nextDirection = newDirection;
}

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
newGameButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);
mobilePauseButton.addEventListener("click", togglePause);
resumeButton.addEventListener("click", togglePause);

settingsButton.addEventListener("click", () => {
  settingsModal.classList.add("active");
});

closeSettings.addEventListener("click", () => {
  settingsModal.classList.remove("active");
});

saveSettingsButton.addEventListener("click", () => {
  const difficulty = document.querySelector(
    'input[name="difficulty"]:checked'
  ).value;
  gameSpeed = GAME_SPEEDS[difficulty];

  if (gameRunning) {
    clearInterval(gameLoop);
    gameLoop = setInterval(gameUpdate, gameSpeed);
  }

  if (darkModeToggle.checked) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  localStorage.setItem(
    "snakeSettings",
    JSON.stringify({
      difficulty,
      snakeColor,
      darkMode: darkModeToggle.checked,
    })
  );

  settingsModal.classList.remove("active");
});

document.querySelectorAll(".color-option").forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelectorAll(".color-option").forEach((opt) => {
      opt.classList.remove("selected");
    });
    option.classList.add("selected");
    snakeColor = option.dataset.color;
  });
});

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;

  switch (e.key) {
    case "ArrowUp":
      changeDirection("UP");
      break;
    case "ArrowDown":
      changeDirection("DOWN");
      break;
    case "ArrowLeft":
      changeDirection("LEFT");
      break;
    case "ArrowRight":
      changeDirection("RIGHT");
      break;
    case " ":
      togglePause();
      break;
  }
});

upButton.addEventListener("click", () => changeDirection("UP"));
leftButton.addEventListener("click", () => changeDirection("LEFT"));
downButton.addEventListener("click", () => changeDirection("DOWN"));
rightButton.addEventListener("click", () => changeDirection("RIGHT"));

function loadSettings() {
  const savedSettings = JSON.parse(localStorage.getItem("snakeSettings")) || {};

  if (savedSettings.difficulty) {
    document.querySelector(
      `input[name="difficulty"][value="${savedSettings.difficulty}"]`
    ).checked = true;
    gameSpeed = GAME_SPEEDS[savedSettings.difficulty];
  }

  if (savedSettings.snakeColor) {
    snakeColor = savedSettings.snakeColor;
    document.querySelectorAll(".color-option").forEach((option) => {
      option.classList.remove("selected");
      if (option.dataset.color === snakeColor) {
        option.classList.add("selected");
      }
    });
  }

  if (savedSettings.darkMode) {
    darkModeToggle.checked = true;
    document.body.classList.add("dark-theme");
  }
}

setupCanvas();
initGame();
loadSettings();
