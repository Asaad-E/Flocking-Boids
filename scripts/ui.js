// Slider control

const numBoidsSlider = document.getElementById("numBoids");
const alignmentWeightSlider = document.getElementById("alignmentWeight");
const cohesionWeightSlider = document.getElementById("cohesionWeight");
const separationWeightSlider = document.getElementById("separationWeight");
const perceptionRadiusSlider = document.getElementById("perceptionRadius");
const maxSpeedSlider = document.getElementById("maxSpeed");
const mouseAtractionSlider = document.getElementById("mouseAttraction");

const SpatialHashCheck = document.getElementById("SpatialHash");
const showOne = document.getElementById("showOne");
const dinamicBoidsNumberCheck = document.getElementById("dinamicBoidsNumber");

const playButton = document.getElementById("playButton");

// functions

function updateNumBoids() {
  let newNumBoids = Number(numBoidsSlider.value);
  if (newNumBoids < params.numBoids) {
    boids = boids.slice(0, newNumBoids);
  } else {
    for (let i = 0; i < newNumBoids - params.numBoids; i++) {
      boids.push(new Boid(random(width), random(height)));
    }
  }
  params.numBoids = numBoidsSlider.value;
  numBoidsSlider.nextElementSibling.textContent = params.numBoids;
}

function updateAlignmentWeight() {
  params.alignmentWeight = Number(alignmentWeightSlider.value);
  alignmentWeightSlider.nextElementSibling.textContent = params.alignmentWeight;
}

function updateCohesionWeight() {
  params.cohesionWeight = Number(cohesionWeightSlider.value);
  cohesionWeightSlider.nextElementSibling.textContent = params.cohesionWeight;
}

function updateSeparationWeight() {
  params.separationWeight = Number(separationWeightSlider.value);
  separationWeightSlider.nextElementSibling.textContent =
    params.separationWeight;
}

function updatePerceptionRadius() {
  params.perceptionRadius = Number(perceptionRadiusSlider.value);
  perceptionRadiusSlider.nextElementSibling.textContent =
    params.perceptionRadius;
}

function updateMaxSpeed() {
  params.maxSpeed = Number(maxSpeedSlider.value);
  maxSpeedSlider.nextElementSibling.textContent = params.maxSpeed;
}

function updateMouseAttraction() {
  params.mouseWeight = Number(mouseAtractionSlider.value);
  mouseAtractionSlider.nextElementSibling.textContent = params.mouseWeight;
}

function updateShowOne() {
  debug.showOne = showOne.checked;
}

function updatePlayButton() {
  debug.pause = !debug.pause;
  if (debug.pause) {
    playButton.textContent = "Play";
  } else {
    playButton.textContent = "Pause";
  }
}

function updateDinamicBoidsNumber() {
  debug.dinamicBoidsNumber = dinamicBoidsNumberCheck.checked;

  // clear inetvar if false to avoid boids number change
  if (debug.dinamicBoidsNumber) {
    interval = setInterval(dinamicBoidsNumber, intervalTime);
  } else {
    clearInterval(interval);
  }
}

function updateSpatialHash() {
  debug.SpatialHash = SpatialHashCheck.checked;
}

// evetns

numBoidsSlider.addEventListener("input", updateNumBoids);
alignmentWeightSlider.addEventListener("input", updateAlignmentWeight);
cohesionWeightSlider.addEventListener("input", updateCohesionWeight);
separationWeightSlider.addEventListener("input", updateSeparationWeight);

perceptionRadiusSlider.addEventListener("input", updatePerceptionRadius);

maxSpeedSlider.addEventListener("input", updateMaxSpeed);

mouseAtractionSlider.addEventListener("input", updateMouseAttraction);

SpatialHashCheck.addEventListener("change", updateSpatialHash);
showOne.addEventListener("change", updateShowOne);
dinamicBoidsNumberCheck.addEventListener("change", updateDinamicBoidsNumber);

playButton.addEventListener("click", updatePlayButton);

// stop simulation when windwo is not active
window.onblur = function () {
  debug.pause = true;
  playButton.textContent = "Play";
};

window.onfocus = function () {
  debug.pause = false;
  playButton.textContent = "Pause";
};

// initializations

updateNumBoids();
updateAlignmentWeight();
updateCohesionWeight();
updateSeparationWeight();
updatePerceptionRadius();
updateMaxSpeed();
updateMouseAttraction();
updateShowOne();
updateDinamicBoidsNumber();
