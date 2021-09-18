var bg,bgimg,bgimg2;
var wood,woodimg,woodGroup;
var kelly,kimg,kimg2;
var monster,mimg;
var ghost,gimg,ghostGroup;
var canvas;
var story,simg;
var instruction,iimg;
var space_rules,rulesimg;
var goal,goalimg;
var wish,wishimg;
var gameState = 0;


function preload(){
 bgimg = loadImage("bg.jpg"); 
 kimg = loadAnimation("k1.png","k2.png","k3.png","k4.png","k5.png","k6.png","k7.png","k8.png","k9.png","k10.png","k11.png","k12.png","k13.png","k14.png","k15.png");
simg = loadImage("story4.png");
iimg = loadImage("rules3.png");
rulesimg = loadImage("text1.png");
bgimg2 = loadImage("wall.jpg");
woodimg = loadImage("wood.png");
gimg = loadAnimation("g1.png","g2.png","g3.png","g4.png","g5.png","g6.png","g7.png","g8.png","g9.png","g10.png");
kimg2 = loadImage("k14.png");
goalimg = loadImage("gold cup.png");
wishimg = loadImage("congratulations.png");
}

function setup() {
  canvas = createCanvas(displayWidth,displayHeight);
  story = createSprite(450,300);
  story.addImage(simg);
  story.scale = 0.8;
  story.visible = false;
  space_rules = createSprite(450,700);
  space_rules.addImage(rulesimg);
  space_rules.visible = false;
  instruction = createSprite(450,300);
  instruction.addImage(iimg); 
  instruction.visible = false;
  kelly = createSprite(120,700);
  kelly.addAnimation("walking",kimg);
  kelly.scale = 0.7
  kelly.visible = false;
  kelly.velocityX = 0;
  kelly.velocityY = 0;
  kelly.setCollider("rectangle",0,0,5,5);
  kelly.debug = true;
  goal = createSprite(width-100,height-750)
  goal.addImage(goalimg);
  goal.scale = 0.2;
  goal.visible = false;
  wish = createSprite(width/2-100,height/2);
  wish.addImage(wishimg);
  wish.visible = false;
  woodGroup = new Group;
  ghostGroup = new Group;
}

function draw() {
background(0);
image(bgimg,0,0,width,height);
if(gameState === 0){
  story.visible = true;
  space_rules.visible = true;
}
  if(keyDown("space") && gameState === 0){
    gameState = 1;
    story.visible = false;
  space_rules.visible = false;
    instruction.visible = true;
  }

  if(keyDown("up") && gameState === 1){
    gameState = 2;
    instruction.visible = false;
  }

  if(gameState === 2){
    image(bgimg2,0,0,width,height);
    kelly.visible = true;
    goal.visible = true;
    if(keyDown("up")){
      kelly.y = kelly.y - 20;
    }

    if(keyDown("down")){
      kelly.y = kelly.y + 10;
    }

    if(keyDown("left")){
      kelly.x = kelly.x - 10;
    }

    if(keyDown("right")){
      kelly.x = kelly.x + 10;
    }

    if(ghostGroup.isTouching(kelly)){
      gameState = 3;
    }

    if(kelly.isTouching(goal)&&gameState === 2){
      gameState = 4;
      background("white");
      
    }
    spawnWood();
    spawnGhost();

 
    
  }
   if(gameState === 3){
     goal.visible = false;
    background(0);
    fill("yellow");
    textSize(20);
    text("GAME OVER!! press k to restart", width/2-50 , height/2+100);
    kelly.visible = false;
    ghostGroup.destroyEach();
    woodGroup.destroyEach();
   }

  if(keyDown("K") && gameState === 3){
    reset();
    gameState=2;
  }

  if(gameState === 4){
    background("white");
    kelly.visible = false;
    goal.visible = false;
    ghostGroup.destroyEach();
    woodGroup.destroyEach();
    wish.visible = true;
   }

drawSprites();  
}

function spawnWood(){
  if(frameCount % 120 === 0){
    wood = createSprite(0,0);
    wood.x = Math.round(random(0,width-50));
    wood.y = Math.round(random(0,height-50));
    wood.addImage(woodimg);
    wood.velocityX = 0;
    wood.lifetime = 200;
    wood.setCollider("rectangle",0,0,10,10)
    wood.debug =true;
    if(kelly.isTouching(wood)){
      kelly.x = wood.x+20;
      kelly.y = wood.y;
      kelly.depth = wood.depth;
      kelly.addImage(kimg2);

      kelly.depth = wood.depth+1;
    }
    woodGroup.add(wood);
  }
}
  function spawnGhost(){
  if(frameCount % 100  === 0){
    ghost = createSprite(0,0);
    ghost.x = Math.round(random(0,width-50));
    ghost.y = Math.round(random(0,height-50));
    ghost.addAnimation("running",gimg);
    ghost.scale = 0.3;
    ghost.velocityX = 2;
    ghost.lifetime = 200;
    ghostGroup.add(ghost);
  }
  }

  function reset(){
  goal.visible = true;
  kelly.visible = true;
  kelly.addAnimation("running",kimg);
  kelly.x = 120;
  kelly.y = 700;
  }

  



