let ball;

function setup() {
  // Set up the canvas
       //    w     h
  new Canvas(400, 600);
  background(220); //background color

  // Basic shape testing
  // write your codes here
  noStroke();
  ball = new Sprite();
  ball.x = 0;
  ball.y = 50; // somewhere high up
  ball.diameter = 30;
  ball.color = "red";
  ball.vel.x = 5; // velocity in the x direction
  ball.vel.y = 5; // velocity in the y direction
 
  // End Basic shape testing
                 //   x,  y,   w,  h
  square = new Sprite(180,500,150, 10);
  square.color = "blue";

   // Create a bouncing ball sprite
   // write your codes here

}

function draw() {
  // write your codes here
  background(220);

  /*
  p5.js shapes here
  */
  React(100, 100, )

  textSize(16);
  text("Ball: " + round(ball.x) + "," + round(ball.y), 20, 50);
  text("Ball: " + ball.diameter,                       20, 80);

  if (ball.x > 400 || ball.x < 0) {
    ball.vel.x = -1 * ball.vel.x;
  }

  if (ball.y > 600 || ball.y < 0) {
    ball.vel.y = -1 * ball.vel.y;
  }
}