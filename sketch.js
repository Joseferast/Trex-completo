  var trex,trexRunning;
  var groundImg;
  var clound,cloundImg;
  var cactus,cactusImg1,cactusImg2,cactusImg3,cactusImg4,cactusImg5,cactusImg6;
  var score = 0;
  var play = 1;
  var end = 0;
  var gamestate = play;
  var cactusGp,cloundGp;
  var trexmorto;
  var gameover,gameoverImg;
  var restart,restartImg;
  var jumpsound;
  var pointsound;
  var deathsound;
  var record = 0;

//preload carrega as midías do jogo 
function preload(){
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg = loadImage("ground2.png");
  cloundImg = loadImage("cloud.png");
  cactusImg1 = loadImage("obstacle1.png");
  cactusImg2 = loadImage("obstacle2.png");
  cactusImg3 = loadImage("obstacle3.png");
  cactusImg4 = loadImage("obstacle4.png");
  cactusImg5 = loadImage("obstacle5.png");
  cactusImg6 = loadImage("obstacle6.png");
  trexmorto = loadAnimation("trex_collided.png");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jumpsound = loadSound("jump.mp3");
  pointsound = loadSound("checkpoint.mp3");
  deathsound = loadSound("die.mp3");
}
//setup faz a aconfiguração
function setup(){
  //createCanvas(600,200); (Atualizado)
  createCanvas(windowWidth,windowHeight);
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("Running",trexRunning);
  trex.addAnimation("morto",trexmorto);
  trex.scale = 0.5;
  trex.debug = false;
  trex.setCollider("rectangle",0,0,40,60);
  // trex.setCollider("circle",0,0,30);
  gameover = createSprite(width/2,height-120);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;
  gameover.visible = false;

  restart = createSprite(width/2,height-80);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  ground = createSprite(width/2,height-40,width,2);
  ground.addImage("ground",groundImg);

  invisibleground = createSprite(width/2,height-20,width,2);
  invisibleground.visible = false;

cactusGp = new Group();
cloundGp = new Group();

var mensagem = "teste";
console.log(mensagem);


}
//draw faz o movimento, a ação do jogo
function draw(){
  background("#f0f9f7");

  text("Score: " + score,width-74,height-180);
  text("Record: " + record,width-74,height-165);
  
if (gamestate === play) {
  ground.velocityX = -(4+3*score/100);
  if (ground.x < 0) {
    ground.x = ground.width/2;
  }
  score += Math.round(getFrameRate()/60);
  if (score > 0 && score%300 === 0) {
pointsound.play();
  }
  if (touches.length > 0 || keyDown("space")&&trex.y >= height-50) {
    trex.velocityY = -11;
    jumpsound.play();
    touches = [];
       } 
  createclounds();
  createcactus();
  if (trex.isTouching(cactusGp)) {
gamestate = end;
deathsound.play();
  }
  
}

if (gamestate === end) {
  trex.changeAnimation("morto",trexmorto);
  cactusGp.setVelocityXEach(0);
  cloundGp.setVelocityXEach(0);
  cloundGp.setLifetimeEach(-1); 
  cactusGp.setLifetimeEach(-1);
  ground.velocityX = 0;
  gameover.visible = true;
  restart.visible = true;

  if (record < score) {
    record = score;
  }
  
    if (mousePressedOver(restart)) {
      gamestate = play;
  gameover.visible = false;
  restart.visible = false;
  trex.changeAnimation("Running",trexRunning);
  cactusGp.destroyEach();
  cloundGp.destroyEach();
  score = 0;
    }
}
 
  trex.velocityY += 0.5;
  
  trex.collide(invisibleground);
 
   //coordenadas do mouse na tela
   // text("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY);
  
  drawSprites();

}

function createclounds() {
  if (frameCount%80===0) {
    clound = createSprite(600,random(height-190,height-100),40,10);
    clound.velocityX = -(4+score/100);
    clound.addImage(cloundImg);
    clound.scale = random(0.4,1.5);
    clound.depth = trex.depth;
    trex.depth = trex.depth+1;
    clound.lifetime = 250;
    cloundGp.add(clound);
  }
}

function createcactus() {
if (frameCount % 60 == 0) {
  cactus = createSprite(width,height-30,40,10);
  cactus.velocityX = -(6+score/100);
  cactus.scale = 0.5;
  cactus.lifetime = 250;
  cactus.depth = trex.depth+1;
  cactusGp.add(cactus);
 var luck = Math.round(random(1,6));
 switch (luck) {
   case 1: cactus.addImage(cactusImg1);
     break;
     case 2: cactus.addImage(cactusImg2);
     break;
      case 3: cactus.addImage(cactusImg3);
     break;
      case 4: cactus.addImage(cactusImg4);
     break;
     case 5: cactus.addImage(cactusImg5);
     break;
      case 6: cactus.addImage(cactusImg6);
     break;
 }
}
}
