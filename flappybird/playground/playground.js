let floor;

function setup() {
    new Canvas(600,400);
    background("lightgray");

    world.gravity.y = 10;

    floor = new Sprite();
    floor.y = 50;
    floor.width = width;
    floor.collider = "static";
}

function draw() {
    background("lightgray"); // erase

    if (mouse.presses()) {
        let s = new Sprite(mouseX, mouseY);
        s.diameter = 35;
    }
}