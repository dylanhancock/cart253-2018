/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 100;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 100;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
var enemyVY = 0;

// How many dodges the player has made
var dodges = 0;
var opacity = 0;
var Graff;

var graffArray = [];

var graffImages = [];

var burner;
var points = 0;
var cops;
var bg;
var lou;

var currentImage;
var lambo;
var currentCarimage;
var currentJailimage;

var carImages = [];
var jailImages = [];
var state = "STREETZ";
var slug;
var jailbart2;
var jailguy;
// setup()
//
// Make the canvas, position the avatar and anemy

function preload() {

  kilz = loadImage("assets/images/kilz.png");
  graff = loadImage("assets/images/ofsy.png");
  bg = loadImage("assets/images/bg.jpg");
  bg2 = loadImage("assets/images/bg2.jpg");
  cops = loadImage("assets/images/cops3.png");
  bart = loadImage("assets/images/simpzin.png");
  lou = loadImage("assets/images/lou.png");
  lambo = loadImage("assets/images/lambo.png");
  rari = loadImage("assets/images/rari2.png");
  porsche = loadImage("assets/images/porsche.png")
  burner = loadFont('assets/fonts/burner.ttf');
  slug = loadFont('assets/fonts/Slug-Regular.otf');
  jailbart = loadImage('assets/images/jailbart.jpg');
  bart2 = loadImage('assets/images/jailbart.png');
  jailbart2 = loadImage('assets/images/jailbart2.jpg');
  jailguy  = loadImage('assets/images/jailguy.png');
  guard = loadImage('assets/images/copz.png');

  graffImages = [graff, lou];
  jailImages = [jailguy, jailguy, jailguy, jailguy, guard];
  jailImages = [jailguy, jailguy, jailguy, jailguy];


}

function setup() {
  // Create our playing area
  createCanvas(852, 480);


  // Put the avatar in the centre
  avatarX = width / 2;
  avatarY = height / 2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(height, height - height / 3);

  // No stroke so it looks cleaner
  noStroke();

  points = 0;
  var randomIndex = floor(random(0, graffImages.length));

  currentImage = graffImages[randomIndex];

  var randomIndex2 = floor(random(0, carImages.length));

  currentCarimage = carImages[randomIndex2];


    var randomIndex3 = floor(random(0, jailImages.length));

    currentJailimage = jailImages[randomIndex3];
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {

  switch (state) {
    case "STREETZ":
    thestreets();
    break;
    //
    // case "JAILBART":
    // gameover();
    // break;
    //
    // case "JAILBART2":
    // gameover2();
    //
    // break;
    //
    // case "JAILBART3":
    // jail();
    //
    // break;
  }
}
  // A pink background

  function thestreets(){

  background(bg2);

  fill(0, 0, 255);
  rect(10, 10, 255, 10);
  fill(0, 255, 0);
  rect(10, 10, constrain(opacity, 0, 255), 10);
  text("fill percentage" + map(opacity, 0, 255, 0, 100), width / 2, 50);


  text("score" + points, width / 2, 100);

  if (points === 1) {

    push();
    textFont(burner);
    fill(0, 255, 0, 100);
    textSize(150);
    text("C R U S H I N G", 40, 430, );
    pop();
  }






  if (mouseIsPressed) {
    // mousePressed();

    opacity++;
    push();
    tint(255, opacity);
    image(currentImage, mouseX, mouseY);
    pop();

    // for (var opacity = 127; opacity < 255; opacity += 10) {
    //   console.log(opacity);
    // }

    // while (opacity < 255) {

    // }

    // mouseIsPressed = true;
    // image(graff,mouseX,mouseY);

    // Create the prey object
    if (opacity === 255) {
      var newGraff = new Graff(mouseX, mouseY, opacity, currentImage);
      graffArray.push(newGraff);
      points += 1;
      console.log("addedgraff");
      var randomIndex = floor(random(0, graffImages.length));

      currentImage = graffImages[randomIndex];
    }
    // Add the prey object to the prey array

  } else {
    opacity = 0;
  }

  for (var i = 0; i < graffArray.length; i++) {
    graffArray[i].display();
  }


  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }


if (currentJailimage === guard) {


  swag();
  swag2();

  push();
  textFont(burner);
  fill(255, 0, 0, 200);
  textSize(150);
  text("C O P S", 40, 430, );
  fill(0, 0, 255, 200);
  text("R U N!", 500, 430, );

  pop();

}

else {
  swag3();
  swag4();
  enemySpeed = 5;
  enemyVX = 5;
  enemyVY = 0;
}
  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = constrain(avatarY,170, 480) + avatarVY;

  // The enemy always moves at enemySpeed

  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;
  enemyY = constrain(enemyY,100, 400) + enemyVY;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  // if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
  //   // Tell the player they lost
  //   console.log("YOU LOSE!");
  //   // Reset the enemy's position
  //
  //   enemyY = random(height, height - height / 3);
  //   enemyX = 0;
  //   enemyVY = 0;
  //   enemyVX = 0;
  //   // Reset the avatar's position
  //   avatarX = width / 2;
  //   avatarY = height / 2;
  //   // Reset the dodge counter
  //   dodges = 0;
  //
  //   var randomIndex2 = floor(random(0,carImages.length));
  //
  //   currentCarimage = carImages[randomIndex2];
  //
  //
  // }

  // if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
  //   // Tell the player they lost
  //   console.log("YOU LOSE!");
  //   // Reset the enemy's position
  //
  //   enemySpeed = 0;
  //   enemyVX = 0;
  //   avatarVX = 0;
  //   text("sorry my friend", 100, 100);
  //   // Reset the avatar's position
  //   // Reset the dodge counter
  //   dodges = 0;
  //
  //
  // }









  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(height, height - height / 3);

    var randomIndex3 = floor(random(0, jailImages.length));

    currentJailimage = jailImages[randomIndex3];
  }




  // function mousePressed() {
  //
  //   tint(255, 255);
  //   image(graff, mouseX, mouseY);
  // }

  // Display the number of successful dodges in the console

  // The player is black
  fill(255, 255, 255);
  // Draw the player as a circle
  image(bart2, avatarX, avatarY);

  // The enemy is red
  fill(255, 0, 0);
  // Draw the enemy as a circle
  // image(currentCarimage,enemyX, enemyY);

  image(currentJailimage, enemyX, enemyY);
  image(kilz, mouseX, mouseY);
}

//
//   for (var i = 0; i < avatarX ; i ++) {
//     image(cops, i, enemyY);
//   }
function swag() {
  if ((dist(enemyX, enemyY, avatarX, avatarY) > enemySize / 2 + avatarSize / 2)) {

var speedboost = 0.0003;
    enemyVX = 5;
    enemyVX += (avatarX - enemyX) * speedboost;
    enemyVY += (avatarY - enemyY) * speedboost;
    console.log(enemyVX);
  }

  else {
    enemyVX = 0;
    enemyVY = 0;
    console.log("arrested");
    state = "JAILBART";

  }
}

function swag2 () {
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
  // If they went off the screen they lose in the same way as above.

  enemyX = 0;
  enemyY = random(height, height - height / 3);
  avatarX = width-width;
  avatarY = height / 2;
  opacity = 0;

  var randomIndex3 = floor(random(0, jailImages.length));
  currentJailimage = jailImages[randomIndex2];
}
}



function swag3() {

 if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
  // If they went off the screen they lose in the same way as above.

  avatarX = width-width;
  avatarY = height / 2;

}
}

function swag4() {

  if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
  // Tell the player they lost
  console.log("YOU LOSE!");
  // Reset the enemy's position

  enemyY = random(height, height - height / 3);
  enemyX = 0;
  enemyVY = 0;
  enemyVX = 0;
  // Reset the avatar's position
  avatarX = width / 2;
  avatarY = height / 2;
  // Reset the dodge counter
  dodges = 0;
  opacity = 0;

  var randomIndex3 = floor(random(0,jailImages.length));

  currentJailimage = jailImages[randomIndex3];


}
}

function gameover () {

  background (jailbart);
  textFont(slug);
  textSize(60);
  text("YOU HAVE", 100, 80);
  text("BEEN CAUGHT", 70, 140);
  text("NOW YOURE IN JAIL", 15, 380);

  if (keyIsPressed && key === ' ') {
    // ... if it was, change the state to "GAME" so the switch statement in draw()
    // will display the game instead
    state = "JAILBART2";
  }
}


function gameover2 () {

  background (jailbart2);
  textFont(slug);
  textSize(60);
  text("WOAH SO LUCKY!", 90, 50);
  textSize(60);
  text("YOUR FRIEND SMUGGLED PAINT", 90, 110);
  text("INTO THE CELL!", 90, 160);

  if (keyIsPressed && key === ' ') {
    // ... if it was, change the state to "GAME" so the switch statement in draw()
    // will display the game instead
    state = "JAILBART3";
  }
}
