import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from './src/entities';
import Physics from './src/physics/physics';

export default function App() {
  const [running, setRunning] = useState(false);

  //falling the bird when it is loaded
  useEffect(() => {
    setRunning(true);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <GameEngine
        //stopping the bird to fall when app starts
        running={running}
        style={styles.gameEngine}
        //adding the bird using entities prop
        entities={entities()}
        //adding systems using systems prop
        systems={[Physics]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  gameEngine: {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},
});
