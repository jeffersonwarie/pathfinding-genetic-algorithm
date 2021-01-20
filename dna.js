// DNA is an array of vectors

class DNA {
    constructor(newgenes) {
      // The maximum strength of the forces
      this.maxforce = 0.1;
  
      // The genetic sequence
      if (newgenes) {
        this.genes = newgenes;
      } else {
        this.genes = [];
        // Constructor (makes a DNA of random PVectors)
        for (let i = 0; i < lifetime; i++) {
          let angle = random(TWO_PI);
          this.genes[i] = createVector(cos(angle), sin(angle));
          this.genes[i].mult(random(0, this.maxforce));
        }
      }
  
      // Give each Rocket an extra boost of strength for its first frame
      this.genes[0].normalize();
    }
  
    // CROSSOVER
    // Creates new DNA sequence from two (this & and a partner)
    crossover(partner) {
      let child = new Array(this.genes.length);
      // Pick a midpoint
      let crossover = int(random(this.genes.length));
      // Take part from one and part from the other
      for (let i = 0; i < this.genes.length; i++) {
        if (i > crossover) child[i] = this.genes[i];
        else child[i] = partner.genes[i];
      }
      let newgenes = new DNA(child);
      return newgenes;
    }
  
    // Based on a mutation probability, picks a new random Vector
    mutate(m) {
      for (let i = 0; i < this.genes.length; i++) {
        if (random(1) < m) {
          let angle = random(TWO_PI);
          this.genes[i] = createVector(cos(angle), sin(angle));
          this.genes[i].mult(random(0, this.maxforce));
          if (i == 0) this.genes[i].normalize();
        }
      }
    }
}