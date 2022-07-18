import Matter from 'matter-js';
//Matter is used to add physics in the game like gravity

export default function Restart() {
  //instance of engine
  const engine = Matter.Engine.create({enableSleeping: false});
  // enableSleeping improves performance of the app
  //accessing the world from 'engine'
  const world = engine.world;
  //setting the gravity(only vertical) that will be applied in the world
  engine.gravity.y = 0.4;

  return {physics: {engine, world}};
}

// export default restart => {
//   let engine = Matter.Engine.create({enableSleeping: false});

//   let world = engine.world;

//   world.gravity.y = 0.4;

//   const pipeSizePosA = getPipeSizePosPair();
//   const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);
//   return {
//     physics: {engine, world},

//     Bird: Bird(world, 'green', {x: 50, y: 300}, {height: 40, width: 40}),

//     ObstacleTop1: Obstacle(
//       world,
//       'ObstacleTop1',
//       'red',
//       pipeSizePosA.pipeTop.pos,
//       pipeSizePosA.pipeTop.size,
//     ),
//     ObstacleBottom1: Obstacle(
//       world,
//       'ObstacleBottom1',
//       'blue',
//       pipeSizePosA.pipeBottom.pos,
//       pipeSizePosA.pipeBottom.size,
//     ),

//     ObstacleTop2: Obstacle(
//       world,
//       'ObstacleTop2',
//       'red',
//       pipeSizePosB.pipeTop.pos,
//       pipeSizePosB.pipeTop.size,
//     ),
//     ObstacleBottom2: Obstacle(
//       world,
//       'ObstacleBottom2',
//       'blue',
//       pipeSizePosB.pipeBottom.pos,
//       pipeSizePosB.pipeBottom.size,
//     ),

//     Floor: Floor(
//       world,
//       'green',
//       {x: windowWidth / 2, y: windowHeight},
//       {height: 50, width: windowWidth},
//     ),
//   };
// };
