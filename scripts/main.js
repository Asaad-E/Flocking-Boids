"use strict";

// Elements

const canvasContainer = document.querySelector(".canvas-container");

// Variables

let boids = [];
let grid = new SpatialHash();
let labelFps = params.targetFps;
let interval;

function setup() {
  // Create canvas
  const canvas = createCanvas(params.canvasWidth, params.canvasHeight);
  canvas.parent(canvasContainer);
  frameRate(params.targetFps);

  // Create boids
  for (let i = 0; i < params.numBoids; i++) {
    boids.push(new Boid(random(width), random(height)));
  }
}

let delta = 0;
let now = new Date().getTime();
function draw() {
  // Calculate delta time
  delta = new Date().getTime() - now;
  now = new Date().getTime();

  // spatial hash

  if (debug.SpatialHash) {
    grid = new SpatialHash();
    for (const boid of boids) {
      const [row, column] = grid.getCell(boid.pos);
      grid.cells[row][column].push(boid);
    }
  }
  // background
  background(params.backgroundColor);

  // Draw boids
  fill(params.boidsColor);
  noStroke();
  for (let index = 0; index < boids.length; index++) {
    const boid = boids[index];

    if (debug.pause === false) {
      if (debug.SpatialHash) {
        const neighbors = grid.getNeighbors(boid.pos);
        boid.flock(neighbors);
      } else {
        boid.flock(boids);
      }

      boid.avoid(createVector(mouseX, mouseY));
      boid.update(delta / 1000);
      boid.edge();
    }

    boid.draw();
  }

  // Show one boid for debugging
  if (debug.showOne && boids[0]) {
    noFill();
    stroke(0);
    circle(boids[0].pos.x, boids[0].pos.y, params.perceptionRadius * 2);
    fill(params.showOneColor);
    noStroke();
    boids[0].draw();
  }

  // Show FrameRate on canvas
  if (frameCount % 5 === 0) {
    labelFps = Math.round(1 / (delta / 1000));
  }
  fill(0);
  textSize(20);
  text(`FPS: ${labelFps}`, 5, 25);
}

// dinamicBoidsNumber

const frameUpperThreshold = 10;
const frameLowerThreshold = 6;

let isEnable = false;
let frame = 0;
let count = 0;

let tolerance = 1.02;
let intervalTime = 1000 / 6;

function dinamicBoidsNumber() {
  if (debug.dinamicBoidsNumber === false || debug.pause === true) return;

  if (delta <= params.targetDelta * tolerance && count < frameUpperThreshold) {
    count++;
  } else if (
    delta > params.targetDelta * tolerance &&
    count > -frameUpperThreshold
  ) {
    count--;
  }

  if (Math.abs(count) === frameUpperThreshold) {
    isEnable = true;
  } else if (Math.abs(count) <= frameLowerThreshold) {
    isEnable = false;
  }

  if (isEnable) {
    if (count > 0) {
      numBoidsSlider.value = Number(numBoidsSlider.value) + 5;
    } else {
      numBoidsSlider.value = Number(numBoidsSlider.value) - 5;
    }
    updateNumBoids();
  }
}
