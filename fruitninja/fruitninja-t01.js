let score = 2;
let missed = 10;

let bg;

let gameStart = false;

let bgm;
let soundfx;

function preload() {
    bg = loadImage("assets/dojobackground.png");
}

function setup() {
    new Canvas(800,600);
    background("brown");
}

function draw() {
    image(bg, 0,0, 800,600);

    if (kb.presses("space")) {
        gameStart = true;
    }

    if (gameStart) {
        displayGameStats();
    } else {
        displayGameOver();
    }
}

function displayStartScreen() {
    // waiting for space key press
}

function displayGameStats() {

}

function displayGameOver() {
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