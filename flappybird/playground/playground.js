// 3 functions needed for p5play

let digitImgs = []; // change to array
let digitLabel;
let score = 1; // to keep track
let scoreGroup; // group to manage the digits for score above 100

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

    scoreGroup = new Group();
    
}

// forever loop
function draw() {
    background("skyblue"); // erase
    
    // add debugging to show score
    textSize(14);
    text("score: " + score,           50,50);
    text("frameCount: " + frameCount, 50,70);

    //digitLabel.img = digitImgs[score]; // load the correct image using the array

    // add keyboard event
    // up arrow to increase score
    // down arrow to decrease score
    if (kb.presses("up")) {
        score = score +1;
    }
    else if (kb.presses("down")) {
        score = score -1;
    }
    else if (kb.presses("2")) {
        score = round(random(10,99));
    }

    score = constrain(score,0,99); // keep the variable within the digits
    drawScore();
}

function drawScore() {
    let scoreString = str(score);
    let digitArray = scoreString.split(""); // split at every character
    // print(score);
    // print(digitArray.length);
    // print(digitArray[0]);
    // print(digitArray[1]);

    // if (score > 10) {
    //     noLoop();
    // }
}

function moveGroup() {
}