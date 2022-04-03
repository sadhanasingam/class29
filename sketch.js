const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var link;
var melonpng, backgroundpng, cutbuttonpng, rabbitpng

function preload() {
  melonpng = loadImage("pngs/melon.png");
  backgroundpng = loadImage("pngs/background.png");
  rabbitpng = loadImage("pngs/Rabbit-01.png");
  blink = loadAnimation("pngs/blink_1.png","pngs/blink_2.png","pngs/blink_3.png");
  eat = loadAnimation("pngs/eat_0.png","pngs/eat_1.png","pngs/eat_2.png","pngs/eat_3.png","pngs/eat_4.png");
  sad = loadAnimation("pngs/sad_1.png","pngs/sad_2.png","pngs/sad_3.png");
   

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
  

}

function setup() 
{
  
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,690,600,20);
  rope = new Rope(6,{x:245,y:30})

  rabbit = createSprite(250,600,100,100)
  blink.frameDelay= 20;
  eat.frameDelay= 20;
  sad.frameDelay= 20;
  rabbit.addAnimation('blinking',blink);
  rabbit.addAnimation('eating',eat);
  rabbit.addAnimation('crying',sad);

  rabbit.changeAnimation('blinking');

  rabbit.scale = 0.2;

  button = createImg("cut.png");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  fruit = Bodies.circle(300,300,15);
  Matter.Composite.add(rope.body, fruit);
  

  link = new Link(rope,fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(backgroundpng, 0, 0, width, height);
  ground.show();
  rope.show();
  push();
  imageMode(CENTER);
  if(fruit != null){
    image(melonpng,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  if (keyDown(LEFT_ARROW)){
    rabbit.x = rabbit.x - 3;
  }

  if (keyDown(RIGHT_ARROW)){
    rabbit.x = rabbit.x + 3;
  }
    
 if(collison(fruit,rabbit)){
    rabbit.changeAnimation("eating");
 }

  if(collison(fruit,ground.body)){
    rabbit.changeAnimation('crying');
  }

  drawSprites();
  Engine.update(engine);
  

 
   
}

function drop() {
  rope.break();
  link.detach();
  link = null;
}


function collison(body,sprite) {
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    
    if (d <= 80){
      
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}