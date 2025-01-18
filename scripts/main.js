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

// spatial hash with and height
let spatialHashWidth = 1;
let spatialHashHeight = 1;
// delta time
let delta = 0;
let now = new Date().getTime();
function draw() {
  // Calculate delta time
  delta = new Date().getTime() - now;
  now = new Date().getTime();

  // spatial hash config
  if (debug.SpatialHash) {
    grid.reset();

    for (const boid of boids) {
      const [row, column] = grid.getCell(boid.pos);
      grid.cells[row][column].push(boid);
    }

    spatialHashWidth = Math.max(
      1,
      Math.floor(
        params.perceptionRadius /
          (params.canvasWidth / params.horizontalDivisions)
      )
    );
    spatialHashHeight = Math.max(
      1,
      Math.floor(
        params.perceptionRadius /
          (params.canvasHeight / params.verticalDivisions)
      )
    );
    console.log(spatialHashHeight);
  }
  // background
  background(params.backgroundColor);

  //draw spatial hash
  if (debug.showSpatialHash) {
    for (let row = 0; row < params.horizontalDivisions; row++) {
      for (let column = 0; column < params.verticalDivisions; column++) {
        stroke(0);
        noFill();
        rect(
          row * (params.canvasWidth / params.horizontalDivisions),
          column * (params.canvasHeight / params.verticalDivisions),
          params.canvasWidth / params.horizontalDivisions,
          params.canvasHeight / params.verticalDivisions
        );
      }
    }
  }

  if (debug.showSpatialHash && debug.showOne) {
    // show neighbors grid for one boid
    const [row, column] = grid.getCell(boids[0].pos);

    for (let i = -spatialHashWidth; i <= spatialHashWidth; i++) {
      for (let j = -spatialHashHeight; j <= spatialHashHeight; j++) {
        let newRow = row + i;
        let newColumn = column + j;

        fill("#fca311");
        rect(
          newRow * (params.canvasWidth / params.horizontalDivisions),
          newColumn * (params.canvasHeight / params.verticalDivisions),
          params.canvasWidth / params.horizontalDivisions,
          params.canvasHeight / params.verticalDivisions
        );
      }
    }
  }

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
  if (frameCount % 3 === 0) {
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
