let bg;

let fruitGroup; // spawnFruit
let fruitHalves; // split into half

let fruitTypes; // array of different fruits

let score = 0;
let missed = 0;
let timer = 60; // lesson 12

let gameState = "start"; // "start" or "play"

let slice_sfx;
let bgMusic;

let intervalObject;

let difficultyLevel = 1;

function preload() {
    bg = loadImage("assets/dojobackground.png");

    slice_sfx = loadSound("assets/fruit-ninja-combo.mp3");
    bgMusic = loadSound("assets/fruit-ninja-bgtrack.mp3");

    let peach = {
        name: "peach",
        whole: loadImage("assets/peachwhole.png"),
        half1: loadImage("assets/peachhalf.png"),
        half2: loadImage("assets/peachhalf2.png"),
        splash: loadImage("assets/peachsplash.png"),
    }
    let watermelon = {
        name: "watermelon",
        whole: loadImage("assets/watermelonwhole.png"),
        half1: loadImage("assets/watermelonhalf.png"),
        half2: loadImage("assets/watermelonhalf.png"),
        splash: loadImage("assets/watermelonsplash.png"),
    }
    let lemon = {
        name: "lemon",
        whole: loadImage("assets/lemonwhole.png"),
        half1: loadImage("assets/lemonhalf.png"),
        half2: loadImage("assets/lemonhalf.png"),
        splash: loadImage("assets/watermelonsplash.png"),
    }
    let bomb = {
        name: "bomb",
        whole: loadImage("assets/fruitbomb.png"),
        half1: loadImage("assets/watermelonsplash.png"),
        half2: loadImage("assets/watermelonsplash.png"),
        splash: loadImage("assets/watermelonsplash.png"),
    }
     
    fruitTypes = [peach, watermelon, lemon, bomb];
}

function setup() {
    new Canvas(800,600);

    fruitGroup = new Group(); // for easy management of fruits
    fruitHalves = new Group();
    world.gravity.y = 10;

    score = 0; // week 13
    missed = 0; // week 14
}

function draw() {
    clear();
    image(bg, 0,0, width,height); // background image

    if ( timer <= 0 && gameState === "play" ) {
        gameState = "gameover";
        drawGameOverScreen();
        noLoop(); // stop draw() function
        return;
    }

    // listen only WHEN gameState = "start"
    if (( kb.presses('space') || mouse.presses() ) && gameState === "start") {
        // either space key press or mouse click
        gameState = "play";
        // bgMusic.loop(); // playing non-stop

        score = 0;
        missed = 0;
        timer = 60;

        // reset
        fruitGroup.removeAll();
        fruitHalves.removeAll();

        // setTimeout() vs setInterval()
        intervalObject = setInterval( updateTimeLeft, 1000 ); // 1000ms is 1 second;

        difficultyLevel = 1;
    }

    if (gameState === "start") {
        drawStartScreen();
        return;
    }
    
    if (gameState === "gameover") {
        return;    
    }

    displayHeader(); // call the function

    // when to spawnFruit
    if (frameCount%90 === 0) {
        // nearly 1.5 seconds
        for (let count=0; count < difficultyLevel; count++) {
            spawnFruit();
        }
    }

    if (timer > 45) {
        difficultyLevel = 1;
        //print(difficultyLevel)

    } else if (timer > 30) {
        difficultyLevel = 2;
        //print(difficultyLevel)

    } else if (timer > 15) {
        difficultyLevel = 3;
        //print(difficultyLevel)

    } else {
        difficultyLevel = 4;
        //print(difficultyLevel)
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

// for countdown timer
function updateTimeLeft() {
    timer--; // subtract by one each time

    if (timer < 0) {
        clearInterval( intervalObject ); // performance cleanup
        print("cleanup interval done");
    }
}

function drawGameOverScreen() {
    fill(0, 180); // 2nd number transparency
    rect(0,0, width, height);

    fill("red");
    textAlign(CENTER, CENTER);

    textSize(64);
    text("Game Over", width/2, height/2);
    fill("white");
    textSize(24);
    text("Score: " + score,          width/2, height/2+55);
    text("Missed Fruits: " + missed, width/2, height/2+95);
    text("Press SPACE to restart",   width/2, height/2+135);

    fruitGroup.removeAll();
    fruitHalves.removeAll();
}

function drawStartScreen() {
    fill(0, 150); // 2nd number transparency
    rect(0,0, width, height);

    fill("white");
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
    text("Missed: " + missed, 25, 30);

    textAlign(CENTER, CENTER);
    text("Score: " + score,   width/2, 30);

    textAlign(RIGHT, CENTER);
    text("Time: " + timer,   width-25, 30);
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
            if (fruit.fruitname === "bomb") {
                gameState = "gameover";
                return;
            }

            fruit.sliced = true; // i am slicing this one
            slice_sfx.play(); // play sound effects

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
    print(fruitdata.name);
    one.fruitname = fruitdata.name;
    //one.debug = true; // see the hitbox

    fruitGroup.add(one);
}