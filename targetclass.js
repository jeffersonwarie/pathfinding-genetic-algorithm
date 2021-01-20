// This class is used for target position

class TargetClass {
    constructor(x, y, w, h) {
      this.position = createVector(x, y);
      this.w = w;
      this.h = h;
    }
  
    display() {
      stroke(0,0,255);
      fill(0,0,255);
      strokeWeight(2);
      ellipseMode(CORNER);
      ellipse(this.position.x, this.position.y, this.w, this.h);
    }
  
    contains(spot) {
      if (spot.x > this.position.x && spot.x < this.position.x + this.w && spot.y > this.position.y && spot.y < this.position.y + this.h) {
        return true;
      } else {
        return false;
      }
    }
  
}