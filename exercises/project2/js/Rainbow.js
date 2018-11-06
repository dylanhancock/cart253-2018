// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Rainbow constructor
//
// Sets the properties with the provided arguments
function Rainbow(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.


Rainbow.prototype.update = function() {

  // Update position with velocity
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y, 0, height - 100);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + 100 === height) {
    this.vy = -this.vy;
  }
}

Rainbow.prototype.handleCollision = function(ball) {
  // Check if the ball overlaps the Rainbow on x axis
  if (this.x + this.size > ball.x && this.x < ball.x + ball.size) {
    // Check if the ball overlaps the Rainbow on y axis
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

Rainbow.prototype.display = function() {



  image(rainbow, this.x, this.y, 100, 100);
  tint(255, 127);

}
