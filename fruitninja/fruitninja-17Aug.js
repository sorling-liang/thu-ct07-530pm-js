let bg;

let fruitGroup;
let fruitTypes;

function preload() {
    bg = loadImage("assets/dojobackground.png");

    let peach = {
        whole: loadImage("assets/peachwhole.png"),
        half1: loadImage("assets/peachhalf.png"),
        half2: loadImage("assets/peachhalf2.png"),
        splash: loadImage("assets/peachsplash.png"),
    }
    let watermelon = {
        whole: loadImage("assets/watermelonwhole.png"),
        half1: loadImage("assets/watermelonhalf.png"),
        half2: loadImage("assets/watermelonhalf.png"),
        splash: loadImage("assets/watermelonsplash.png"),
    }

    fruitTypes = [peach, watermelon];
}

function setup() {
    new Canvas(800,600);
    background("brown");

    fruitGroup = new Group();
}

function draw() {
    image(bg, 0,0, width,height);

    world.gravity.y = 10;

    // when to spawnFruit
    if (frameCount%90 === 0) {
        // nearly 1.5 seconds
        spawnFruit();
    }

    if (mouse.pressing()) {
        // left mouse button dragged
        let tail = new Sprite(mouseX, mouseY, 7);
        tail.stroke = "red";
        tail.color = "red";
        tail.collider = "none";
        tail.life = 25; // lifetime measured in frameCount for that dot
    }
}
// randomly choose a fruit to spawn
function spawnFruit() {
    // randomly choose a fruit
    let fruitdata = random(fruitTypes);
    let randomX = random(300,500);

    let one = new Sprite(randomX, height/2);
    one.diameter = 35;
    one.img = fruitdata.whole; // set the whole fruit image
    one.vel.y = random(-10, -6);
    one.vel.x = random(-2, 2);
    one.friction = 0;
    one.type = fruitdata;
    //one.debug = true; // see the hitbox

    fruitGroup.add(one);
}