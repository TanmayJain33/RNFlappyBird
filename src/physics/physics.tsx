import Matter from 'matter-js';
import {getPipeSizePosPair} from '../utils/random';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

//Adding physics to the project
//first entities are passed which includes all the components
//touches for detecting touches within the screen
//time for updating the app according to position of the body
//dispatch for updating the app like sending messages when game over, updating score, etc.
function Physics(
  entities: {
    [x: string]: any;
    physics: {engine: any};
  },
  {touches, time, dispatch}: any,
) {
  //getting the engine from entities
  let engine = entities.physics.engine;
  //intercepting a touch within a screen
  //filter because we only want pressed touches
  touches
    .filter((t: {type: string}) => t.type === 'press')
    //iterate through each touch and moving the bird up
    .forEach(() => {
      //setVelocity to set the linear velocity of bird
      Matter.Body.setVelocity(entities.Bird.body, {
        //setting the position after touch
        x: 0,
        y: -8,
      });
    });
  //trigger an update of the engine
  //time.delta is the difference between current and previous time
  Matter.Engine.update(engine, time.delta);
  //moving the obstacles in horizontal direction to the left
  for (let index = 1; index <= 2; index++) {
    //setting the score when obstacle passes the bird
    if (
      entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${index}`].point
    ) {
      entities[`ObstacleTop${index}`].point = true;
      dispatch('new-point');
    }

    //obstacles must return to their initial position if they are moved out of the screen
    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
      //setting the initial position to the obstacles
      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.position,
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.position,
      );
    }
    //moving the top obstacle in horizontal direction to the left
    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x: -3, y: 0});
    //moving the bottom obstacle in horizontal direction to the left
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -3,
      y: 0,
    });
  }
  //detecting collisions
  //'collisionStart' is the type of event that will be triggered when there is a collision
  //function will trigger when collision is detected
  Matter.Events.on(engine, 'collisionStart', () => {
    dispatch('game-over');
  });
  //returning updated entities
  return entities;
}

export default Physics;
