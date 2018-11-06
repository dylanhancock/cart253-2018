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

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
var ball2;
var ball3;
var start = false;

// setup()
//
// Creates the ball and paddles
var fonty;
var rainbow;
var cool;
var rainbowball;
var balls = [rainbow, cool]
var ballremix = balls[Math.floor(Math.random() * balls.length)]

function preload() {

  fonty = loadFont("assets/fonts/PERSONAL.TTF");
  rainbow = loadImage("assets/images/Ord.png");
  cool = loadImage("assets/images/wheel.png");
}



//var x = document.createElement("BUTTON");

//x.addEventListener("click", startGame());

//var x = document.createElement("BUTTON");

//if(){

//}
/////THE GOOD SETUP
// function setup() {
//   document.body.addEventListener("click", function(){
//       document.getElementById("textStart").style.display = "none";
//       start = true;
//       startGame();
//
//   });
// }
//////END GOOD SETUP
//document.body.addEventListener('click', startGame(), true);

//if(document.body.onmousedown){
//  start = true;
//}



////GOOD START GAME WITH CLICK
// function startGame() {
//   if(start){
//     createCanvas(640,480);
//     // Create a ball
//     ball = new Ball(width/2,height/2,5,5,10,5);
//     // Create the right paddle with UP and DOWN as controls
//     ball2 = new Ball (width/4,height/2,5,5,10,2);
//
//     ball3 = new Ball (width/4, height/2, 5, 5, 10, 2);
//
//     ball4 = new Ball (width/2.25, height/2, 5, 5, 1, 2);
//
//     rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
//     // Create the left paddle with W and S as controls
//     // Keycodes 83 and 87 are W and S respectively
//     leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
//
//     rightPaddlepoints = 0;
//     leftPaddlepoints = 0;
//
//     tx = random(0,1000);
//     ty = random(0,1000);
//
//     textFont (fonty);
//   }
// }

function setup() {

  createCanvas(640, 480);
  // Create a ball
  ball = new Ball(width / 2, height / 2, 5, 5, 10, 5);
  // Create the right paddle with UP and DOWN as controls
  ball2 = new Ball(width / 4, height / 2, 5, 5, 10, 2);

  ball3 = new Ball(width / 4, height / 2, 5, 5, 10, 2);

  rainbowball = new Rainbow(width / 2.25, height / 2, 5, 5, 100, 2);

  rightPaddle = new Paddle(width - 10, height / 2, 10, 60, 10, DOWN_ARROW, UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0, height / 2, 10, 60, 10, 83, 87);

  rightPaddlepoints = 0;
  leftPaddlepoints = 0;

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

  if (start) {
    // if(start){

    var r = 255 * noise(t + 10);
    var g = 255 * noise(t + 15);
    var b = 255 * noise(t + 20);
    t += 0.01;

    background(r, g, b);

    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ball.update();
    ball2.update2();
    ball3.update3();
    rainbowball.update();
    leftPaddle.update();
    rightPaddle.update();

    ball.isOffScreen();
    ball2.isOffScreen();



    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);
    ball2.handleCollision3(leftPaddle);
    ball3.handleCollision2(rightPaddle);

    rainbowball.handleCollision(ball);



    ball.display();
    ball2.display2();
    ball3.display2();
    rainbowball.display();
    leftPaddle.display();
    rightPaddle.display();

    textSize(40);
    text(rightPaddlepoints, 20, 40);
    text(leftPaddlepoints, width - 40, 40);


    scoreMax();
    heightMin();
  
  }

  else {
    background (0, 255, 0);
    text ("whats up world!", width / 2, height / 2);
  }

}







function mouseClicked () {

  start = true;
  loop();

    leftPaddlepoints = 0;
    rightPaddlepoints = 0;
    rightPaddle.x = width-10;
    leftPaddle.x = 0;
    rightPaddle.y = height/2;
    leftPaddle.y = height/2;
    leftPaddle.h = 60;
    rightPaddle.h = 60;

}


function scoreMax () {
      if (rightPaddlepoints > 3 || leftPaddlepoints > 3) {

      noLoop();
      background(0, 255, 20);
      text("game over my friend", 20, 30);
      text("Score" + rightPaddlepoints, 50, 50);
      text("Score" + leftPaddlepoints, 100, 100);
    }

  }

function heightMin () {

    if (rightPaddle.h < 10 || leftPaddle.h < 10) {

    noLoop();
    background(0, 255, 20);
    text("game over my friend", 20, 30);
    text("Score" + rightPaddlepoints, 50, 50);
    text("Score" + leftPaddlepoints, 100, 100);
    start = false;

  }
}
// noLoop ();
// background (0,255,20);
// text ("game over my friend", 20, 30);
// text ("Score" + rightPaddlepoints, 50, 50);
// text ("Score" + leftPaddlepoints, 100,100);
//
//
//
// if (mouseIsPressed) {
//
//
//   ball.reset();
//   leftPaddlepoints = 0;
//   rightPaddlepoints = 0;
//   rightPaddle.x = width-10;
//   leftPaddle.x = 0;
//   rightPaddle.y = height/2;
//   leftPaddle.y = height/2;
//   startGame();
//   draw();
//   start = true;
// }


// clearEverything();
//
//
// document.getElementById("restartGame").style.display = "block";
//
// document.getElementById("restartGame").addEventListener("click", function(){
//     //document.getElementById("textStart").style.display = "none";
//     //alert("111");
//     start = true;
//     startGame();
//     draw();
//
// });
//
// function clearEverything(){
//
//
//   ball.reset();
//   leftPaddlepoints = 0;
//   rightPaddlepoints = 0;
//   rightPaddle.x = width-10;
//   leftPaddle.x = 0;
//   rightPaddle.y = height/2;
//   leftPaddle.y = height/2;
//   startGame();
//   draw();
//   start = true;
//   //clear everything here



// else if {
//
//   text: ("whats up world!", width/2, height/2)
//   background: (0,255,0)
// }


// function mouseClicked () {
//   started === true;
// }
