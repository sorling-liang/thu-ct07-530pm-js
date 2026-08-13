// write your codes here

// task 3:
// show me a bird sprite
// show me a floor sprite with base.png
let bird, floor;
let flapMidImg, base;

// task 1: write 3 functions needed for p5play
function preload() {
    flapMidImg = loadImage("assets/yellowbird-midflap.png");
    base = loadImage("assets/base.png");
}

// task 2: create a canvas
// task 4: add gravity
function setup() {
    new Canvas(400, 600);
    background("skyblue");

    bird = new Sprite();
    bird.img = flapMidImg;
    bird.bounciness = 0.7;
    bird.debug = true;

    floor = new Sprite();
    floor.w = width;
    floor.h = 125;
    floor.collider = "static";
    floor.img = base;
    floor.y = height -25;

    world.gravity.y = 10;
}

function draw() {
    background("skyblue");
}