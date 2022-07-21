import Matter from 'matter-js';

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
  {touches, time}: any,
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
  //returning updated entities
  return entities;
}

export default Physics;
