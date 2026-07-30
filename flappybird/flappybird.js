// the final game
let bird, floor;
let flapMidImg, bg, base;
let flapUpImg, flapDownImg;

function preload() {
    // bird image, background, and the floor
    flapMidImg = loadImage('assets/redbird-midflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');

    flapUpImg = loadImage('assets/redbird-upflap.png');
    flapDownImg = loadImage('assets/redbird-downflap.png');
}

function setup() {
    new Canvas(400, 600);
    background("white");

    bird = new Sprite();
    bird.x = width /2;
    bird.y = 200;
    bird.width = 30;
    bird.height = 30;
    bird.img = flapMidImg;

    bird.collider = "dynamic";
    bird.mass = 2; // weight
    bird.drag = 0.02; // air resistance
    bird.bounciness = 0.5; // does it bounce or not?

    floor = new Sprite();
    floor.x = 200;
    floor.y = height -20;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static"; // does not respond gravity
    floor.img = base;

    world.gravity.y = 10; // gravity pulls the sprite
}

function draw() {
    // test if bg is okay
    image(bg, 0, 0, width, height); // draw the background

    fill("blue");
    textSize(14);
    //                                        x   y
    text("bird.sleeping: " + bird.sleeping  , 20, 40);
    text("bird.vel.y: " + round(bird.vel.y) , 20, 60);

    if ( kb.presses("space") ) {
        bird.vel.y = -7;
        bird.sleeping = false; // wake up the bird
    }
    // just for fun
    if ( mouse.presses() ) {
        let s = new Sprite(mouseX, mouseY, 35);
        s.collider = "dynamic";
    }

    i
}