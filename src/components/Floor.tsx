import Matter from 'matter-js';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images';

const Floor = (props: {
  body: {
    bounds: {max: {x: number; y: number}; min: {x: number; y: number}};
    position: {x: number; y: number};
  };
}) => {
  //getting the max and min value of x/width within the rectangle body
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  //getting the max and min value of y/height within the rectangle body
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  //getting the position of the body
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View style={styles(xBody, yBody, widthBody, heightBody).floorStyle}>
      <Image
        source={Images.floor}
        resizeMode="repeat"
        style={styles(xBody, yBody, widthBody, heightBody).floorImage}
      />
    </View>
  );
};

export default (
  world: Matter.World,
  position: {x: number; y: number},
  size: {width: number; height: number},
) => {
  //creating the floor
  //'rectangle' is the hitbox of the floor component
  const initialFloor = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    //optional parameters for rectangle
    {
      label: 'Floor',
      //Floor doesn't move throughout the app
      isStatic: true,
    },
  );
  //Adding the floor to the world
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    position,
    renderer: (
      <Floor
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
      />
    ),
  };
};

const styles = (
  xBody: number,
  yBody: number,
  widthBody: number,
  heightBody: number,
) =>
  StyleSheet.create({
    floorStyle: {
      position: 'absolute',
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
    },
    floorImage: {
      width: widthBody,
      height: heightBody,
    },
  });
