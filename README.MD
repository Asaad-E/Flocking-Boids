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
