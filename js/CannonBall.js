class CannonBall {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    var options = {
      resitution: 0.45,
      frictionAir: 0.01,
      isStatic: true,
      density: 1.0,
    };
    this.body = Bodies.circle(this.x, this.y, this.r, options);
    World.add(world, this.body);

    this.image = loadImage("./assets/cannonball.png");
    this.trajectory = []
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    fill("black");
    translate(pos.x, pos.y);
    rotate(angle);
    // ellipseMode(RADIUS)
    // ellipse(0,0,this.r,this.r)
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    pop();

    if(this.body.velocity.x>0 && this.body.position.x >= 180){
      var position = [this.body.position.x, this.body.position.y]
      this.trajectory.push(position);
      // console.log(this.trajectory)
    }
    var i;
    for(i=0;i<this.trajectory.length;i++){
      image(this.image,this.trajectory[i][0], this.trajectory[i][1],5,5)
    }
  }

  shoot() {
    // Matter.Body.setVeloctiy(body, velocity)
    // Matter.Body.setStatic(body,isStatic)
    //p5.Vector.fromAngle(angle,[length])
    // mult, will increase or speedup the objects
    var velocity = p5.Vector.fromAngle(cannon.angle);
    velocity.mult(25);

    Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
    Matter.Body.setStatic(this.body, false);

    // console.log(pos);

  }
}
