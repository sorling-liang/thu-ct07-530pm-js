let bg;

let fruitGroup; // spawnFruit
let fruitHalves; // split into half

let fruitTypes; // array of different fruits

let score;
let missed;

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
    world.gravity.y = 10;

    score = 0; // week 13
    missed = 0; // week 14
}

function draw() {
    clear();
    image(bg, 0,0, width,height); // background image

    drawStartScreen();
    return;

    displayHeader(); // call the function

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

    // write a loop for fruitGroup
    for (let one of fruitGroup) {
        // count the "missed" fruit
        if (one.y > height + 50) {
            one.remove(); // improve the performance
            missed++;
        }
    }
}
function drawStartScreen() {
    fill(0, 150); // 2nd number transparency
    rect(0,0, width, height);

    fill("red");
    textAlign(CENTER, CENTER);

    textSize(64);
    text("Fruit Ninja", width/2, height/2);

    textSize(30);
    text("Press SPACE or click to start", width/2, height/2+55);
}
function displayHeader() {
    fill("white");
    textSize(30);
    textAlign(LEFT, CENTER);
    text("Score: " + score,    30, 30);
    text("Missed: " + missed, 330, 30);
}

// function with parameters
function splitFruit(xpos, ypos, fruitType) {
    // spawn left half
    let left = new Sprite(xpos-10, ypos, 35);
    left.img = fruitType.half1;
    left.vel.x = -3; // veer left
    left.vel.y = random(-5, -2);
    left.rotationSpeed = -5;
    left.life = 60; // 30 frames so half a second

    fruitHalves.add(left); // add to group

    // you do spawn right half
    let right = new Sprite(xpos+10, ypos, 35);
    right.img = fruitType.half2;
    right.vel.x = 3; // veer left
    right.vel.y = random(-5, -2);
    right.rotationSpeed = 5;
    right.life = 60; // 30 frames so half a second

    fruitHalves.add(right); // add to group
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

            // week 13: added score
            score++;

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