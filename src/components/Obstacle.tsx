import Matter from 'matter-js';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Obstacle = (props: {
  body: {
    bounds: {max: {x: number; y: number}; min: {x: number; y: number}};
    position: {x: number; y: number};
  };
  color: any;
}) => {
  //getting the max and min value of x/width within the rectangle body
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  //getting the max and min value of y/height within the rectangle body
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  //getting the position of the body
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  //getting the color of body
  const color = props.color;

  return (
    <View
      style={styles(color, xBody, yBody, widthBody, heightBody).obstacleStyle}
    />
  );
};

export default (
  world: Matter.World,
  label: any,
  color: String,
  position: {x: number; y: number},
  size: {width: number; height: number},
) => {
  //creating the obstacle
  //'rectangle' is the hitbox of the obstacle component
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    //optional parameters for rectangle
    {label, isStatic: true},
  );
  //Adding the obstacle to the world
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    position,
    renderer: (
      <Obstacle
        body={{
          bounds: {
            max: {
              x: 0,
              y: 0,
            },
            min: {
              x: 0,
              y: 0,
            },
          },
          position: {
            x: 0,
            y: 0,
          },
        }}
        color={undefined}
      />
    ),
  };
};

const styles = (
  color: any,
  xBody: number,
  yBody: number,
  widthBody: number,
  heightBody: number,
) =>
  StyleSheet.create({
    obstacleStyle: {
      borderWidth: 1,
      borderColor: color,
      borderStyle: 'solid',
      position: 'absolute',
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
    },
  });
