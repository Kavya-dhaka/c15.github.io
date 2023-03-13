var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacles;
var obstacles1, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6;
var cloudImage;
var gameOver,gameOverImage,restart,restartImage;

var score;
var obstaclesgroup, cloudsgroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  obstacles1 = loadImage("obstacle1.png");
  obstacles2 = loadImage("obstacle2.png");
  obstacles3 = loadImage("obstacle3.png");

  obstacles4 = loadImage("obstacle4.png");
  obstacles5 = loadImage("obstacle5.png");
  obstacles6 = loadImage("obstacle6.png");

  cloudImage = loadImage("cloud.png");

  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");

}

function setup() {

  createCanvas(600, 200)

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,60);

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  //creating invisible ground
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  //generate random numbers
  var rand = Math.round(random(1, 100))
  console.log(rand)

  //creating groups
  cloudsgroup = new Group();
  obstaclesgroup = new Group();

  score = 0;

  //game over amd restart sprite
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2;

  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale = 0.5;

}

function draw() {
  //set background color
  background(180);
  
  //displaying score
  text ("Score: "+score,500,50);

  console.log(trex.y);
  if (gameState === PLAY) {
    // jump when the space key is pressed
    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
    }

    //updating score
    score = Math.round(frameCount / 4);
    
    gameOver.visible = false;
    restart.visible = false;


    trex.velocityY = trex.velocityY + 0.8;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //Spawn Clouds
    spawnClouds();

    //Spawn Obstacles
    spawnObstacles();

    //changing game state to end
    if (obstaclesgroup.isTouching(trex)) {
      gameState = END;
    }

  }
  else if (gameState === END) {
    ground.velocityX = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);

    gameOver.visible = true;
    restart.visible = true;
  }

  //stop trex from falling down
  trex.collide(invisibleGround);

  drawSprites();
}

//function to spawn the clouds
function spawnClouds() {
  // write your code here 
  if (frameCount % 100 == 0) {
    clouds = createSprite(600, 70, 10, 20);
    clouds.velocityX = -4;
    clouds.addImage("cloud", cloudImage);
    clouds.y = Math.round(random(50, 100));
    clouds.scale = 0.7;
    clouds.lifetime = 150;
    cloudsgroup.add(clouds);
  }
}

function spawnObstacles() {
  if (frameCount % 150 == 0) {
    obstacles = createSprite(600, 163, 10, 20);
    obstacles.velocityX = -4;
    var number = Math.round(random(1, 6));
    switch (number) {
      case 1: obstacles.addImage(obstacles1);
        break;
      case 2: obstacles.addImage(obstacles2);
        break;
      case 3: obstacles.addImage(obstacles3);
        break;
      case 4: obstacles.addImage(obstacles4);
        break;
      case 5: obstacles.addImage(obstacles5);
        break;
      case 6: obstacles.addImage(obstacles6);
        break;
      default: break;
    }
    obstacles.scale = 0.5;
    obstacles.lifetime = 150;
    obstaclesgroup.add(obstacles);
  }
}

