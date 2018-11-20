/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;

// How many dodges the player has made
var dodges = 0;
var opacity = 0;
var Graff;

var graffArray = [];

var graffImages = [];



var cops;
var bg;
var lou;

var currentImage;
var lambo;
var currentCarimage;

var carImages = [];
// setup()
//
// Make the canvas, position the avatar and anemy

function preload() {

  kilz = loadImage("assets/images/kilz.png");
  graff = loadImage("assets/images/ofsy.png");
  bg = loadImage("assets/images/bg.jpg");
  cops = loadImage("assets/images/cops3.png");
  bart = loadImage("assets/images/simpzin.png");
  lou = loadImage("assets/images/lou.png");
  lambo = loadImage("assets/images/lambo.png");
  rari = loadImage("assets/images/rari2.png");
  porsche = loadImage("assets/images/porsche.png")

  graffImages = [graff,lou];
  carImages = [cops,lambo,rari,porsche];


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


  var randomIndex = floor(random(0,graffImages.length));

  currentImage = graffImages[randomIndex];

  var randomIndex2 = floor(random(0,carImages.length));

  currentCarimage = carImages[randomIndex2];
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(bg);

  fill(0,0,255);
  rect(width/2, 10,255, 10);
  fill(0,255,0);
  rect(width/2, 10, constrain(opacity,0,255), 10);
  text("fill percentage" + map(opacity,0,255,0,100), width/2, 50);



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
        var newGraff = new Graff(mouseX, mouseY, opacity,currentImage);
        graffArray.push(newGraff);
        console.log("addedgraff");
        var randomIndex = floor(random(0,graffImages.length));

        currentImage = graffImages[randomIndex];
    }
    // Add the prey object to the prey array

  }
  else {
    opacity = 0;
  }

  for (var i = 0; i < graffArray.length ; i ++) {
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

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(height, height - height / 3);
    // Reset the avatar's position
    avatarX = width / 2;
    avatarY = height / 2;
    // Reset the dodge counter
    dodges = 0;

    var randomIndex2 = floor(random(0,carImages.length));

    currentCarimage = carImages[randomIndex2];

  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(height, height - height / 3);
    avatarX = width / 2;
    avatarY = height / 2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(height, height - height / 3);

    var randomIndex2 = floor(random(0,carImages.length));

    currentCarimage = carImages[randomIndex2];
  }




  // function mousePressed() {
  //
  //   tint(255, 255);
  //   image(graff, mouseX, mouseY);
  // }

  // Display the number of successful dodges in the console
  console.log(dodges);

  // The player is black
  fill(255, 255, 255);
  // Draw the player as a circle
  image(bart,avatarX, avatarY);

  // The enemy is red
  fill(255, 0, 0);
  // Draw the enemy as a circle
  image(currentCarimage,enemyX, enemyY);

  image(kilz, mouseX, mouseY);


}
