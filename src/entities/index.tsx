import Matter from 'matter-js';
import Bird from '../components/Bird';
//Matter is used to add physics in the game like gravity

export default function restart() {
  //instance of engine
  const engine = Matter.Engine.create({enableSleeping: false});
  // enableSleeping improves performance of the app
  //accessing the world from 'engine'
  const world = engine.world;
  //setting the gravity(only vertical) that will be applied in the world
  engine.gravity.y = 0.4;

  return {
    physics: {engine, world},
    //adding the bird component to the world
    Bird: Bird(world, 'green', {x: 50, y: 300}, {height: 40, width: 40}),
  };
}
