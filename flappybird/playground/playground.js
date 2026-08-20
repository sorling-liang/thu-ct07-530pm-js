// 3 functions needed for p5play

let digitImg;
let digitLabel;

function preload() {
    digitImg = loadImage("assets/")
}

function setup() {
    new Canvas(400, 600);
}

function draw() {
    background("skyblue");
}