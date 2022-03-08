class Cannon {
  constructor(x, y, w, h,angle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.image1 = loadImage("./assets/cannon_base.png");
    this.image2 = loadImage("./assets/CANON.png")
  }

  display() {
      // rectangle rotate restriction
      if(keyCode  === RIGHT_ARROW && this.angle < 0.35){
          this.angle += 0.05
      }
      else if(keyCode === LEFT_ARROW && this.angle > -1.75){
          this.angle -= 0.05
      }
    fill("gray");
    push()
    translate(this.x, this.y);
    rotate(this.angle)
    imageMode(CENTER)
    image(this.image2, -10,20,this.w,this.h)
    // rect(-10, 20, this.w, this.h);
    pop();
    fill("grey");
    arc(this.x-30,this.y+100,140,200,PI,TWO_PI)
  }
}

function greet(){
  console.log("Hello world")
}

setTimeout(greet, 15000);