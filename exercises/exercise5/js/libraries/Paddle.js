function Paddle(x,y,w,h,vx,vy,upKeyCode,downKeyCode,speed) {
  //properties
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.upKeyCode = upKeyCode;
  this.downKeyCode = downKeyCode;
  this.vx = vx;
  this.vy = vy;
  this.speed = speed;


}

//update position
//updatePosition(ball);
Paddle.prototype.updatePosition = function() {
  this.x += this.vx;
  this.y += this.vy;
}

Paddle.prototype.handleBallPaddleCollision = function () {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size / 2;
  var ballBottom = ball.y + ball.size / 2;
  var ballLeft = ball.x - ball.size / 2;
  var ballRight = ball.x + ball.size / 2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = this.y - this.h / 2;
  var paddleBottom = this.y + this.h / 2;
  var paddleLeft = this.x - this.w / 2;
  var paddleRight = this.x + this.w / 2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

Paddle.prototype.handleInput = function (){

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(this.upKeyCode)) {
    // Move up
    this.vy = -this.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(this.downKeyCode)) {
    // Move down
    this.vy = this.speed;
  } else {
    // Otherwise stop moving
    this.vy = 0;
  }

}
