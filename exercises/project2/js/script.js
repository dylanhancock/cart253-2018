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
function setup() {

  //var x = document.createElement("BUTTON");

  //x.addEventListener("click", startGame());

  //var x = document.createElement("BUTTON");

  //if(){

  //}


  document.body.addEventListener("click", function(){
      document.getElementById("textStart").style.display = "none";
      start = true;
      startGame();

  });

  //document.body.addEventListener('click', startGame(), true);

//if(document.body.onmousedown){
//  start = true;
//}

}


function startGame() {
  if(start){
    createCanvas(640,480);
    // Create a ball
    ball = new Ball(width/2,height/2,5,5,10,5);
    // Create the right paddle with UP and DOWN as controls
    ball2 = new Ball (width/4,height/2,5,5,10,2);

    ball3 = new Ball (width/4, height/2, 5, 5, 10, 2);

    rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
    // Create the left paddle with W and S as controls
    // Keycodes 83 and 87 are W and S respectively
    leftPaddle = new Paddle(0,height/2,10,60,10,83,87);

    rightPaddlepoints = 0;
    leftPaddlepoints = 0;

    tx = random(0,1000);
    ty = random(0,1000);
  }
}



var t = 0;
var gameover = false;
// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.


function draw() {

  if(start){

    var r = 255 * noise(t+10);
      var g = 255 * noise(t+15);
      var b = 255 * noise(t+20);
      t += 0.01;

    background(r,g,b);

    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ball.update();
    ball2.update2();
    ball3.update3();
    leftPaddle.update();
    rightPaddle.update();

    ball.isOffScreen();
    ball2.isOffScreen();

    // if (ball.isOffScreen()) {
    //   ball.reset();
    // }

    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);
    ball2.handleCollision (leftPaddle);
    ball2. handleCollision (rightPaddle);

    ball.display();
    ball2.display2();
    leftPaddle.display();
    rightPaddle.display();

    textSize(30);
    text(rightPaddlepoints, 20, 40);
    text(leftPaddlepoints, width - 30, 40);




    if (rightPaddlepoints > 3 || leftPaddlepoints > 3) {

      noLoop ();
      background (0,255,20);
      text ("game over my friend", 20, 30);
      text ("Score" + rightPaddlepoints, 50, 50);
      text ("Score" + leftPaddlepoints, 100,100);
      start = false;

      document.body.addEventListener("click", function(){
      document.getElementById("textStart").style.display = "none";
      start = true;
      startGame();
      draw();

    });

  };

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

function clearEverything(){


  ball.reset();
  leftPaddlepoints = 0;
  rightPaddlepoints = 0;
  rightPaddle.x = width-10;
  leftPaddle.x = 0;
  rightPaddle.y = height/2;
  leftPaddle.y = height/2;
  startGame();
  draw();
  start = true;
  //clear everything here

}


// function mouseClicked () {
//   started === true;
// }
