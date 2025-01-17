// Boid class

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(params.maxSpeed * 0.2, params.maxSpeed * 0.5));
    this.acc = createVector(0, 0);
  }

  flock(others) {
    let separation = createVector();
    let alignment = createVector();
    let cohesion = createVector();

    let total = 0;

    // check separation, alignment or cohesion
    for (const other of others) {
      if (other === this) continue;

      let dist = this.pos.dist(other.pos);
      // let distSqueared = p5.Vector.sub(this.pos, other.pos).magSq();

      if (dist <= params.perceptionRadius) {
        // separation
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.mult(1 / dist ** 2);
        separation.add(diff);

        // Alignment
        alignment.add(other.vel);

        // Cohesion
        cohesion.add(other.pos);

        total++;
      }
    }

    // calculate streer force

    if (total > 0) {
      // Separation
      separation.div(total);
      separation.setMag(params.maxSpeed);
      separation.sub(this.vel);
      separation.limit(params.maxForce);
      separation.mult(params.separationWeight);

      // Alignment
      alignment.div(total);
      alignment.setMag(params.maxSpeed);
      alignment.sub(this.vel);
      alignment.limit(params.maxForce);
      alignment.mult(params.alignmentWeight);

      // Cohesion
      cohesion.div(total);
      cohesion.sub(this.pos);
      cohesion.setMag(params.maxSpeed);
      cohesion.sub(this.vel);
      cohesion.limit(params.maxForce);
      cohesion.mult(params.cohesionWeight);

      // add forces
      this.acc.add(separation);
      this.acc.add(alignment);
      this.acc.add(cohesion);
    }
  }

  avoid(target) {
    let diff = p5.Vector.sub(this.pos, target);
    let dist = diff.mag();
    if (dist < 200) {
      diff.setMag(params.maxSpeed);
      diff.sub(this.vel);
      diff.limit(params.maxForceMouse * params.mouseWeight);
      this.acc.add(diff);
    }
  }

  update(dt) {
    this.vel.add(this.acc);
    this.vel.limit(params.maxSpeed);
    this.acc.mult(0);
    this.pos.add(p5.Vector.mult(this.vel, dt));
  }

  edge() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  draw() {
    push();

    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());

    triangle(
      -params.boidsRadius,
      -params.boidsRadius * 0.6,

      params.boidsRadius,
      0,

      -params.boidsRadius,
      params.boidsRadius * 0.6
    );

    pop();
  }
}
