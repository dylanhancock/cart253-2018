function Ball(x, y, vx, vy, speed, size) {
  //properties
  this.x = x;
  this.y = y;
  this.size = size;
  this.vx = vx;
  this.vy = vy;
  this.speed = speed || 5;
  console.log('ball created', this);
}

//update position
//updatePosition(ball);
Ball.prototype.updatePosition = function() {
  this.x += this.vx;
  this.y += this.vy;
}

// Handle collisions
Ball.prototype.handleBallWallCollision = function() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = this.y - this.size / 2;
  var ballBottom = this.y + this.size / 2;
  var ballLeft = this.x - this.size / 2;
  var ballRight = this.x + this.size / 2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    this.vy = -this.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

Ball.prototype.handleBallOffScreen = function() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = this.x - this.size / 2;
  var ballRight = this.x + this.size / 2;

  // Check for ball going off the sides
  /////NEW//////////

  if (ballRight < 0) {
    //canScore = false;
    // If it went off either side, reset it to the centre
    this.x = width / 2;
    this.y = height / 2;
    rightPaddle.h += 10;
    leftPaddlepoints += 1;
    this.vx = random(-1, -10)
    reset();
  } else if (ballLeft > width) {
    this.x = width / 2;
    this.y = height / 2;
    leftPaddle.h += 10
    rightPaddlepoints += 1;
    this.vx = random(1, 10);
    reset();
  }
}
Ball.prototype.handleBallPaddleCollision = function () {

  // Calculate edges of ball for clearer if statements below
  var ballTop = this.y - this.size / 2;
  var ballBottom = this.y + this.size / 2;
  var ballLeft = this.x - this.size / 2;
  var ballRight = this.x + this.size / 2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = Paddle.y - Paddle.h / 2;
  var paddleBottom = Paddle.y + Paddle.h / 2;
  var paddleLeft = Paddle.x - Paddle.w / 2;
  var paddleRight = Paddle.x + Paddle.w / 2;

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
