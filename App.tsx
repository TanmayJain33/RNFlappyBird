import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Images from './assets/images';
import entities from './src/entities';
import Physics from './src/physics/physics';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  const [running, setRunning] = useState(false);
  //to display scrore
  const [currentPoints, setCurrentPoints] = useState(0);
  const game_engine = useRef(null);
  //falling the bird when it is loaded
  useEffect(() => {
    setRunning(false);
  }, []);

  const resetGame = () => {
    game_engine.current.swap(entities());
    setCurrentPoints(0);
    setRunning(true);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image
        source={Images.background}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <Text style={styles.points}>{currentPoints}</Text>
      <GameEngine
        ref={game_engine}
        //stopping the bird to fall when app starts
        running={running}
        style={styles.gameEngine}
        //adding the bird using entities prop
        entities={entities()}
        //adding systems using systems prop
        systems={[Physics]}
        //receiving the game over / collision
        onEvent={(e: any) => {
          switch (e) {
            case 'game-over':
              setRunning(false);
              break;
            case 'new-point':
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}>
        <StatusBar hidden={true} />
      </GameEngine>
      {!running ? (
        <View style={styles.btn}>
          <TouchableOpacity style={styles.btnContainer} onPress={resetGame}>
            <Text style={styles.btnText}>START GAME</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  gameEngine: {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},
  points: {
    color: '#fff',
    fontSize: 72,
    position: 'absolute',
    top: 50,
    left: windowWidth / 2 - 24,
    textShadowColor: '#222',
    textShadowRadius: 2,
    textShadowOffset: {width: 2, height: 2},
  },
  btn: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  btnContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  btnText: {fontWeight: '700', color: '#fff', fontSize: 20},
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: windowWidth,
    height: windowHeight,
  },
});
