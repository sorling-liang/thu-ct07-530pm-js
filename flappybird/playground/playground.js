
function setup() {
    new Canvas(600,400);
    background("lightgray");
    world.gravity.y = 10;
}

function draw() {
    if (mouse.presses()) {
        new Sprite();
    }
}