// create 3 functions
// 1. preload
// 2. setup, canvas 800 by 600
// 3. draw
let dojoImg;

function preload() {
    dojoImg = loadImage("assets/dojobackground.png");
}
function setup() {
    new Canvas(800,600);
    background("orange");
}
function draw() {
    // need the dojo image
    clear();
    image(dojoImg, 0,0, width, height);

    drawGameOverScreen();
}
function drawGameOverScreen() {
    fill(0, 150); // 2nd number transparency
    rect(0,0, width, height);

    fill("red");
    textAlign(CENTER, CENTER);

    textSize(64);
    text("Game Over", width/2, height/2);
    fill("white");
    textSize(30);
    text("Score: 0", width/2, height/2+55);
    text("Press SPACE to restart", width/2, height/2+55);
    text("Press SPACE to restart", width/2, height/2+55);
}
function drawStartScreen() {
    fill(0, 150); // 2nd number transparency
    rect(0,0, width, height);

    fill("red");
    textAlign(CENTER, CENTER);

    textSize(64);
    text("Fruit Ninja", width/2, height/2);

    textSize(30);
    text("Press SPACE or click to start", width/2, height/2+55);
}