import React, { Component } from 'react';
import { Header } from 'react-navigation';
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientHeader = props => (
  <View style={{ backgroundColor: '#eee', marginBottom: 60 }}>
      <LinearGradient
        start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}} locations={[0.0, 1.0]}
        //colors={['#000000', '#434343']}
        //colors={['#2e8dde', '#2e8dde']}
        colors={['#ffffff', '#ffffff']}
        style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
      >
        <Header {...props} />
      </LinearGradient>
    </View>
  )

export default GradientHeader;