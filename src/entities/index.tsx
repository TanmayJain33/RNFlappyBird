import Matter from 'matter-js';
//Matter is used to add physics in the game like gravity
import {Dimensions} from 'react-native';
import Bird from '../components/Bird';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';
import {getPipeSizePosPair} from '../utils/random';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function restart() {
  //instance of engine
  const engine = Matter.Engine.create({enableSleeping: false});
  // enableSleeping improves performance of the app
  //accessing the world from 'engine'
  const world = engine.world;
  //setting the gravity(only vertical) that will be applied in the world
  engine.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

  return {
    physics: {engine, world},
    //adding the bird component to the world
    Bird: Bird(world, 'green', {x: 50, y: 300}, {height: 40, width: 40}),
    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      'red',
      pipeSizePosA.pipeTop.position,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      'blue',
      pipeSizePosA.pipeBottom.position,
      pipeSizePosA.pipeBottom.size,
    ),
    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      'red',
      pipeSizePosB.pipeTop.position,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      'blue',
      pipeSizePosB.pipeBottom.position,
      pipeSizePosB.pipeBottom.size,
    ),
    Floor: Floor(
      world,
      'green',
      {x: windowWidth / 2, y: windowHeight},
      {height: 50, width: windowWidth},
    ),
  };
}
