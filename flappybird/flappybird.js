// the final game
let bird, floor;
let flapMidImg, bg, base;
let flapUpImg, flapDownImg;

let pipeGroup;
let pipe; // for pipe image
let bottomPipe, topPipe;

function preload() {
    // bird image, background, and the floor
    flapMidImg = loadImage('assets/redbird-midflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');

    flapUpImg = loadImage('assets/redbird-upflap.png');
    flapDownImg = loadImage('assets/redbird-downflap.png');

    pipe = loadImage('assets/pipe-green.png');
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

    pipeGroup = new Group(); // for easy management of many pipes
}

function draw() {
    // test if bg is okay
    image(bg, 0, 0, width, height); // draw the background

    fill("blue");
    textSize(14);
    //                                        x   y
    text("bird.sleeping: " + bird.sleeping  , 20, 40);
    text("bird.vel.y: " + round(bird.vel.y) , 20, 60);
    text("frameCount = " + frameCount       , 20, 80);

    if ( kb.presses("space") ) {
        bird.vel.y = -7;
        bird.sleeping = false; // wake up the bird
    }
    // just for fun
    // if ( mouse.presses() ) {
    //     let s = new Sprite(mouseX, mouseY, 35);
    //     s.collider = "dynamic";
    // }

    if (bird.vel.y < -1) {
        // heading up
        bird.img = flapUpImg;
        bird.rotation = -30;
    }
    else if (bird.vel.y > 1) {
        // heading down
        bird.img = flapDownImg;
        bird.rotation = 30;
    }
    else {
        bird.img = flapMidImg;
        bird.rotation = 0;
    }

    // for testing (only lesson 5)
    if ( frameCount === 1 ) {
        spawnPipePair();
    }


}

// top pipe and bottom pipe
function spawnPipePair() {
    let gap = 50;
    let midY = height /2;

    bottomPipe = new Sprite(400, someY, 52, 320, 'static');
    bottomPipe.img = pipe;

    pipeGroup.add(bottomPipe);
    pipeGroup.layer(0)
}