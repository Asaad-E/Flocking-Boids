"use strict";

// Elements

const canvasContainer = document.querySelector(".canvas-container");

// Parameters

const params = {
  numBoids: 200, // Number of boids in the flock
  boidsRadius: 10, // Radius of the boids
  maxSpeed: 300, // Maximum speed of the boids (px/seg)
  maxForce: 12, // Maximum steering force
  maxForceMouse: 13, // Maximum steering force for mouse avoidance
  perceptionRadius: 120, // Radius for boid perception,
  perceptionRadiusSq: 60 ** 2, // Square of the perception radius
  alignmentWeight: 1.2, // Weight for alignment behavior
  cohesionWeight: 1.2, // Weight for cohesion behavior
  separationWeight: 1.2, // Weight for separation behavior
  mouseWeight: 1, // Weight for mouse avoidance/atraction
  canvasWidth: 720, // Width of the canvas
  canvasHeight: 600, // Height of the canvas
};

const debug = {
  showOne: false,
  pause: false,
};

// Variables

let backgroundColor = "#515050";
let boidsColor = "#AA0000";
let boids = [];

let targetFps = 60;
let labelFps = targetFps;

let custom = false;
let optimized = false;

function setup() {
  // Create canvas
  const canvas = createCanvas(params.canvasWidth, params.canvasHeight);
  canvas.parent(canvasContainer);
  frameRate(60);

  // Create boids
  for (let i = 0; i < params.numBoids; i++) {
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(backgroundColor);

  // Draw boids
  fill(boidsColor);
  noStroke();
  boids.forEach((boid) => {
    if (debug.pause === false) {
      boid.flock(boids);
      // avoid mouse
      boid.avoid(createVector(mouseX, mouseY));
      boid.update(deltaTime / 1000);
      boid.edge();
    }

    boid.draw();
  });

  if (debug.showOne && boids[0]) {
    noFill();
    stroke(0);
    circle(boids[0].pos.x, boids[0].pos.y, params.perceptionRadius * 2);
    fill(24, 234, 234);
    noStroke();
    boids[0].draw();
  }

  // if (Math.abs(frameRate() - targetFps) <= 2 && optimized === false) {
  //   boids.push(new Boid(random(width), random(height)));
  // } else if (custom === false) {
  //   optimized = true;
  //   custom = true;

  //   console.log(deltaTime / 1000);
  //   boids.pop();
  //   console.log("Optimized");
  //   console.log(boids.length);

  //   setTimeout(() => {
  //     optimized = false;
  //     custom = false;
  //   }, 5000);
  // }

  // FrameRate
  if (frameCount % 5 === 0) {
    labelFps = Math.round(1 / (deltaTime / 1000));
  }
  fill(0);
  textSize(20);
  text(`FPS: ${labelFps}`, 5, 25);
}

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
