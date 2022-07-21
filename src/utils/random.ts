/* eslint-disable prettier/prettier */
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//function for getting a random number b/w 2 numbers
export const getRandom = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
};

//function for getting position and size of the pipe
export const getPipeSizePosPair = (addToPosX = 0) => {
   //top position of the pipe
   const yPosTop = -getRandom(300, windowHeight - 100);
   //position and size of top pipe
   const pipeTop = {
      position: {
         x: windowWidth + addToPosX, y: yPosTop,
      },
      size: { height: windowHeight * 2, width: 75 },
   };
   //position and size of bottom pipe
   const pipeBottom = {
      position: {
         x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop,
      },
      size: { height: windowHeight * 2, width: 75 },
   };
   return { pipeTop, pipeBottom };
};
