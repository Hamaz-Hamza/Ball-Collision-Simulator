class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  
  add(v){
    this.x += v.x; 
    this.y += v.y;
    return this;
  }
  
  multiply(c){
    this.x *= c; 
    this.y *= c;
    return this;
  }
  
  getMagnitude() { return sqrt((this.x*this.x) + (this.y*this.y)); }
  
  normalize(){
    let mag = this.getMagnitude();
    this.x = this.x/mag;
    this.y = this.y/mag;
    return this;
  }
  
  copy() { return new Vector(this.x,this.y); }
  
  log(string) { print(string + " <" + this.x + ", " + this.y + ">"); }
  
  static getDirection(from, to) { return new Vector(to.x - from.x, to.y - from.y); }
  
  static getProjection(of, on){
    let baseDir = on.normalize();
    return of.x*baseDir.x + of.y*baseDir.y;
  }
  
  static getDistanceSquared(v1,v2){
    let xDist = v2.x-v1.x;
    let yDist = v2.y-v1.y;
    return (xDist*xDist)+(yDist*yDist);
  }
  
  static getDistance(v1,v2) { return sqrt(Vector.getDistanceSquared(v1,v2)); }
}
