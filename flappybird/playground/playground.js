
function setup() {
    new Canvas(600,400);
    background("lightgray");
    
    world.gravity.y = 10;
}

function draw() {
    background("lightgray");

    if (mouse.presses()) {
        new Sprite();
    }
}