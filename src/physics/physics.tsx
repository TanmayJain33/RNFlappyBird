import Matter from 'matter-js';

//Adding physics to the project
//first entities are passed which includes all the components
//touches for detecting touches within the screen
//time for updating the app according to position of the body
//dispatch for updating the app like sending messages when game over, updating score, etc.
function Physics(entities: {physics: {engine: any}}, {time}: any) {
  //getting the engine from entities
  let engine = entities.physics.engine;
  //trigger an update of the engine
  //time.delta is the difference between current and previous time
  Matter.Engine.update(engine, time.delta);
  //returning updated entities
  return entities;
}

export default Physics;
