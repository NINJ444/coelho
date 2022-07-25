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
var solo;
var corda,corda2,corda3;
var uniao,uniao2,uniao3;

var fundo;
var fruta,frutaimg;
var coelho,coelhoimg;
var cortar,cortar2,cortar3,botao,balao;

var coelhoPiscando, coelhoComendo, coelhoTriste;

var somTriste,somdefundo,somComendo,somAr,somCortando;

var canW, canH;

function preload()
{
  fundo = loadImage('background.png');
  frutaimg = loadImage('melon.png');
  coelhoimg = loadImage('Rabbit-01.png');
  coelhoPiscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  coelhoComendo = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  coelhoTriste = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  
  somTriste = loadSound("sad.wav");
  somdefundo = loadSound("sound1.mp3");
  somComendo = loadSound("eating_sound.mp3");
  somAr = loadSound("air.wav");
  somCortando = loadSound("rope_cut.mp3");

  coelhoPiscando.playing = true;
  coelhoPiscando.looping = true;

  coelhoComendo.playing = true;
  coelhoComendo.looping = false;

  coelhoTriste.playing = true;
  coelhoTriste.looping = false;
}

function setup() 
{
  //createCanvas(500,700);

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW,canH);
  } 
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW,canH);
  }

  somdefundo.play();
  somdefundo.setVolume(0.5);
  
  frameRate(80); //taxa de frames
  
  engine = Engine.create();
  world = engine.world;
  
  solo = new Ground(200,canH-20,600,20);

  corda = new Rope(5,{x:245,y:30});
  corda2 = new Rope(5,{x:145,y:60});
  corda3 = new Rope(6,{x:55,y:90});
  fruta = Bodies.circle(300,300,20);
  Matter.Composite.add(corda.body,fruta);

  uniao = new Link(corda,fruta);
  uniao2 = new Link(corda2,fruta);
  uniao3 = new Link(corda3,fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  coelhoPiscando.frameDelay = 20;
  coelhoComendo.frameDelay = 10;
  coelhoTriste.frameDelay = 30;

  coelho=createSprite(200,canH-100);
  coelho.addImage(coelhoimg);
  coelho.scale=0.3;

  coelho.addAnimation('piscando', coelhoPiscando);
  coelho.changeAnimation('piscando');

  coelho.addAnimation('comendo', coelhoComendo);
  //coelho.changeAnimation('comendo');

  coelho.addAnimation('Triste', coelhoTriste);
  //coelho.changeAnimation('Triste');


  cortar=createImg("cut_btn.png")
  cortar.position(250,20)
  cortar.size(50,50)
  cortar.mouseClicked(cair)

  cortar2=createImg("cut_btn.png")
  cortar2.position(150,50)
  cortar2.size(50,50)
  cortar2.mouseClicked(cair2)

  cortar3=createImg("cut_btn.png")
  cortar3.position(60,80)
  cortar3.size(50,50)
  cortar3.mouseClicked(cair3)
  
  botao=createImg("mute.png")
  botao.position(20,20)
  botao.size(50,50)
  botao.mouseClicked(mudo)

  balao=createImg("balloon.png")
  balao.position(20,300)
  balao.size(70,70)
  balao.mouseClicked(soprar)

  }

  function draw(){
    image(fundo,width/2,height/2,canW,canH);

  if(fruta!=null){
    image(frutaimg,fruta.position.x,fruta.position.y,70,70);  
  }
  
  corda.show();
  corda2.show();
  corda3.show();
  Engine.update(engine);
  //solo.show();
  
  if(colisao(fruta,coelho)==true){
    coelho.changeAnimation('comendo');
    somComendo.play()
  }
   
  if(colisao(fruta,solo.body)==true){
    coelho.changeAnimation('Triste');
    somTriste.play() 
  }

  drawSprites();
}
function cair()
{
  corda.break();
  uniao.detach();
  uniao=null;
  somCortando.play()

}
function cair2()
{
  corda2.break();
  uniao2.detach();
  uniao2=null;
  somCortando.play()

}
function cair3()
{
  corda3.break();
  uniao3.detach();
  uniao3=null;
  somCortando.play()

}

function colisao(Body1,Body2)
{
  if(Body1!=null){
   var D=dist(Body1.position.x,Body1.position.y,Body2.position.x,Body2.position.y) ;
   if(D<=80){
     World.remove(world,fruta)
     fruta=null
     return true
   }
   else{
     return false
   }
  }

}
function mudo(){
  if(somdefundo.isPlaying()){
    somdefundo.stop()
  }
  else{
    somdefundo.play()
  }
}
function soprar(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0});
  somAr.play()
}