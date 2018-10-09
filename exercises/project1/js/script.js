/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;
var tx;
var ty;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;
var cat;
var catX;
var catY;
var catRadius = 50;
var mouseRadius = 25;
var miceX = 0;
var miceY = 250;
var miceVX = 2;
var miceVY = 0;
var catHeight = 125;
var preyRadius = 50;
var preyHeight = 50;
var t = 0;

// setup()
//
// Sets up the basic elements of the game

function preload () {

  cat = loadImage ("assets/images/cat.png")
  mouse = loadImage ("assets/images/mouse.png")
  meow = new Audio("assets/sounds/meow.mp3")
  music = new Audio ("assets/sounds/music.mp3")
  alley = loadImage ("assets/images/trash.jpg")
  font = loadFont ("assets/fonts/TSBlockBold.ttf")

}


function setup() {
  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupPlayer();


}


// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  tX = 0;
  tY = 0;
  preyHeight = 50;
  preyRadius = 50;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
  catRadius = 50;
  catHeight = 125;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(alley);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();

    music.play();

push();
    rect(0,0,playerHealth, 10);
    fill(0,255,0);
    pop();

textFont(font);
    textSize(18);
    fill(60, 420, 69);
    text("MICE ATE " + preyEaten, 10, 50);


  }
  else {
    showGameOver();
 //if ( gameOver === true) {
  // gameOver === false;
   //meow.play();
 //}
      //gameovervariable = true
    //  playmusic here
    //}
    music.pause();


//  push();
  //meow.play();
  //noLoop();
//pop ();

  //  miceX += miceVX
  //  miceY +=miceVY

  //  image(cat,miceX,miceY, 50, 50);
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement

  if (keyIsDown(UP_ARROW)){
    playerVY = -playerMaxSpeed;

  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }

  else {
    playerVY = 0;
  }
//ADDED SHIFT TO SPRINT
//ADDED HEALTH DECLINE WITH SPRINT MODE
  if (keyIsDown(UP_ARROW)) {
    if (keyIsDown(16)) {
      playerVY = -10;
      playerHealth = constrain(playerHealth - 1,0,playerMaxHealth);
    }
  //  playerVY = -playerMaxSpeed;
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (keyIsDown(16)) {
      playerVY = 10;
      playerHealth = constrain(playerHealth - 1,0,playerMaxHealth);
    }

  }

  if (keyIsDown(RIGHT_ARROW)) {
    if (keyIsDown(16)) {
      playerVX = 10;
      playerHealth = constrain(playerHealth - 1,0,playerMaxHealth);
    }
}

if (keyIsDown(LEFT_ARROW)) {
  if (keyIsDown(16)) {
    playerVX = -10;
    playerHealth = constrain(playerHealth - 1,0,playerMaxHealth);
  }

}

}



// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  catRadius = constrain(catRadius - 0.1, 25, 50);
  catHeight = constrain(catHeight - 0.2, 62.5, 125);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;

    meow.play ();
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < catRadius + preyRadius) {
    // Increase the player health
    //player is growing with consumption
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    catRadius = catRadius + 1;
    catHeight = catHeight + 1;

    // Reduce the prey health
    //prey is smaller with consumption
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);
    preyRadius = constrain(preyRadius - 0.2, 10, 50);
    preyHeight = constrain (preyHeight - 0.2, 10, 50);
    //tX = tX +10;

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      tX = random(0,width);
      tY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
//  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    //preyX = width*noise(tx);
    //preyY = height*noise(ty);
  //  preyVX = map(random(),0,1,-preyMaxSpeed,preyMaxSpeed);
    //preyVY = map(random(),0,1,-preyMaxSpeed,preyMaxSpeed);


//change to noise based movement!
    preyX = width * noise(tX);
    preyY = height * noise(tY);
tX += 0.01;
tY += 0.01;

  //{

  // Update prey position based on velocity
//  preyX += preyVX;
//  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  //tint(preyFill,preyHealth);
  image(mouse,preyX, preyY, preyRadius,preyHeight);
  //ellipse(preyX,preyY,preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  tint(preyFill,playerHealth);
  image(cat,playerX, playerY, catRadius,catHeight);

//  ellipse(playerX,playerY,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  var r = 255 * noise(t+10);
   var g = 255 * noise(t+20);
   var b = 255 * noise(t+45);

   t = t + 0.01;
textFont(font);
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(r,g,b);
  var gameOverText = "GAME OVER\n";
  gameOverText += "YOU ATE " + preyEaten + " mice\n";
  gameOverText += "BEFORE YOU DIED"
  text(gameOverText,width/2,height/2);
}
