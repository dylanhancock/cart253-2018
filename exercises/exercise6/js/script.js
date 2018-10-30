// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.


// Variable to contain the objects representing our ball and paddles
/////FIXED BALL SPELLING
var ball;
var leftPaddle;
var rightPaddle;
var paddleInset = 10;
// setup()
//
// Creates the ball and paddles

////FIXED CREATE CANVAS
function setup() {
  createCanvas(640,480);
  noStroke();
  // Create a ball
  fill(0,255,0);
  setupBall();
  setupPaddles();
}
  function setupBall() {
  ball = new Ball(width/2,height/2,2,1,10,20);
  }
  // Create the right paddle with UP and DOWN as controls
  function setupPaddles () {
  rightPaddle = new Paddle(width-20,height/2,10,60,10,40,38);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  /////ADDED BRACKET FIXED
  leftPaddle = new Paddle(paddleInset,height/2,10,60,10,83,87);

}
// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();
///ADDED BRACKETS
  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  ball.isOffscreen();
  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  displayBall();

  function displayBall() {
    rect (ball.x, ball.y, ball.size, ball.size)
  }

  leftPaddle.display();
  rightPaddle.display();

}
