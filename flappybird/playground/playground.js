let floor;

function setup() {
    new Canvas(600,400);
    background("lightgray");

    world.gravity.y = 10;

    floor = new Sprite();
    floor.y = 0;
}

function draw() {
    background("lightgray"); // erase

    if (mouse.presses()) {
        let s = new Sprite(mouseX, mouseY);
        s.diameter = 35;
    }
}