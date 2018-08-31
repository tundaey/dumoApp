import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel';

export default class ProfileCarousel extends Component {

  state = {
    entries: ['123', '321']
  }
    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={10}
              itemWidth={10}
            />
        );
    }
}