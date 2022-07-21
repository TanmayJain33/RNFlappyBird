import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from './src/entities';

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <GameEngine
        style={styles.gameEngine}
        //adding the bird using entities prop
        entities={entities()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  gameEngine: {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},
});
