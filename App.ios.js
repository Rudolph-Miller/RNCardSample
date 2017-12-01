/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Animated, PanResponder
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class App extends Component<{}> {
  constructor() {
    super();

    this.state = {
      pan: new Animated.ValueXY()
    }

    this.panResponder = null;

    this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this);
    this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this);
    this.handlePanResponderRelease = this.handlePanResponderRelease.bind(this);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
      onPanResponderRelease: this.handlePanResponderRelease
    });
  }

  handlePanResponderGrant(e, gestureState) {
    this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
    this.state.pan.setValue({ x: 0, y: 0 });
  }

  handlePanResponderEnd(e, gestureState) {
    this.state.pan.flattenOffset();
  }

  handlePanResponderRelease(e, gentureState) {
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      friction: 6
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.card,
            { transform: this.state.pan.getTranslateTransform() }
          ]}
          {...this.panResponder.panHandlers} >
          <Text style={styles.welocme}>
            Hello
          </Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 75,
    height: height - 100,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowOffset:{ width: 0,  height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
