let bg;

let fruitGroup;
let fruitHalves;
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

    fruitGroup = new Group(); // for easy management of fruits
    fruitHalves = new Group();
}

function draw() {
    clear();
    image(bg, 0,0, width,height); // background image

    world.gravity.y = 10;

    // when to spawnFruit
    if (frameCount%90 === 0) {
        // nearly 1.5 seconds
        spawnFruit();
    }

    if (mouse.pressing()) {
        // left mouse button dragged
        let tail = new Sprite(mouseX, mouseY, 15);
        tail.stroke = "red";
        tail.color = "red";
        tail.collider = "none";
        tail.life = 25; // lifetime measured in frameCount for that dot

        sliceFruit();
    }
}
// function with parameters
function splitFruit(xpos, ypos, fruitType) {
    // spawn left half
    let left = new Sprite(xpos-10, ypos, 35);
    left.img = fruitType.half1;
    left.vel.x = -3; // veer left
    left.vel.y = random(-5, -2);
    left.rotationSpeed = -5;
    left.life = 30; // 30 frames so half a second

    fruitHalves.add(left); // add to group

    // you do spawn right half
    let right = new Sprite(xpos+10, ypos, 35);
    left.img = fruitType.half1;
    left.vel.x = -3; // veer left
    left.vel.y = random(-5, -2);
    left.rotationSpeed = -5;
    left.life = 30; // 30 frames so half a second

    fruitHalves.add(left); // add to group
}
// cut the fruit using the mouse pressed (or dragged across the canvas)
function sliceFruit() {
    for (let fruit of fruitGroup) {
        // fruit.sliced is a custom property
        if (fruit.sliced) {
            continue; // skip this one, continue next member in the loop
        }

        // dist(): calculate distance
        let distance = dist(mouse.x, mouse.y, fruit.x, fruit.y); // is this fruit near the mouse pointer?
        let hitRadius = fruit.diameter/2 + 5;

        if (distance < hitRadius) {
            fruit.sliced = true; // i am slicing this one

            const fx = fruit.x; // remember
            const fy = fruit.y; // remember

            fruit.remove(); // whole fruit is gone

            // call our new function using 3 parameters
            splitFruit( fx, fy, fruit.type );

            break; // cut one fruit a time per function call
        } // condition
    } // loop to close
}
// randomly choose a fruit to spawn
function spawnFruit() {
    // randomly choose a fruit
    let fruitdata = random(fruitTypes);
    let randomX = random(300,500);

    let one = new Sprite(randomX, height-25);
    one.diameter = 35; // hitbox
    one.img = fruitdata.whole; // set the whole fruit image
    one.vel.y = random(-15, -9);
    one.vel.x = random(-3, 3);
    one.friction = 0; // no reduction of speed when hitting another fruit
    one.type = fruitdata; // custom property type
    //one.debug = true; // see the hitbox

    fruitGroup.add(one);
}