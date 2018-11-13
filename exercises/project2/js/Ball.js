// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x, y, vx, vy, size, speed, imageArray, defaultimage) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.color = color(255, 255, 255);
  this.imageArray = imageArray;
  this.image = defaultimage;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function() {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y, 0, height - this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

Ball.prototype.update2 = function() {

  this.x = width / 10 * noise(tx);
  this.y = height * noise(ty);
  tx += 0.01;
  ty += 0.01;
}

Ball.prototype.update3 = function() {

  this.x = width - width / 10 * noise(tx);
  this.y = height * noise(ty);
  tx += 0.01;
  ty += 0.01;
}

Ball.prototype.update4 = function() {

  // Update position with velocity
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y, 0, height - 100);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + 100 === height) {
    this.vy = -this.vy;
  }
}


// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function() {
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
    ball.reset();
  }
}
// Ball.prototype.isOffScreen = function () {
// //   // Check for going off screen and reset if so
// //   if (this.x + this.size < 0 || this.x > width) {
// //     return true;
// //   }
// //   else {
// //     return false;
// //   }
// }

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function() {
  // fill(this.color);
  // rect(this.x, this.y, this.size, this.size);
  image(this.image, this.x, this.y);
}


Ball.prototype.change = function() {
  console.log('changed');
  this.image = this.imageArray[floor(random(0, this.imageArray.length))];
}

// Ball.prototype.display2 = function() {
//   fill(0);
//   ellipse(this.x, this.y, this.size, this.size);
// }
//
// Ball.prototype.display3 = function() {
//
//
//
//   image(rainbow, this.x, this.y, 100, 100);
//   tint(255, 127);
//
// }
//
// Ball.prototype.display4 = function() {
//
//
//
//   image(balls, this.x, this.y, 100, 100);
//   tint(255, 127);
//
// }

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
  }
}

Ball.prototype.handleCollision2 = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      paddle.h -= 1;
      leftPaddle.h += 1;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
  }
}

Ball.prototype.handleCollision3 = function(paddle) {
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

Ball.prototype.handleCollision4 = function(ball) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > ball.x && this.x < ball.x + ball.size) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > ball.y && this.y < ball.y + ball.size) {
      // If so, move ball back to previous position (by subtracting current velocity)
      ball.x -= ball.vx;
      ball.y -= ball.vy;
      // Reverse x velocity to bounce
      ball.vx = -ball.vx;
      ball.color = color(random(0, 255), random(0, 255), random(0, 255));


    }
  }
}
// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function() {
  this.x = width / 2;
  this.y = height / 2;
}
