class Ball {
  constructor(x,y){
    this.radius = floor(random(30,70));
    this.mass = floor(random(2,20));
    this.position = new Vector(random(this.radius,windowWidth-this.radius),random(this.radius,windowHeight-this.radius));
    this.velocity = new Vector(random(-5,5),random(-5,5));
    this.hue = floor(random(360));
    this.fillAlpha = 0;
    this.textHue = 0;
  }
  
  update(){
    this.checkAndResolveCollision();
    this.HandleBounds();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  
  draw(){
    colorMode(HSB);
    if (this.mouseInCanvas()){this.setFills();}
    else{
      this.fillAlpha = 0;
      this.textHue = this.hue;
    }
    this.drawBall();
    //this.drawMass();
  }
  
  drawBall(){
    fill(this.hue,100,this.fillAlpha);
    stroke(this.hue,100,100);
    strokeWeight(this.mass);
    circle(this.position.x, this.position.y, this.radius*2);
  }
  
  drawMass(){
    fill(this.textHue,100,100);
    stroke(this.textHue,100,100);
    strokeWeight(1);
    textSize(25);
    textAlign(CENTER);
    text(this.mass,this.position.x,this.position.y+10);
  }
  
  setFills(){
    let mousePos = new Vector(mouseX,mouseY);
    let mouseDistance = floor(Vector.getDistanceSquared(this.position,mousePos));
    this.fillAlpha = floor(map(mouseDistance,0,diagLenSquared/20,100,0,true));
    this.textHue = floor(map(this.fillAlpha,0,100,this.hue,(this.hue+180)%360));
  }
  
  mouseInCanvas() { return mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight; }
  
  checkAndResolveCollision(){
    for (let i = 0; i < balls.length; i++)  
      for (let j = i + 1; j < balls.length; j++)  
          if (balls[i].colliding(balls[j])) balls[i].resolveCollision(balls[j]);
  }
  
  HandleBounds(){
    if (this.position.x < this.radius){
      this.position.x = this.radius;
      this.velocity.x = -(this.velocity.x);
    } else if (this.position.x > windowWidth-this.radius){
      this.position.x = windowWidth-this.radius
      this.velocity.x = -(this.velocity.x);
    }
    if (this.position.y < this.radius){
      this.position.y = this.radius;
      this.velocity.y = -(this.velocity.y);
    } else if (this.position.y > windowHeight-this.radius){
      this.position.y = windowHeight-this.radius
      this.velocity.y = -(this.velocity.y);
    }
  }
  
  colliding(ball){
    let radiusSquared = (this.radius + ball.radius);
    radiusSquared *= radiusSquared;
    return (Vector.getDistanceSquared(this.position, ball.position) < radiusSquared);
  }
  
  resolveCollision(ball){
    this.resolveStaticCollision(ball);
    this.resolveDynamicCollision(ball);
  }
  
  resolveStaticCollision(ball){
    let distanceToMove = (this.radius + ball.radius) - Vector.getDistance(this.position,ball.position);
    let ball1ToBall2Dir = Vector.getDirection(this.position,ball.position);
    let ball2ToBall1Dir = Vector.getDirection(ball.position,this.position);
    let totalMass = this.mass + ball.mass;
    if (distanceToMove > 0){
      this.position.add(ball2ToBall1Dir.normalize().multiply(distanceToMove*(ball.mass/totalMass)));
      ball.position.add(ball1ToBall2Dir.normalize().multiply(distanceToMove*(this.mass/totalMass)));
    }
  }
  
  resolveDynamicCollision(ball){
    let collisionDir = Vector.getDirection(this.position,ball.position).normalize();
    
    let collisionComponentOf1 = Vector.getProjection(this.velocity,collisionDir);
    let collisionComponentOf2 = Vector.getProjection(ball.velocity,collisionDir);
    
    let newVel1 = ((collisionComponentOf1*(this.mass-ball.mass)) + (2*ball.mass*collisionComponentOf2)) / (this.mass + ball.mass);
    let newVel2 = ((collisionComponentOf2*(ball.mass-this.mass)) + (2*this.mass*collisionComponentOf1)) / (this.mass + ball.mass);
    
    this.velocity.add(collisionDir.copy().multiply(newVel1-collisionComponentOf1));
    ball.velocity.add(collisionDir.copy().multiply(newVel2-collisionComponentOf2));
  }
}
