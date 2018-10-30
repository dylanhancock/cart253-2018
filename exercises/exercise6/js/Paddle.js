// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

///Paddle constructor
///FIXED commented out text
///Sets the properties with the provided arguments or defaults
////FIXED paddle spelling///
function Paddle(x,y,w,h,speed,downKeyCode,upKeyCode) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = 0;
  this.vy = 0;
  this.speed = speed;
  this.downKeyCode = downKeyCode;
  this.upKeyCode = upKeyCode;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
///FIXED SPELLING/////
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKeyCode)) {
    this.vy = -this.speed;
  }
  ///FIXED FUNCTION
  else if (keyIsDown(this.downKeyCode)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }

}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
///FIXED height spelling
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);

}

// display()
//
// Draw the paddle as a rectangle on the scree
////FIXED SPELLING
Paddle.prototype.display = function() {
  ///FIXED RECT
  rect(this.x,this.y,this.w,this.h);
}
