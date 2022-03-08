const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImage;
var cannon, angle, ground;
var ball;
var myCannonBalls = []
var boat
var myboats=[]
var isgameOver = false

// to store boat animations
var boatAnimation = []
var brokenAnimation = []
// boatSpriteData is used to store boat.json
// boatSpriteSheet is used to store boat.png
var boatSpriteData, boatSpriteSheet
var brokenSpriteData, brokenSpriteSheet

var shootsound;


function preload(){
  backgroundImage = loadImage("./assets/background.gif");
  boatSpriteData = loadJSON("./assets/boat/boat.json");
  boatSpriteSheet = loadImage("./assets/boat/boat.png")

  brokenSpriteData = loadJSON("./assets/boat/broken_boat.json")
  brokenSpriteSheet = loadImage("./assets/boat/broken_boat.png")
  // console.log(boatSpriteData)

  shootsound = loadSound("./assets/cannon_explosion.mp3");
}

function setup() {
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  // Create tower
  tower = new Tower(150,350,150,300)

  angle = -PI/4
  // Create Cannon
  cannon = new Cannon(180,110,250,100, angle);

  // create Ground
  ground = new Ground(0,height,width*2,1)

  // using for loop will loop on the length of boatframes
  var boatframes = boatSpriteData.frames
  // console.log(boatframes);

  for(var i =0; i<boatframes.length; i++){
    var pos = boatframes[i].position
    var image=boatSpriteSheet.get(pos.x,pos.y,pos.w, pos.h);
    boatAnimation.push(image)
    // console.log(boatAnimation)
    // console.log(pos)
    
  }

  // creating single boat
  // boat = new Boat(width,height-100,200,200,-100, boatAnimation)

  var brokenframes = brokenSpriteData.frames
  // console.log(boatframes);

  for(var i =0; i<brokenframes.length; i++){
    var pos = brokenframes[i].position
    var image=brokenSpriteSheet.get(pos.x,pos.y,pos.w, pos.h);
    brokenAnimation.push(image)
  }
}

function draw(){

  background(51);
  Engine.update(engine);

  // Displaying background image
  image(backgroundImage, 0,0, width,height);

  tower.show();
  cannon.display();
  ground.show()

  // Calling displayBalls using for loop, balls are inside myCannon array
  for(var i =0; i<myCannonBalls.length; i++){
    displayBalls(myCannonBalls[i],i)
    for(var j =0; j<myboats.length; j++){
      if(myCannonBalls[i] !== undefined && myboats[j] !== undefined){
        //using SAT theorem(sperate axis theorem)
        // if you can draw a line to sperate two bodies, they have not collided
        // if you cannot draw a line between the two objects, they have collided
        // Matter.SAT.collides(bodyA, bodyB)
        var collision = Matter.SAT.collides(myCannonBalls[i].body,myboats[j].body);
        if(collision.collided){
          console.log("collided")
          myboats[j].remove(j)
          Matter.World.remove(world, myCannonBalls[i].body);
          myCannonBalls.splice(i,1);
          i--;
        }

      }
    }

  }

  // myboats[i].display();
  // myboats[i].animate();
  
  // Matter.Body.setVelocity(boat.body,{
  //   x:-0.9,
  //   y:0
  //   })
  createBoats();
}

function displayBalls(Ball,index){
  Ball.display()
  if(Ball.body.position.x>width || Ball.body.position.y>=height-50){
    World.remove(world,Ball.body)
    myCannonBalls.splice(index,1)
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    // Create Ball
  ball = new CannonBall(cannon.x,cannon.y, 40)
  myCannonBalls.push(ball)
  }
}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    shootsound.play()
    myCannonBalls[myCannonBalls.length-1].shoot()
  }
}

function createBoats(){
  if(myboats.length>0){
    if(myboats.length < 4 && myboats[myboats.length-1].body.position.x < width-200){

  var postions=[-40,-60,-80,-20]
  var boatpos = Math.random(postions)

  // creating single boat
  boat = new Boat(width,height-100,200,200,boatpos, boatAnimation)
  myboats.push(boat)

    }
  for(var i = 0; i <myboats.length; i++){
    Matter.Body.setVelocity(myboats[i].body,{
      x:-0.9,
      y:0
      })
      myboats[i].display()
      myboats[i].animate();
      var collision = Matter.SAT.collides(tower.body, myboats[i].body)
      if(collision.collided && !myboats[i].isBroken){
         isgameOver = true;
         gameOver();
      }
  }
}
  else{
  // creating single boat
  boat = new Boat(width,height-100,200,200,-100, boatAnimation)
  myboats.push(boat)
  }

}

function gameOver(){
  swal(
  {
    title: "Game Over!!",
    confirmButtonText: "Play Again",
    imageUrl:"./assets/boat.png",
    imageSize:"150x150",
    text: "Thanks for playing!"
  },
  function (isConfirm){
    if (isConfirm){
      location.reload();
    }
  }
  );
}