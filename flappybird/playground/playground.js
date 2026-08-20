// 3 functions needed for p5play

let digitImgs = []; // change to array
let digitLabel;
let score = 1; // to keep track

function preload() {
    //digitImg = loadImage("assets/7.png");

    let prefix = "assets/";
    let suffix = ".png";
    let filename = "";

    for (let count=0; count<10; count++) {
      filename = prefix + count + suffix;
      //print(filename);
      digitImgs[count] = loadImage(filename);
    }
}

// called once
function setup() {
    new Canvas(400, 600);

    digitLabel = new Sprite();
    digitLabel.y = 50;
    digitLabel.width = 25; // sprite.w
    digitLabel.height = 36; // sprite.h
    digitLabel.collider = "none";
    digitLabel.img = digitImgs[score]; // load the correct image using the array
}

// forever loop
function draw() {
    background("skyblue"); // erase
    
    // add debugging to show score
    textSize(14);
    text("score: " + score,           50,50);
    text("frameCount: " + frameCount, 50,70);

    digitLabel.img = digitImgs[score]; // load the correct image using the array

    // add keyboard event
    // up arrow to increase score
    // down arrow to decrease score
    if (kb.presses("up")) {
        score = score +1;
    }
    else if (kb.presses("down")) {
        score = score -1;
    }
    score = constrain(score,0,9); // keep the variable within the digits
}

function drawScore() {
    let scoreString = str(score);
    let digitArray = scoreString.split(""); // split at every character
    print(digitArray.length);
    
    if (score > 10) {
        noLoop();
    }
}

function moveGroup() {

}