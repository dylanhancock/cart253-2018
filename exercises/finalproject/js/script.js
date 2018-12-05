/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// THE POSITION OF BART AND THE SIZE
var avatarX;
var avatarY;
var avatarSize = 100;

// SPEED AND VELOCITY OF BART
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// POSITION AND SIZE OF THE ENEMIES
var enemyX;
var enemyY;
var enemySize = 100;

// SPEED AND VELOCITY OF THE ENEMIES
var enemySpeed = 5;
var enemyVX = 5;
var enemyVY = 0;

// DODGES AND OPACITY VARIABLES TO DETERMINE PLAYER POINTS
var dodges = 0;
var opacity = 0;
var points = 0;

var Graff;
var graffArray = [];
var graffImages = [];
var cops;
var lou;
var carImages = [];
var currentCarimage;
var lambo;

// JAIL MODE VARIABLES
var jailImages = [];
var currentJailimage;
var jailbart2;
var jailguy;
var jailbart2;
var jailguy;
var currentImage;


// COOL FONTS
var slug;
var boldfont;
var burner;

// DETERMINES WHAT FUNCTION SHOULD RUN DEPENDING ON THE state
// WE BEGIN WITH THE LOADING screen
var state = "LOAD";

//TIME TO PRE-LOAD ALL THESE ELEMENTS
function preload() {
//ALL OF MY IMAGE ELEMENTS
  kilz = loadImage("assets/images/kilz.png");
  graff = loadImage("assets/images/ofsy.png");
  bg = loadImage("assets/images/bg.jpg");
  bg2 = loadImage("assets/images/bg2.jpg");
  cops = loadImage("assets/images/cops3.png");
  bart = loadImage("assets/images/simpzin.png");
  lou = loadImage("assets/images/lou.png");
  lambo = loadImage("assets/images/lambo.png");
  rari = loadImage("assets/images/rari2.png");
  porsche = loadImage("assets/images/porsche.png")
  burner = loadFont('assets/fonts/burner.ttf');
  boldfont = loadFont('assets/fonts/HWYGOTH.ttf');
  slug = loadFont('assets/fonts/Slug-Regular.otf');
  jailbart = loadImage('assets/images/jailbart.jpg');
  bart2 = loadImage('assets/images/jailbart.png');
  jailbart2 = loadImage('assets/images/jailbart2.jpg');
  jailguy = loadImage('assets/images/jailguy.png');
  guard = loadImage('assets/images/copz.png');
  loadingScreen = loadImage('assets/images/loadingscreen.jpg');

  graffImages = [graff, lou];
  carImages = [cops, lambo, rari, porsche];
  jailImages = [jailguy, jailguy, jailguy, jailguy, guard];



}

function setup() {
  // Create our playing area
  createCanvas(852, 480);


  // Put the avatar in the centre
  avatarX = width / 2;
  avatarY = height / 2;

  // Put the enemy to the left at a random y coordinate within the bottom third of the createCanvas
  // make sure the enemy stays on the ground portion of background
  enemyX = 0;
  enemyY = random(height, height - height / 3);

  // No stroke so it looks cleaner
  noStroke();
//SET POINTS TO ZERO AS GAME HAS JUST BEGAN

  points = 0;
  //SET ARRAYS TO DISPLAY CURRENT IMAGE RANDOMLY SELECTED FROM MY ARRAY
  var randomIndex = floor(random(0, graffImages.length));
//SET GRAFF IMAGES
  currentImage = graffImages[randomIndex];

  var randomIndex2 = floor(random(0, carImages.length));
//SET CAR IMAGES
  currentCarimage = carImages[randomIndex2];

  var randomIndex3 = floor(random(0, jailImages.length));
//SET JAIL IMAGES
  currentJailimage = jailImages[randomIndex3];
}

// draw()
//DEPENDING ON WHAT STATE WE ARE IN A FUNCTION WILL BE DRAWN
function draw() {

  switch (state) {
//LOADING SCREEN, JUST THE INSTRUCTIONS
    case "LOAD":
    //USING MY LOADING FUNCTION
    loading();
    break;
//STREETZ REFERS TO THE STREETZ LEVEL
    case "STREETZ":
//THE STREETS FUNCTION OBVIOUSLY
      thestreets();
      break;
//JAILBART BECAUSE WE ARE IN JAIL
    case "JAILBART":
//GAME OVER FUNCTION CONTAINING ALL MY RESETS
      gameover();
      break;
//JAILBART2 BECAUSE WE ARE STILL IN JAIL AND THIS SLIDE IS SIMPLY INFORMATIONAL
    case "JAILBART2":
//A SIMPLE TEXT DISPLAY
      gameover2();

      break;
//THE ACTUAL JAIL LEVEL
    case "JAILBART3":
//THE JAIL LEVEL FUNCTION
      jail();

      break;
  }
}
// loading screen just some simple instructions
function loading() {
  background (loadingScreen);

}
//HERE WE GO! THE FIRST GAME MODE
function thestreets() {
//background of the streets graphic
  background(bg);
//FILL PERCENTAGE BAR BACKGROUND RECT
  fill(0, 0, 255);
  rect(10, 10, 255, 10);
//FILL PERCENTAGE BAR WHERE THE LENGTH IS BASED ON THE OPACITY OF FILL
  fill(0, 255, 0);
//CONSTRAINED TO BE 100% instead of 255 because people dont really use that for percentages
  rect(10, 10, constrain(opacity, 0, 255), 10);
  push();
//PUSHING SO I CAN SWITCH UP THE STYLES
//BRINGING IN A TAG STYLE FONT
  textFont(slug);
  textSize (25);
  text("fill percentage  ", 270 , 22);
  textSize(30);

  text("score", 770, 30);
  pop();
//NEW STANDARD FONT FOR THE NUMBERS FOR LEGIBILITY
  textSize (80);

  text(points, 800, 100);

  textSize(30);
//MAP OPACITY (255) to be at a number between 1 and 100 because thats how percentages work
  text(map(opacity, 0, 255, 0, 100), 450, 25);

//HYPE GRAPHICS WHICH APPEAR AFTER EACH NEW GRAFFITI TO KEEP PLAYER MOTIVATED
  if (points === 1) {

    push();
    textFont(burner);
    fill(0, 255, 0, 100);
    textSize(150);
    text("C R U S H I N G", 40, 430, );
    pop();
  }


      if (points === 2) {

        push();
        textFont(burner);
        fill(0, 255, 0, 100);
        textSize(150);
        text("O       M       G", 40, 430, );
        pop();
      }
       else if (points === 3) {

        push();
        textFont(burner);
        fill(0, 255, 0, 100);
        textSize(150);
        text("  IMPOSSIBLE!", 40, 430, );
        pop();
      }

      else if (points === 4) {

        push();
        textFont(burner);
        fill(0, 255, 0, 100);
        textSize(150);
        text("G  O  A  T", width/2-250, 430, );
        pop();
      }
//GRAFFITI SPRAYING ACTION
  if (mouseIsPressed) {
//increase opacity by 1
    opacity++;
    push();
    tint(255, opacity);
    image(currentImage, mouseX, mouseY);
    pop();

//if opacity is full push the graff onto the wall
    if (opacity === 255) {
      var newGraff = new Graff(mouseX, mouseY, opacity, currentImage);
      graffArray.push(newGraff);
//add a point of course :)
      points += 1;
      console.log("addedgraff");
//floor function to round the random number so a number in the array
      var randomIndex = floor(random(0, graffImages.length));
//randomly selected graffiti from my array
      currentImage = graffImages[randomIndex];
    }
    // Add the prey object to the prey array

  } else {
//graffiti is gone unless you hit 255 opacity
    opacity = 0;
  }

  for (var i = 0; i < graffArray.length; i++) {
//my array display function!!!
    graffArray[i].display();
  }


  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

//this function is saying that if a police officer is on screen trigger this function
  if (currentCarimage === cops) {

//this function makes the cops approach you at an increasing velocity
    policeVelocity();
//this one makes sure the game still works and that you can still run off screen
    evadeCops();
// a little aesthetic element which let you know there are cops
    push();
    textFont(burner);
    fill(255, 0, 0, 200);
    textSize(150);
    text("C O P S", 40, 430, );
    fill(0, 0, 255, 200);
    text("R U N!", 500, 430, );

    pop();
//if there are not cops use the below functions
  } else {
    bartOffscreen();
    standardCollision();
    enemySpeed = 5;
    enemyVX = 5;
    enemyVY = 0;
  }
  // Move bart according to velocity but make sure he doesnt leave the ground
  avatarX = avatarX + avatarVX;
  avatarY = constrain(avatarY, 170, 480) + avatarVY;

  // The enemy always moves at enemySpeed

  // Update the enemy's position based on its velocity but also on the ground
  enemyX = enemyX + enemyVX;
  enemyY = constrain(enemyY, 100, 400) + enemyVY;


  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(height, height - height / 3);
//pick a new car if this happens to continue the game
    var randomIndex2 = floor(random(0, carImages.length));

    currentCarimage = carImages[randomIndex2];
  }

  // Draw the player as bart simpson
  image(bart, avatarX, avatarY);

//draw the enemy as the current image in the array
  image(currentCarimage, enemyX, enemyY);
//threw in a spray paint can as the mouse
  image(kilz, mouseX, mouseY);
}

///BELOW ARE THE FUNCTIONS I HAVE MADE FOR THE CAPTURING/EVASION OF THE POLICE

function policeVelocity() {
//overlap equation applies to streets and jail mode
  if ((dist(enemyX, enemyY, avatarX, avatarY) > enemySize / 2 + avatarSize / 2)) {
//little speed boost so the cops make it to you faster than the other cars
    var speedboost = 0.0003;
    enemyVX = 5;
    enemyVX += (avatarX - enemyX) * speedboost;
    enemyVY += (avatarY - enemyY) * speedboost;
    console.log(enemyVX);
  } else {
    //kill the game if they hit and change the state
    enemyVX = 0;
    enemyVY = 0;
    points = 0;
    console.log("arrested");
    state = "JAILBART";

  }
}

function evadeCops() {
  //applies to streets only because it uses the car array
  //checks to see if bart ran away from the cops by running off screen
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
//if he is off screen take the cop car off screen and replace with another
    enemyX = 0;
    enemyY = random(height, height - height / 3);
    avatarX = width - width;
    avatarY = height / 2;
    var randomIndex2 = floor(random(0, carImages.length));
    //swap the current image
    currentCarimage = carImages[randomIndex2];
  }
}



function bartOffscreen() {
//used for jail and streets
//when there are no cops just reset barts position when he goes off screen
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    avatarX = width - width;
    avatarY = height / 2;

  }
}

function standardCollision() {
//just for streets
//if bart hits an enemy thats not an officer just reset the array and bart
  if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {

    enemyY = random(height, height - height / 3);
    enemyX = 0;
    enemyVY = 0;
    enemyVX = 0;
    // Reset the avatar's position
    avatarX = width / 2;
    avatarY = height / 2;
    // Reset the dodge counter
    dodges = 0;

    var randomIndex2 = floor(random(0, carImages.length));

    currentCarimage = carImages[randomIndex2];


  }
}

function gameover() {
//bart has been caught by officers :(
//new background
//informational text
  background(jailbart);
  enemyX = 0;
  push();
  textFont(boldfont);
  textSize(50);
  text("SORRY MY FRIEND...", 20, 80);
  fill(255,0,0);
  text("YOU GOT CAUGHT...", 20, 120);
  textSize(70);
  fill(0,0,0);
  text("WELCOME",90, 220);
  fill(255,0,0);
  text("TO JAIL",115,300);

  textSize(30);
  fill(0,0,255);
  text("PRESS SPACE TO CONTINUE...", 50, 380);

//a little reset in here too which will  be used in jail(); function
  var randomIndex3 = floor(random(0, jailImages.length));
  currentJailimage = jailImages[randomIndex3];
  pop();
  opacity = 0;

}

function gameover2() {
//second gameover screen
  background(jailbart2);

  textSize(60);
  fill(255,0,0);
  textFont(boldfont);
  text("BUT WAIT!!!!!1111ONE!!!11", 40, 50);
  textSize(60);
  fill(0,0,0);
  text("YOUR FRIEND SMUGGLED PAINT", 40, 110);
  text("INTO THE CELL!", 40, 160);

  textSize(30);
  fill(0,0,255);
  text("PRESS SPACE TO CONTINUE...", 40, 190);

}
//THIS NEXT EQUATION IS A BIG DEAL...the second game
function jail() {
//background image
  background(bg2);
//same text as streets
  fill(0, 0, 255);
  rect(10, 10, 255, 10);
  fill(0, 255, 0);
  rect(10, 10, constrain(opacity, 0, 255), 10);
  push();
  textFont(slug);
  textSize (25);
  text("fill percentage  ", 270 , 22);
  textSize(30);

  text("score", 770, 30);
  pop();

  textSize (80);

  text(points, 800, 100);

  textSize(30);

  text(map(opacity, 0, 255, 0, 100), 450, 25);

//same graphics as streetz
  if (points === 1) {

    push();
    textFont(burner);
    fill(0, 255, 0, 100);
    textSize(150);
    text("C R U S H I N G", 40, 430, );
    pop();
  }


    if (points === 2) {

      push();
      textFont(burner);
      fill(0, 255, 0, 100);
      textSize(150);
      text("O       M       G", 40, 430, );
      pop();
    }
     else if (points === 3) {

      push();
      textFont(burner);
      fill(0, 255, 0, 100);
      textSize(150);
      text("  IMPOSSIBLE!", 40, 430, );
      pop();
    }

    else if (points === 4) {

      push();
      textFont(burner);
      fill(0, 255, 0, 100);
      textSize(150);
      text("G  O  A  T", width/2-250, 430, );
      pop();
    }





  if (mouseIsPressed) {
// mousePressed();
//same fill function as streetz
    opacity++;
    push();
    tint(255, opacity);
    image(currentImage, mouseX, mouseY);
    pop();
//same new graff function as streetz
    if (opacity === 255) {
      var newGraff = new Graff(mouseX, mouseY, opacity, currentImage);
      graffArray.push(newGraff);
      points += 1;
      console.log("addedgraff");
      var randomIndex = floor(random(0, graffImages.length));

      currentImage = graffImages[randomIndex];
    }

  } else {
    opacity = 0;
  }

  for (var i = 0; i < graffArray.length; i++) {
    graffArray[i].display();
  }


  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

// modifications to my police officer if statement
  if (currentJailimage === guard) {


    policeVelocity();
    evadeGuards();

    push();
    textFont(burner);
    fill(255, 0, 0, 200);
    textSize(150);
    text("C O P S", 40, 430, );
    fill(0, 0, 255, 200);
    text("R U N!", 500, 430, );

    pop();

  } else {
    bartOffscreen();
    standardJailcollision();
    enemySpeed = 5;
    enemyVX = 5;
    enemyVY = 0;
  }
  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = constrain(avatarY, 170, 480) + avatarVY;

  // The enemy always moves at enemySpeed

  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;
  enemyY = constrain(enemyY, 100, 400) + enemyVY;

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic

    // Tell them how many dodges they have made

    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(height, height - height / 3);

    var randomIndex3 = floor(random(0, jailImages.length));

    currentJailimage = jailImages[randomIndex3];
  }

  // Draw the player as jail bart
  image(bart2, avatarX, avatarY);

  // draw prisoners and guards instead of cop cars and sports cars
  image(currentJailimage, enemyX, enemyY);
  image(kilz, mouseX, mouseY);
}


function evadeGuards() {
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.

    enemyX = 0;
    enemyY = random(height, height - height / 3);
    avatarX = width - width;
    avatarY = height / 2;
    opacity = 0;

    var randomIndex3 = floor(random(0, jailImages.length));
    currentJailimage = jailImages[randomIndex3];
  }
}

function standardJailcollision() {
//same collision as streets but with the jail array
  if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position

    enemyY = random(height, height - height / 3);
    enemyX = 0;
    enemyVY = 0;
    enemyVX = 0;
    // Reset the avatar's position
    avatarX = width / 2;
    avatarY = height / 2;
    // Reset the dodge counter
    dodges = 0;
    opacity = 0;

    var randomIndex3 = floor(random(0, jailImages.length));

    currentJailimage = jailImages[randomIndex3];


  }
}
//my state switching function!!! revolving around space bar
function keyPressed() {
  if (keyCode === 32) {
    if (state === "LOAD"){
      state = 'STREETZ'
    }
    if (state === 'JAILBART') {
      graffArray = [];
      state = 'JAILBART2'
    } else if (state === 'JAILBART2') {
      graffArray = [];
      state = 'JAILBART3'
    }
  }
}
