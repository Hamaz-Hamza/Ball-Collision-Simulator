let balls = [];
let diagLenSquared;

function setup() {
  frameRate(100);
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) balls[i] = new Ball();
  diagLenSquared = (windowWidth*windowWidth) + (windowHeight*windowHeight);
}

function draw() {
  background(0,0.4);
  for (let i = 0; i < balls.length; i++){
      balls[i].update();
      balls[i].draw();
  }
}
