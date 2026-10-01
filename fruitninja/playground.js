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

    drawStartScreen();
}
function drawStartScreen() {
// title of the Game: Fruit Ninja
// instruction
// Press SPACE or click to start Game.
    fill("red");
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Fruit Ninja", width/2, height/2);
}