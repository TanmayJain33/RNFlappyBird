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
    Bird: Bird(
      world,
      {x: windowWidth / 2, y: windowHeight / 2},
      {height: 41, width: 50},
    ),
    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      pipeSizePosA.pipeTop.position,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      pipeSizePosA.pipeBottom.position,
      pipeSizePosA.pipeBottom.size,
    ),
    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      pipeSizePosB.pipeTop.position,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      pipeSizePosB.pipeBottom.position,
      pipeSizePosB.pipeBottom.size,
    ),
    Floor: Floor(
      world,
      {x: windowWidth / 2, y: windowHeight},
      {height: 230, width: windowWidth},
    ),
  };
}
