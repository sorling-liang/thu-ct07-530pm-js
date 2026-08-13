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
    bird.w = 25;
    bird.h = 25;
    bird.img = flapMidImg;
    bird.bounciness = 0.7;
    bird.debug = true; // show me the hitbox

    floor = new Sprite();
    floor.w = width;
    floor.h = 125;
    floor.collider = "static";
    floor.img = base;
    floor.y = height -25;

    world.gravity.y = 10;
}

// task 5: add the keyboard events to control the bird
function draw() {
    background("skyblue"); // erase the trail of the falling bird
}