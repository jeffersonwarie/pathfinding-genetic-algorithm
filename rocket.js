class Rocket {
    constructor(pos, dna, totalRockets) {
      // Initialization of physics properties
      this.acceleration = createVector();
      this.velocity = createVector();
      this.position = pos.copy();
      this.r = 4;
      this.dna = dna;
      this.finishTime = 0; // Counting how long it takes to reach target
      this.recordDist = 10000; // A random high number that will be beat instantly
  
      this.fitness = 0;
      this.geneCounter = 0;
      this.hitObstacle = false; // Whether this rocket is stuck on an obstacle
      this.hitTarget = false; // Whether this Rocket reached the target or not
    }
  
    // FITNESS FUNCTION
    // distance = distance from target
    // finish = what order did the rocket finish (first, second, etc. . .)
    // f(distance,finish) =   (1.0f / finish^1.5) * (1.0f / distance^6);
    // a lower finish is rewarded (exponentially) and/or shorter distance to target (exponentially)
    calcFitness() {
      if (this.recordDist < 1) this.recordDist = 1;
  
      // Reward finishing faster and getting close
      this.fitness = (1 / (this.finishTime * this.recordDist));
  
      // Make the function exponential
      this.fitness = pow(this.fitness, 4);
  
      if (this.hitObstacle) this.fitness *= 0.1; // lose 90% of fitness hitting an obstacle
      if (this.hitTarget) this.fitness *= 2; // twice the fitness for finishing
    }
  
    // Run in relation to all the obstacles
    // If the Rocket is stuck, do not update or check for intersection
    run(os) {
      if (!this.hitObstacle && !this.hitTarget) {
        this.applyForce(this.dna.genes[this.geneCounter]);
        this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
        this.update();
        // If the Rocket hits an edge or an obstacle
        this.obstacles(os);
      }
      // Draw me!
      if (!this.hitObstacle) {
        this.display();
      }
    }
  
    // Checks if the Rocket made it to the target
    checkTarget() {
      let d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
      if (d < this.recordDist) this.recordDist = d;
  
      if (target.contains(this.position) && !this.hitTarget) {
        this.hitTarget = true;
      } else if (!this.hitTarget) {
        this.finishTime++;
      }
    }
  
    // Checks if the Rocket hit an obstacle
    obstacles(os) {
      for (let i = 0; i < os.length; i++) {
        let obs = os[i];
        if (obs.contains(this.position)) {
          this.hitObstacle = true;
        }
      }
    }
  
    applyForce(f) {
      this.acceleration.add(f);
    }
  
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    display() {
      //background(255,0,0);
      let theta = this.velocity.heading() + PI / 2;
      //fill(200, 100);
      //let redvarcolor=Math.floor(Math.random() * 256);
      //let greenvarcolor=Math.floor(Math.random() * 256);
      //let bluevarcolor=Math.floor(Math.random() * 256);
      fill(255,255,0);
      stroke(255,255,0);
      strokeWeight(1);
      push();
      translate(this.position.x, this.position.y);
      rotate(theta);
  
      // Rocket body
      fill(255,255,0);
      beginShape(TRIANGLES);
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      endShape();
  
      pop();
    }
  
    getFitness() {
      return this.fitness;
    }
  
    getDNA() {
      return this.dna;
    }
  
    stopped() {
      return this.hitObstacle;
    }
}