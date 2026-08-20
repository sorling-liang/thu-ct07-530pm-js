// 3 functions needed for p5play

let digitImg;
let digitLabel;

function preload() {
    digitImg = loadImage("assets/0.png");
}

function setup() {
    new Canvas(400, 600);
    digitLabel = new Sprite();
    digitLabel.img = digitImg;
}

function draw() {
    background("skyblue");
}