function setup() {
  // write your codes here
  new Canvas(600, 600);
  background(200);

  // --- Exercise: Area of Triangle ---
  // write your codes here
  let base = 50;
  let height = 80;
  let areaTriangle = base * height * 0.5;
  console.log("the area of a triangle is "+ areaTriangle);

  textSize(16);
  text("the area of a triangle is "+ areaTriangle, 50, 100);

  let total = 0;
  for (let i=2; i <=20 ; i+=2) {
    //   sometext, x,  y
    //text(i,      50, 120+(i*10));
    console.log(i);
    total = total + i;
  }
  // --- Exercise: Sum of first 10 even numbers ---
  // write your codes here
  text("the sum is "+ total, 50, 200);



  // --- Exercise: Age category classification ---
  // write your codes here
  let myAge = 11;
  // infant: 0 - 2
  // toddler: 3 - 4
  // child: 5 - 13
  // teen: 13 - 15

  // --- Exercise: Display odd numbers backward using while loop ---
  // write your codes here

  // --- Exercise: Array operations (groceries) ---
  // write your codes here
}

// draw function
function draw() {

}