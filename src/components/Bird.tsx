import Matter from 'matter-js';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Bird = (props: {
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
      style={styles(color, xBody, yBody, widthBody, heightBody).birdStyle}
    />
  );
};

export default (
  world: Matter.World,
  color: String,
  position: {x: number; y: number},
  size: {width: number; height: number},
) => {
  //creating the bird
  //'rectangle' is the hitbox of the bird component
  const initialBird = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    //optional parameters for rectangle
    {label: 'Bird'},
  );
  //Adding the bird to the world
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    position,
    renderer: (
      <Bird
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
    birdStyle: {
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
