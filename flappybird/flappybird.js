// the final game
let bird, floor;
let flapMidImg, bg, base;

function preload() {
    // bird image, background, and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
}


function setup() {
    new Canvas(400, 600);
    background("white");
}

function draw() {
    // test if bg is okay
    image(bg, 0, 0, width, height); // draw the background
}