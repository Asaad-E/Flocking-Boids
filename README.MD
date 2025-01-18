# Flocking Boids

This project simulates the flocking behavior of boids (bird-like objects) using a set of rules. Test the online [online Version](https://flocking-boids.netlify.app/)

<img src="https://github.com/Asaad-E/Flocking-Boids/blob/main/media/video.gif" width="400" height="400"/>

The simulation demonstrates how complex group behaviors can emerge from limited environmental awareness and simple rules.

The strength of these three behaviors can be controlled with their respective sliders.

Beyond these rules, each boid is initialized at a random location with a random velocity and a predefined perception radius.

## Algorithm Behavior

- **Separation:** Each agent tends to avoid collisions with its neighbors.
- **Alignment:** Each agent tries to align its velocity with that of its neighbors.
- **Cohesion:** Each agent tries to move towards the average position of its neighbors.

With the sum of these three simple rules, the agents can exhibit complex flocking behaviors.

## Features

- **Dynamic Boids Number:** Determine and maintain the optimal number of boids within the canvas to achieve the highest possible agent count without impacting the target frame rate (Disabled by default).
- **Spatial Partitioning:** Agents are organized into a grid to optimize neighbor search.
- **Control Panel:** The user can adjust simulation parameters in real-time.
- **Agent Visualization:** The user can toggle the display of agents' vision range and current cells neighbors.
- **Mouse Atraction/Repulsion**: The user can attract/repel the boids to the mouse position.

## Parameters

In **Scripts/parameters.js** you can find the following parameters of the simulation:

```javascript
const params = {
  numBoids: 1000, // Number of boids in the flock

  boidsRadius: 10, // Radius of the boids
  perceptionRadius: 120, // Radius for boid perception

  maxSpeed: 300, // Maximum speed of the boids (px/seg)
  maxForce: 12, // Maximum steering force
  maxForceMouse: 13, // Maximum steering force for mouse avoidance/atraction

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
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Flocking-Boids.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Flocking-Boids
   ```
3. Open the **index.html**.

## Library

This simulation was made using the [P5.js library](https://p5js.org/). Its an open source creative coding platform.

## References

- Craig Reynolds for the [original Boids algorithm](https://www.red3d.com/cwr/boids/).
- The nature of code - [Chapter 5: Autonomous Agents](https://natureofcode.com/autonomous-agents/) By Daniel Shiffman.
- [The code Train - challenge 124](https://thecodingtrain.com/challenges/124-flocking-simulation) for similar projects.
