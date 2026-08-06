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
    //   debugging of the variables                x   y
    text("bird.sleeping: " + bird.sleeping       , 20, 40);
    text("bird.vel.y: " + round(bird.vel.y)      , 20, 60);
    text("frameCount = " + frameCount            , 20, 80);
    text("pipeGroup.length = " + pipeGroup.length, 20, 100);

    if ( kb.presses("space") || mouse.presses() ) {
        bird.vel.y = -5;
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
    if ( frameCount % 120 === 0 ) {
        spawnPipePair(); // every 1.5 seconds
    }

    // clean up the pipes
    for (let p of pipeGroup) {
        if (p.x < (bird.x - 200)) {
            p.remove();  // remove from the obstacles
        }
    }

    // camera scrolling
    bird.x = bird.x + 2.5; // bird move towards the right side
    camera.x = bird.x; // camera to follow the bird
    floor.x = bird.x; // floor also follow the bird


    // check for collision
    if ( bird.collides(floor) || bird.collides(pipeGroup) ) {
        noLoop();
    }

}

// top pipe and bottom pipe
function spawnPipePair() {
    let gap = random(50, 120); // space between top and bottom pipe
    let midY = random(250, 400); // middle point between top and bottom pipe

    let someY = midY + gap/2 + 200;

    // ahead of the bird: bird.x + 400
    bottomPipe = new Sprite(bird.x + 400, someY, 52, 320, 'static');
    bottomPipe.img = pipe;
    pipeGroup.add(bottomPipe);


    someY = midY - gap/2 - 200;

    topPipe = new Sprite(bird.x + 400, someY, 52, 320, 'static');
    topPipe.img = pipe;
    topPipe.rotation = 180; // flipped over

    pipeGroup.add(topPipe);

    pipeGroup.layer = 0; // go behind other sprites
}