import React from 'react';
import {  View, StyleSheet } from 'react-native';
import { FormLabel } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const CustomRadio = ({ data, index, setValue, title }) => (
  <View>
      <FormLabel>{title}</FormLabel>
      <RadioForm
            formHorizontal={true}
            animation={true}
        >
            {data.map((obj, i) => {
                //var that = this;
                var is_selected = index == i;
                return (
                <View key={i} style={{marginLeft: 10, marginTop: 10}}>
                    <RadioButton labelHorizontal={true} key={i} >
                        <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={is_selected}
                            onPress={(value, idx) => setValue(value, idx)}
                            borderWidth={1}
                            buttonInnerColor={'#000'}
                            buttonOuterColor={'#000'}
                            buttonSize={15}
                            buttonOuterSize={15}
                            buttonStyle={{}}
                            buttonWrapStyle={{marginLeft: 10}}
                        />
                        <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={(value, idx) => setValue(value, idx)}
                            labelStyle={{fontSize: 14, color: '#000'}}
                            labelWrapStyle={{}}
                        />
                    </RadioButton>
                </View>
                )
            })}
        </RadioForm>
  </View>
)

const styles = StyleSheet.create({
    radioStyle: {
        // borderRightWidth: 1,
        // borderColor: '#2196f3',
        paddingRight: 10,
        marginLeft: -10,
      },

})

export default CustomRadio;