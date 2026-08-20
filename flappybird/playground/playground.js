// 3 functions needed for p5play

let digitImg;
let digitLabel;
let score = 8;

function preload() {
    digitImg = loadImage("assets/8.png");
}

// called once
function setup() {
    new Canvas(400, 600);
    digitLabel = new Sprite();
    digitLabel.collider = "none";
    digitLabel.img = digitImg;
}

// forever loop
function draw() {
    background("skyblue");
}