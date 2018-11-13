// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.
var canscore = true;
// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
var topPaddle;
var bottomPaddle;
var evilball;
var evilball2;
var start = false;
var angle = 0.01;
var speed = 0.03;
var pong;
var orangeball;
// setup()
//
// Creates the ball and paddles
var fonty;
var rainbow;
var cool;
var rainbowball;
var balls;
var paddle2;
var openingImage;
var whiteball;
var blackball;

function preload() {

  fonty = loadFont("assets/fonts/PERSONAL.TTF");
  rainbow = loadImage("assets/images/Ord.png");
  cool = loadImage("assets/images/wheel.png");
  gif = loadImage("assets/images/rainboworb.gif");
  pong = loadImage("assets/images/pong.png");
  paddle2 = loadImage("assets/images/pongpaddle.png");
  openingImage = loadImage("assets/images/swag.png");
  whiteball = loadImage("assets/images/whiteball.png");
  blackball = loadImage("assets/images/blackball.png");
}


function setup() {

  createCanvas(640, 480);
  // Create a ball
  balls = [whiteball, rainbow, pong, whiteball, blackball];
  ball = new Ball(width / 2, height / 2, 5, 5, 10, 5, balls, orangeball);
  // Create the right paddle with UP and DOWN as controls
  evilball = new Evilball(width / 4, height / 2, 5, 5, 10, 2, 255);

  evilball2 = new Evilball(width / 4, height / 2, 5, 5, 10, 2, 0);

  rainbowball = new Rainbow(width / 2, height / 2, 5, 5, 100, 2);

  rightPaddle = new Paddle(width - 10, height / 2, 10, 60, 10, DOWN_ARROW, UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0, height / 2, 10, 60, 10, 83, 87);

  rightPaddlepoints = 0;
  leftPaddlepoints = 0;
//sets the tx determining background colour to random numbers for noise function
  tx = random(0, 1000);
  ty = random(0, 1000);

  textFont(fonty);

}

var t = 0;
var gameover = false;


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.


function draw() {
//if screen is not pressed, display the click to start screen
  if (start) {


    var r = 255 * noise(t + 10);
    var g = 255 * noise(t + 15);
    var b = 255 * noise(t + 20);
    t += 0.01;

    background(r, g, b);
//paddles input
    leftPaddle.handleInput();
    rightPaddle.handleInput();
//update functions
    ball.update();
    evilball.update();
    evilball2.update2();
    rainbowball.update();
    leftPaddle.update();
    rightPaddle.update();
//off screen function to reset ball
    ball.isOffScreen();



//colllision functions
    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);
    evilball2.handleCollision(rightPaddle);
    evilball.handleCollision2(leftPaddle);
    rainbowball.handleCollision(ball);


//display functions
    ball.display();
    evilball.display();
    evilball2.display();
    rainbowball.display();
    leftPaddle.display();
    rightPaddle.display();
//paddle score text
    textSize(40);
    text(rightPaddlepoints, 20, 40);
    text(leftPaddlepoints, width - 40, 40);
//game over based on paddle height and score
    gameOver();


  }

  //added click to start screen
  else {
    background(0, 255, 0);
    textSize(40);
    text("PRESS ANYWHERE TO BEGIN", 10, height / 2 - 100);
    image(openingImage, 70, -200, 1000, 1000);


  }

}
//mouse clicked function triggering the start of the game aswell as resetting the components
function mouseClicked() {

  start = true;
  loop();

  leftPaddlepoints = 0;
  rightPaddlepoints = 0;
  rightPaddle.x = width - 10;
  leftPaddle.x = 0;
  rightPaddle.y = height / 2;
  leftPaddle.y = height / 2;
  leftPaddle.h = 60;
  rightPaddle.h = 60;

}

//game over function based on paddle points
function gameOver() {
  if (rightPaddlepoints > 1 || leftPaddlepoints > 1) {

    noLoop();
    background(0, 255, 20);
    fill(0);
    text("GAMEOVER MY FRIEND", 70, 50);
    fill (0,0,255);
    text("Score" + rightPaddlepoints, 70, 150);
    fill (0,0,255);
    text("Score" + leftPaddlepoints, 400, 150);
    fill (255,0,0);
    text ("CLICK TO RESTART", 100, 300);
  }
  //game over based on paddle height
  else if (rightPaddle.h < 40 || leftPaddle.h < 40) {

    noLoop();
    background(0, 255, 20);
    textAlign (CENTER, CENTER);
    fill (0);
    text("GAME OVER MY FRIEND", 70, 50);
    fill (0,0,255);
    text("Score" + rightPaddlepoints, 70, 150);
    fill (0,0,255);
    text("Score" + leftPaddlepoints, 400, 150);
    fill (255,0,0);
    text ("CLICK TO RESTART", 100, 300);

  }
}
