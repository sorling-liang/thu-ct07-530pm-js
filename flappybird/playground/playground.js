// 3 functions needed for p5play

let digitImgs = [];
let digitLabel;
let score = 7; // to keep track

function preload() {
    //digitImg = loadImage("assets/7.png");
    
}

// called once
function setup() {
    new Canvas(400, 600);

    digitLabel = new Sprite();
    digitLabel.y = 50;
    digitLabel.width = 25;
    digitLabel.height = 36;
    digitLabel.collider = "none";
    digitLabel.img = digitImg;
}

// forever loop
function draw() {
    background("skyblue");
}