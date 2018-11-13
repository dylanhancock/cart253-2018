// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Evilball(x, y, vx, vy, size, speed, color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.color = color;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.

Evilball.prototype.update = function() {

  this.x = width / 10 * noise(tx);
  this.y = height * noise(ty);
  tx += 0.01;
  ty += 0.01;
}

Evilball.prototype.update2 = function() {

  this.x = width - width / 10 * noise(tx);
  this.y = height * noise(ty);
  tx += 0.01;
  ty += 0.01;
}

//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Evilball.prototype.isOffScreen = function() {
  var ballLeft = this.x - this.size / 2;
  var ballRight = this.x + this.size / 2;


  if (ballRight < 0) {
    // If it went off either side, reset it to the centre
    this.x = width / 2;
    this.y = height / 2;
    leftPaddlepoints += 1;
    ball.reset();
  } else if (ballLeft > width) {
    this.x = width / 2;
    this.y = height / 2;
    rightPaddlepoints += 1;
  }
}

Evilball.prototype.display = function() {
  fill(this.color);
  ellipse(this.x, this.y, this.size, this.size);
}


Evilball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      rightPaddle.h -= 1;
      leftPaddle.h += 1;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
  }
}

Evilball.prototype.handleCollision2 = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w + 4) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      leftPaddle.h -= 1;
      rightPaddle.h += 1;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
  }
}
