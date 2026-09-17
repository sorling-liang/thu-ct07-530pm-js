let score = 0;
let missed = 0;
let timer = 60; // give 60 seconds of gameplay
let fcStart = -1; // fc for frameCount

let bg; // bg as background

let gameState = "start"; // start-play-gameover

let bgm;
let soundfx;

let fruitGroup;
let fruitTypes = []; // an Array in JavaScript

function preload() {
    bg = loadImage("assets/dojobackground.png");
    bgm = createAudio("assets/fruit-ninja-bgtrack.mp3");
    soundfx = createAudio("assets/fruit-ninja-combo.mp3");

    let watermelon = { type: "watermelon" };
    watermelon.whole = loadImage("assets/watermelonwhole.png");

    let peach = { type: "peach" };
    peach.whole = loadImage("assets/peachwhole.png");

    fruitTypes = [watermelon, peach];
}

function setup() {
    new Canvas(800,600);
    world.gravity.y = 10;

    fruitGroup = new Group();
}

function draw() {
    clear(); // erase the canvas
    
    image(bg, 0,0, width, height); // background image

    if (gameState === "play") {
        if (fcStart < 0) fcStart = frameCount; // keep a record
        
        // slice animation
        if (mouse.pressing()) {
            // mouse is dragged (and pressed down)
            let trail = new Sprite(mouseX, mouseY, 7);
            trail.stroke = "red"; // no outline
            trail.color = "red";
            trail.collider = "none";
            trail.life = 10; // 10 frames
        }
        displayGameStats(); // game progress statistics

        // every 1 second, decrease timer
        if ( (frameCount-fcStart+1) % 60 === 0) {
            timer--;
        }
        if (timer === 0) {
            gameState = "gameover";
            timer = 60;
            score = 0;
            missed = 0;
            return;
        }
        // every second
        if (frameCount % 60 === 0) {
            spawnFruit();
        }

        for (let one of fruitGroup) {
            if (one.y > height + 10) {
                // update variable missed
                missed++;
                one.remove(); // remove from sprite group
            }
        }
        
        // debugging
        fill("white");
        textSize(18);
        textAlign(LEFT, CENTER)
        text("fruitGroup.length="+ fruitGroup.length, 35,70);

    } else if (gameState === "start") { 
        displayStartScreen();

        if (kb.presses("space") || mouse.presses()) {
            gameState = "play";
        }   

    } else if (gameState === "gameover") { 
        displayGameOver();

        if (kb.presses("space") || mouse.presses()) {
            gameState = "play";
        }   
    }

    // else if (kb.presses("1")) {
    //     bgm.loop(); // play continuously
    // }
    // else if (kb.presses("2")) {
    //     soundfx.play();
    // }    
    // else if (kb.presses("down")) {
    //     bgm.stop();
    // }

    // if (mouse.presses()) {
    //     let abc = new Sprite(mouseX, mouseY, 35);
    //     abc.vel.y = random(-6, -10);
    // }

}

// randomly choose a fruit to spawn
function spawnFruit() {
    let one = new fruitGroup.Sprite();

    let selected = random(fruitTypes);
    one.img = selected.whole; // find the fruit picture
    one.type = selected; // to remember the fruit object

    one.diameter = 40;
    one.x = random(300,500);
    one.y = height - 100;
    one.vel.y = random( -12, -7 );
    one.vel.x = random( -2, 2 );
    one.friction = 0; // no friction
}

function displayStartScreen() {
    // waiting for space key press
    fill("red"); // pen color
    textSize(48);
      //       x        y
    textAlign(CENTER, CENTER);
    text("FRUIT NINJA", width/2, height/2);

    fill("white"); // pen color
    textSize(24);
    text("Press SPACE to start",   width/2, height/2+50);
}

function displayGameStats() {
    fill("white"); // pen color
    textSize(24);

    textAlign(LEFT, CENTER);
    text("Score: " + score, 10, 28); // y =28

    textAlign(CENTER, CENTER);
    text("Missed: " + missed, width/2, 28); // y =28

    textAlign(RIGHT, CENTER);
    text("Time: " + timer +"s", width-10, 28); // y =28
}

function displayGameOver() {
    clear();
    // draw text
    // red text to show GAME OVER per screenshot
    // white text for game stats
    fill("red"); // pen color
    textSize(48);
      //       x        y
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2);
    fill("white"); // pen color
    textSize(24);
    text("Score: " + score,          width/2, height/2+50);
    text("Missed Fruits: " + missed, width/2, height/2+80);
    text("Press SPACE to Restart",   width/2, height/2+110);
}