/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Animated, PanResponder, FlatList
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

const SLIDER_WIDTH = width;
const ITEM_WIDTH = width - 100;
const ITEM_HEIGHT = height - 100;

export default class App extends Component<{}> {
  constructor() {
    super();

    this.state = {
      index: 0,
      pan: new Animated.ValueXY()
    }

    this.panResponder = null;

    this.renderItem = this.renderItem.bind(this);
    this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this);
    this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this);
    this.handlePanResponderRelease = this.handlePanResponderRelease.bind(this);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
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

  renderItem({ item, index }) {
    const style = index == this.state.index
      ? [
        styles.card,
        { transform: this.state.pan.getTranslateTransform() }
      ] : styles.card;

    return (
      <Animated.View
        style={style}
        {...(index == this.state.index ? this.panResponder.panHandlers : null)} >
        <Text style={styles.welocme}>
          Hello
        </Text>
      </Animated.View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={(carousel) => {
            this.carousel = carousel;
          }}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideOpacity={0.3}
          renderItem={this.renderItem}
          data={[{ key: 1 }, { key: 2 }]}
          onSnapToItem={(index) => {
            Animated.spring(this.state.pan, {
              toValue: { x: 0, y: 0 },
              friction: 1000
            }).start();

            setTimeout(() => {
              this.setState({ index });
            }, 600);
          }} />
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
    backgroundColor: 'white',
    borderRadius: 4,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginTop: (height - ITEM_HEIGHT) / 2,
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
