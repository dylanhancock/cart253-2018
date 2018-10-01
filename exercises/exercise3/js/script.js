/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;
var Colour1 = (0,0,0)
var Colour2 = (255,255,255)

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
//decoy changed to 500
var numDecoys = 500;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
//added the daschund jpeg aswell as a secod target image
function preload() {
  targetImage = loadImage("assets/images/animals-target1.png");
  targetImage1 = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
  wienerdog = loadImage("assets/images/wienerdog.jpg");

}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
//made background which changes at random each reload
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(random(255), random(255), random(255));


  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y, 50, 50);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y, 50,50);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,50,50);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,50,50);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,50,50);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,50,50);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,50,50);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,50,50);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,50,50);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,50,50);
    }


  }


  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY, 50,50);

  while (targetX < 200, targetY < 100) {
  targetX > 200;
  targetY > 100;
}

}

function draw() {

//added pink rectangle
  fill('#fae');
  noStroke();
  rect(0,0,200,100);
//put image over rectangle
  imageMode(CORNERS);
  image(wienerdog,0,0,200,100);


//added text ---- FIND ME
  textFont("Helvetica");
  textSize(24);
  noStroke();
  fill(255);
  text("FIND ME!",50,90);
//add wiener dog
  image(targetImage1,100,50,100,100);

  if (gameOver) {
    // Prepare our typography
//make background random colours
    background(random(255), random(255), random(255));

    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255),random(255),random(255));
    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);
//ellipse and doggie getting bigger
    noFill();
    stroke(random(255),random(255),random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width +=1,targetImage.height+=1);

//dog in random places
    var DogX = targetX + (random(-windowWidth,windowWidth));
    var DogY = targetY + (random(-windowHeight,windowHeight));




//display dog
    image(targetImage,DogX,DogY);




  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }

  }

}
