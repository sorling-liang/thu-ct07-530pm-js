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
function setup() {
    new Canvas(400, 600);
    background("skyblue");

    bird = new Sprite();
    bird.img = flapMidImg;

    floor = new Sprite();
    floor.img = base;
}

function draw() {

}