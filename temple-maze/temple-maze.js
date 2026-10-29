const TILE_SIZE = 44;
const MAZE = [
  '###############',
  '#.....#.......#',
  '#.##..#.###...#',
  '#....##...#...#',
  '###..#....#...#',
  '#....#........#',
  '#.#..###.##...#',
  '#.#......#....#',
  '#.######.#.##.#',
  '#........#....#',
  '#.##.....#....#',
  '#....#........#',
  '###############'
];

const GEM_CELLS = [
  { column: 3, row: 1 },
  { column: 12, row: 3 },
  { column: 7, row: 5 },
  { column: 12, row: 7 },
  { column: 6, row: 11 }
];

const PLAYER_START = { column: 1, row: 1 };
const EXIT_CELL = { column: 13, row: 11 };
const GUARD_START = { column: 2, row: 9 };
const GUARD_PATROL = { leftColumn: 2, rightColumn: 8 };
const PLAYER_SPEED = 2.5;
const GUARD_SPEED = 1.15;

let walls;
let player;
let guard;
let exitDoor;
let gems = [];
let gemsCollected = 0;
let guardDirection = 1;
let gameState = 'playing';
let statusElement;
let gemCountElement;

function setup() {
  const gameCanvas = new Canvas(MAZE[0].length * TILE_SIZE, MAZE.length * TILE_SIZE);
  gameCanvas.parent('game-canvas');
  world.gravity.x = 0;
  world.gravity.y = 0;

  walls = new Group();
  walls.w = TILE_SIZE;
  walls.h = TILE_SIZE;
  walls.tile = '#';
  walls.physics = STATIC;
  walls.color = '#705637';
  walls.stroke = '#9b7a4d';
  new Tiles(MAZE, TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);

  createExit();
  createGems();
  createPlayer();
  createGuard();

  statusElement = document.getElementById('game-status');
  gemCountElement = document.getElementById('gem-count');
  document.getElementById('restart-button').addEventListener('click', resetGame);
  updateGemCount();
}

function draw() {
  drawFloor();

  if (gameState !== 'playing') {
    return;
  }

  movePlayer();
  player.collides(walls);
  moveGuard();
  collectGems();
  checkGameEnd();
}

function drawFloor() {
  background('#211d18');
  noStroke();

  for (let row = 0; row < MAZE.length; row++) {
    for (let column = 0; column < MAZE[row].length; column++) {
      if (MAZE[row][column] === '#') continue;

      fill((row + column) % 2 === 0 ? '#3d382f' : '#413b32');
      rect(column * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

function createExit() {
  const position = cellCenter(EXIT_CELL);
  exitDoor = new Sprite(position.x, position.y, TILE_SIZE * 0.68, TILE_SIZE * 0.82);
  exitDoor.physics = NONE;
  exitDoor.color = '#b27b32';
  exitDoor.stroke = '#f2c66d';
}

function createGems() {
  gems = GEM_CELLS.map((cell) => {
    const position = cellCenter(cell);
    const gem = new Sprite(position.x, position.y, 18);
    gem.physics = NONE;
    gem.color = '#52e0cc';
    gem.stroke = '#c4fff2';
    return gem;
  });
}

function createPlayer() {
  const position = cellCenter(PLAYER_START);
  player = new Sprite(position.x, position.y, 25);
  player.color = '#72d6a1';
  player.stroke = '#d9ffe8';
  player.rotationLock = true;
  player.bounciness = 0;
}

function createGuard() {
  const position = cellCenter(GUARD_START);
  guard = new Sprite(position.x, position.y, 28, 30);
  guard.physics = KINEMATIC;
  guard.color = '#d45c48';
  guard.stroke = '#ffd2aa';
  guard.rotationLock = true;
  guardDirection = 1;
}

function movePlayer() {
  let horizontal = 0;
  let vertical = 0;

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) horizontal -= 1;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) horizontal += 1;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) vertical -= 1;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) vertical += 1;

  const length = Math.hypot(horizontal, vertical) || 1;
  player.vel.x = (horizontal / length) * PLAYER_SPEED;
  player.vel.y = (vertical / length) * PLAYER_SPEED;
}

function moveGuard() {
  const leftLimit = GUARD_PATROL.leftColumn * TILE_SIZE + TILE_SIZE / 2;
  const rightLimit = GUARD_PATROL.rightColumn * TILE_SIZE + TILE_SIZE / 2;

  guard.x += GUARD_SPEED * guardDirection;
  if (guard.x >= rightLimit || guard.x <= leftLimit) {
    guardDirection *= -1;
  }
}

function collectGems() {
  for (const gem of gems) {
    if (!gem.visible) continue;

    if (dist(player.x, player.y, gem.x, gem.y) < 22) {
      gem.visible = false;
      gemsCollected += 1;
      updateGemCount();
    }
  }
}

function checkGameEnd() {
  if (dist(player.x, player.y, guard.x, guard.y) < 27) {
    gameState = 'lost';
    player.vel.x = 0;
    player.vel.y = 0;
    guard.vel.x = 0;
    guard.vel.y = 0;
    statusElement.textContent = 'The guard caught you! Press R or Restart to try again.';
    return;
  }

  const atExit = dist(player.x, player.y, exitDoor.x, exitDoor.y) < 30;
  if (atExit && gemsCollected === GEM_CELLS.length) {
    gameState = 'won';
    player.vel.x = 0;
    player.vel.y = 0;
    guard.vel.x = 0;
    guard.vel.y = 0;
    statusElement.textContent = 'You escaped with every gem! Press R or Restart to play again.';
  } else if (atExit) {
    statusElement.textContent = `The exit is sealed. Find ${GEM_CELLS.length - gemsCollected} more gem(s).`;
  } else {
    statusElement.textContent = 'Collect all five gems and find the golden exit.';
  }
}

function updateGemCount() {
  gemCountElement.textContent = `Gems: ${gemsCollected} / ${GEM_CELLS.length}`;
  if (gemsCollected === GEM_CELLS.length) {
    exitDoor.color = '#e5b64f';
    statusElement.textContent = 'All gems found! Reach the golden exit.';
  }
}

function resetGame() {
  gemsCollected = 0;
  gameState = 'playing';

  const playerPosition = cellCenter(PLAYER_START);
  player.x = playerPosition.x;
  player.y = playerPosition.y;
  player.vel.x = 0;
  player.vel.y = 0;

  const guardPosition = cellCenter(GUARD_START);
  guard.x = guardPosition.x;
  guard.y = guardPosition.y;
  guard.vel.x = 0;
  guard.vel.y = 0;
  guardDirection = 1;

  for (const gem of gems) {
    gem.visible = true;
  }

  exitDoor.color = '#b27b32';
  updateGemCount();
  statusElement.textContent = 'Collect all five gems and find the golden exit.';
}

function cellCenter(cell) {
  return {
    x: cell.column * TILE_SIZE + TILE_SIZE / 2,
    y: cell.row * TILE_SIZE + TILE_SIZE / 2
  };
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetGame();
    return false;
  }

  if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW].includes(keyCode)) {
    return false;
  }
}
