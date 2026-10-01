// javascript object

let person = {
    eyecolor: "black",
    wallet: 10000,
    race: "Malay",
}; // js object


// person.eyecolor = "black";
// person.wallet = 1000;
// person.race = "Chinese";
person.gender = "male";
person.height = 160;
person.age = 25;
person.citizenship = "Chinese Nationality";

function setup() {
    new Canvas(250,250);
    background("cyan");

    print(person);
}

function draw() {

}