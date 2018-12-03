/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 100;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 100;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
var enemyVY = 0;

// How many dodges the player has made
var dodges = 0;
var opacity = 0;
var Graff;

var graffArray = [];

var graffImages = [];

var burner;
var points = 0;
var cops;
var bg;
var lou;

var currentImage;
var lambo;
var currentCarimage;
var currentJailimage;

var carImages = [];
var jailImages = [];
var state = "LOAD";
var slug;
var jailbart2;
var jailguy;
var boldfont;
var loadingScreen;
// setup()
//
// Make the canvas, position the avatar and anemy

function preload() {

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

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(height, height - height / 3);

  // No stroke so it looks cleaner
  noStroke();

  points = 0;
  var randomIndex = floor(random(0, graffImages.length));

  currentImage = graffImages[randomIndex];

  var randomIndex2 = floor(random(0, carImages.length));

  currentCarimage = carImages[randomIndex2];

  var randomIndex3 = floor(random(0, jailImages.length));

  currentJailimage = jailImages[randomIndex3];
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {

  switch (state) {

    case "LOAD":
    loading();
    break;

    case "STREETZ":
      thestreets();
      break;

    case "JAILBART":
      gameover();
      break;

    case "JAILBART2":
      gameover2();

      break;

    case "JAILBART3":
      jail();

      break;
  }
}
// A pink background
function loading() {
  background (loadingScreen);

}

function thestreets() {

  background(bg);

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

    opacity++;
    push();
    tint(255, opacity);
    image(currentImage, mouseX, mouseY);
    pop();

    // for (var opacity = 127; opacity < 255; opacity += 10) {
    //   console.log(opacity);
    // }

    // while (opacity < 255) {

    // }

    // mouseIsPressed = true;
    // image(graff,mouseX,mouseY);

    // Create the prey object
    if (opacity === 255) {
      var newGraff = new Graff(mouseX, mouseY, opacity, currentImage);
      graffArray.push(newGraff);
      points += 1;
      console.log("addedgraff");
      var randomIndex = floor(random(0, graffImages.length));

      currentImage = graffImages[randomIndex];
    }
    // Add the prey object to the prey array

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


  if (currentCarimage === cops) {


    swag();
    swag2();

    push();
    textFont(burner);
    fill(255, 0, 0, 200);
    textSize(150);
    text("C O P S", 40, 430, );
    fill(0, 0, 255, 200);
    text("R U N!", 500, 430, );

    pop();

  } else {
    swag3();
    swag4();
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

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  // if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
  //   // Tell the player they lost
  //   console.log("YOU LOSE!");
  //   // Reset the enemy's position
  //
  //   enemyY = random(height, height - height / 3);
  //   enemyX = 0;
  //   enemyVY = 0;
  //   enemyVX = 0;
  //   // Reset the avatar's position
  //   avatarX = width / 2;
  //   avatarY = height / 2;
  //   // Reset the dodge counter
  //   dodges = 0;
  //
  //   var randomIndex2 = floor(random(0,carImages.length));
  //
  //   currentCarimage = carImages[randomIndex2];
  //
  //
  // }

  // if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
  //   // Tell the player they lost
  //   console.log("YOU LOSE!");
  //   // Reset the enemy's position
  //
  //   enemySpeed = 0;
  //   enemyVX = 0;
  //   avatarVX = 0;
  //   text("sorry my friend", 100, 100);
  //   // Reset the avatar's position
  //   // Reset the dodge counter
  //   dodges = 0;
  //
  //
  // }









  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(height, height - height / 3);

    var randomIndex2 = floor(random(0, carImages.length));

    currentCarimage = carImages[randomIndex2];
  }




  // function mousePressed() {
  //
  //   tint(255, 255);
  //   image(graff, mouseX, mouseY);
  // }

  // Display the number of successful dodges in the console

  // The player is black
  fill(255, 255, 255);
  // Draw the player as a circle
  image(bart, avatarX, avatarY);

  // The enemy is red
  fill(255, 0, 0);
  // Draw the enemy as a circle
  // image(currentCarimage,enemyX, enemyY);

  image(currentCarimage, enemyX, enemyY);
  image(kilz, mouseX, mouseY);
}

//
//   for (var i = 0; i < avatarX ; i ++) {
//     image(cops, i, enemyY);
//   }
function swag() {
  if ((dist(enemyX, enemyY, avatarX, avatarY) > enemySize / 2 + avatarSize / 2)) {

    var speedboost = 0.0003;
    enemyVX = 5;
    enemyVX += (avatarX - enemyX) * speedboost;
    enemyVY += (avatarY - enemyY) * speedboost;
    console.log(enemyVX);
  } else {
    enemyVX = 0;
    enemyVY = 0;
    points = 0;
    console.log("arrested");
    state = "JAILBART";

  }
}

function swag2() {
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.

    enemyX = 0;
    enemyY = random(height, height - height / 3);
    avatarX = width - width;
    avatarY = height / 2;
    var randomIndex2 = floor(random(0, carImages.length));
    currentCarimage = carImages[randomIndex2];
  }
}



function swag3() {

  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.

    avatarX = width - width;
    avatarY = height / 2;

  }
}

function swag4() {

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

    var randomIndex2 = floor(random(0, carImages.length));

    currentCarimage = carImages[randomIndex2];


  }
}

function gameover() {

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


  var randomIndex3 = floor(random(0, jailImages.length));
  currentJailimage = jailImages[randomIndex3];
  pop();
  opacity = 0;


  // if (keyIsPressed && key === ' ') {
  //   // ... if it was, change the state to "GAME" so the switch statement in draw()
  //   // will display the game instead
  //   state = "JAILBART2";
  // }
}


function gameover2() {

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
  // if (keyIsPressed && key === ' ') {
  //   // ... if it was, change the state to "GAME" so the switch statement in draw()
  //   // will display the game instead
  //   state = "JAILBART3";
  // }
}

function jail() {

  background(bg2);

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

    opacity++;
    push();
    tint(255, opacity);
    image(currentImage, mouseX, mouseY);
    pop();

    // for (var opacity = 127; opacity < 255; opacity += 10) {
    //   console.log(opacity);
    // }

    // while (opacity < 255) {

    // }

    // mouseIsPressed = true;
    // image(graff,mouseX,mouseY);

    // Create the prey object
    if (opacity === 255) {
      var newGraff = new Graff(mouseX, mouseY, opacity, currentImage);
      graffArray.push(newGraff);
      points += 1;
      console.log("addedgraff");
      var randomIndex = floor(random(0, graffImages.length));

      currentImage = graffImages[randomIndex];
    }
    // Add the prey object to the prey array

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


  if (currentJailimage === guard) {


    swag();
    swag2jail();

    push();
    textFont(burner);
    fill(255, 0, 0, 200);
    textSize(150);
    text("C O P S", 40, 430, );
    fill(0, 0, 255, 200);
    text("R U N!", 500, 430, );

    pop();

  } else {
    swag3();
    swag4jail();
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

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  // if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
  //   // Tell the player they lost
  //   console.log("YOU LOSE!");
  //   // Reset the enemy's position
  //
  //   enemyY = random(height, height - height / 3);
  //   enemyX = 0;
  //   enemyVY = 0;
  //   enemyVX = 0;
  //   // Reset the avatar's position
  //   avatarX = width / 2;
  //   avatarY = height / 2;
  //   // Reset the dodge counter
  //   dodges = 0;
  //
  //   var randomIndex2 = floor(random(0,carImages.length));
  //
  //   currentCarimage = carImages[randomIndex2];
  //
  //
  // }

  // if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
  //   // Tell the player they lost
  //   console.log("YOU LOSE!");
  //   // Reset the enemy's position
  //
  //   enemySpeed = 0;
  //   enemyVX = 0;
  //   avatarVX = 0;
  //   text("sorry my friend", 100, 100);
  //   // Reset the avatar's position
  //   // Reset the dodge counter
  //   dodges = 0;
  //
  //
  // }









  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(height, height - height / 3);

    var randomIndex3 = floor(random(0, jailImages.length));

    currentJailimage = jailImages[randomIndex3];
  }




  // function mousePressed() {
  //
  //   tint(255, 255);
  //   image(graff, mouseX, mouseY);
  // }

  // Display the number of successful dodges in the console

  // The player is black
  fill(255, 255, 255);
  // Draw the player as a circle
  image(bart2, avatarX, avatarY);

  // The enemy is red
  fill(255, 0, 0);
  // Draw the enemy as a circle
  // image(currentCarimage,enemyX, enemyY);

  image(currentJailimage, enemyX, enemyY);
  image(kilz, mouseX, mouseY);
}

//
//   for (var i = 0; i < avatarX ; i ++) {
//     image(cops, i, enemyY);
//   }


function swag2jail() {
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

function swag4jail() {

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
