/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup

function setup() {
createCanvas(500,500);
background (0,255,0);

}

function draw (){
fill (0,0,230);
ellipse (250,250,275,400);

fill (0,30,0);
ellipse (200,200,70,50);

fill (0,30,0);
ellipse (300,200,70,50);

fill(175,2,150)

triangle (240, 375, 250, 200,270, 375);

fill (255,0,0);
ellipse (250,400,150,70);

line(194,66,100,80);
line(218,54,235,8);
line(265,52,279,1);
line(209,58,174,0);
line(294,62,341,2);
line(341,94,393,34);

fill(255);
rect(215,365,10,20);
fill(255);
rect(255,363,10,20);
fill(255);
rect(265,365,10,20);
fill(255);
rect(250,416,10,20);
fill(255);
rect(265,365,10,20);

fill(10,55,2);
ellipse (386,230,30,80);

fill(10,55,2);
ellipse (110,229,30,80);
console.log (mouseX,mouseY);

}

function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(50);
  stroke(255);
  strokeWeight(8);
  noFill();

  // follow the mouse
  push();
  translate(mouseX, mouseY);
  // draw a face!
  ellipse(0, 0, 40, 40);
  ellipse(100, 0, 40, 40);
  arc(50, 50, 100, 50, 0, PI);
  pop();

  // upper left-hand corner
  translate(50, 50);
  // draw a face!
  ellipse(0, 0, 40, 40);
  ellipse(100, 0, 40, 40);
  arc(50, 50, 100, 50, 0, PI);

}

// draw()
//
// Description of draw()
