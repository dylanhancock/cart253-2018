// Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.

var ball;
var leftPaddle;
var rightPaddle;
// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
// var leftPaddle = {
//   x: 0,
//   y: 0,
//   w: 20,
//   h: 70,
//   vx: 0,
//   vy: 0,
//   speed: 5,
//   upKeyCode: 87, // The key code for W
//   downKeyCode: 83 // The key code for S
// }

// RIGHT PADDLE

// Basic definition of a left paddle objects with its key properties of
// position, size, velocity, and speed
// var rightPaddle = {
//   x: 0,
//   y: 0,
//   w: 20,
//   h: 70,
//   vx: 0,
//   vy: 0,
//   speed: 5,
//   upKeyCode: 38, // The key code for the UP ARROW
//   downKeyCode: 40 // The key code for the DOWN ARROW
// }

// A variable to hold the beep sound we will play on bouncing
var beepSFX;

var leftPaddlepoints;
var rightPaddlepoints;
// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(0,255,0);

  setupPaddles();
  setupBall();

  rightPaddlepoints = 0;
  leftPaddlepoints = 0;
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {

  leftPaddle = new Paddle(paddleInset,height/2, 20, 70, 0, 0, 87, 83, 5);


  // leftPaddle = new Paddle(x, y);

  // Initialise the left paddle
 rightPaddle = new Paddle(width-paddleInset, height /2, 20, 70, 0, 0, 38, 40, 5);

  // Initialise the right paddle
  //rightPaddle.x = width - paddleInset;
  //rightPaddle.y = height / 2;
}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball = new Ball(width / 2, height / 2, 5, 0.1, 0.1, 7);
}

var t = 0;

// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
///NEW//////
//Noise based background colour changes/////
  var r = 255 * noise(t+10);
  var g = 255 * noise(t+15);
  var b = 255 * noise(t+20);
  t += 0.01;

background(r,g,b);

///END NEW*****////
  // Handle input

  // Notice how we're using the SAME FUNCTION to handle the input
  // for the two paddles!

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  // Update positions of all objects
  // Notice how we're using the SAME FUNCTION to handle the input
  // for all three objects!
  // updatePosition(leftPaddle);
  // updatePosition(rightPaddle);
  // updatePosition(ball);
  ball.updatePosition();
  ball.handleBallWallCollision();
  ball.handleBallOffScreen();
  ball.handleBallPaddleCollision();


  leftPaddle.updatePosition ();
  rightPaddle.updatePosition ();

  // Handle collisions
  //handleBallWallCollision();
  rightPaddle.handleBallPaddleCollision();
  leftPaddle.handleBallPaddleCollision();


  ball.handleBallPaddleCollision();

  // Handle the ball going off screen

  // Display the paddles and ball
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
  ////NEW/////
  //added paddle text
  textSize(30);
  text(rightPaddlepoints, 20, 40);
  text(leftPaddlepoints, width - 30, 40)
  ////////****END/////
}


// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.


// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
// ball.updatePosition();
//function updatePosition(object) {
  //object.x += object.vx;
//  object.y += object.vy;
//}

//handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy


// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces


// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so

/////END NEW///////
///NEW//////
//Added if statement to ensure the ball's velocity reverses at a random number and the paddle points increase//





    // NOTE that we don't change its velocity here so it just
    // carries on moving with the same velocity after its
    // position is reset.
    // This is where we would count points etc!

  // console.log(ball.speed)
  /////END NEW/////////////
////NEW/////
//added reset function///
function reset() {
  ball.vx = -ball.vx;

  //abs(ball.vx) * random(5,10);
  //ball.speed = -ball.speed;

}
////END NEW///
// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
  rect(ball.x, ball.y, ball.size, ball.size);
}

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
function displayPaddle(paddle) {
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}
