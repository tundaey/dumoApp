import React from 'react';
import {  View, StyleSheet, Image, Text } from 'react-native';
import { FormLabel } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// const CustomMarker = () => (
//   <Image
//     style={styles.image}
//     source={require('./diamond.png')}
//     resizeMode='contain'
//   />
// )

const CustomSlider = ({
  values,
  title,
  min,
  max,
  step,
  type,
  position,
  sliderLength,
  onValuesChangeStart,
  onValuesChangeFinish,
  onValuesChange  }) => (
  <View style={{marginLeft: 15}}>
    <FormLabel containerStyle={{marginLeft: -15}}>{title}</FormLabel>
    <MultiSlider
      values={values}
      min={min}
      max={max}
      step={step}
      sliderLength={sliderLength}
      onValuesChangeStart={onValuesChangeStart}
      onValuesChange={onValuesChange}
      onValuesChangeFinish={onValuesChangeFinish}
      selectedStyle={{
        backgroundColor: '#d3d3d3',
        height: 3,
      }}
      containerStyle={{
        marginLeft: 10,
        marginTop: 10,
      }}
      markerStyle={{
        height: 15,
        width: 15,
        backgroundColor: '#000'
      }}
      trackStyle={{
        backgroundColor: '#d3d3d3',
        height: 3,
      }}
      touchDimensions={{
        height: 40,
        width: 40,
        borderRadius: 20,
        slipDisplacement: 40,
      }}
    />
    {position === 'before' ? (
      <Text style={{fontSize: 9, marginTop: -35, marginLeft: 100}}>
        {`${type}${min} - ${type}${max}`}
      </Text>
    ) : (
      <Text style={{fontSize: 9, marginTop: -35, marginLeft: 100}}>
        {`${min}${type} - ${max}${type}`}
      </Text>
    )}
    
  </View>
)

export default CustomSlider;