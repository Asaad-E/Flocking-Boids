// parameters

const params = {
  numBoids: 1000, // Number of boids in the flock

  boidsRadius: 10, // Radius of the boids
  perceptionRadius: 120, // Radius for boid perception,
  perceptionRadiusSq: 60 ** 2, // Square of the perception radius

  maxSpeed: 300, // Maximum speed of the boids (px/seg)
  maxForce: 12, // Maximum steering force
  maxForceMouse: 13, // Maximum steering force for mouse avoidance

  alignmentWeight: 1.2, // Weight for alignment behavior
  cohesionWeight: 1.2, // Weight for cohesion behavior
  separationWeight: 1.2, // Weight for separation behavior
  mouseWeight: 1, // Weight for mouse avoidance/atraction

  canvasWidth: 600, // Width of the canvas
  canvasHeight: 600, // Height of the canvas

  horizontalDivisions: 14, // Number of horizontal divisions
  verticalDivisions: 14, // Number of vertical divisions

  backgroundColor: "#003049", // Background color of the canvas
  boidsColor: "#c1121f", // Color of the boids
  showOneColor: "#fdf0d5", // Color of the boid when showing only one

  targetFps: 60, // Target frame rate
  targetDelta: 1000 / 60, // Target delta time (ms) (1000 / targetFps)
};

params.targetDelta = 1000 / params.targetFps;

const debug = {
  SpatialHash: true, // enable spatial hash
  showSpatialHash: true, // show spatial hash
  showOne: false, // Show only one boid
  pause: false, // Pause the simulation
  dinamicBoidsNumber: false, // Enable dinamic boids number
};
