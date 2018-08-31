import React from 'react';
import { View } from 'react-native';
import { FormLabel } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

const CustomTimePicker = ({ mode, format, setTime, time, title }) => (
    <View>
        <FormLabel>{title}</FormLabel>
        <DatePicker
            style={{width: 320, marginLeft: -15}}
            date={time}
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    right: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                },
                placeholderText: {
                    marginLeft: 0,
                }
                // ... You can check the source to find the other keys.
            }}
            mode={mode}
            format={format}
            minuteInterval={30}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            is24Hour={false}
            onDateChange={(time, i) => {setTime(time)}}
        />
    </View>
)

CustomTimePicker.defaultProps = {
    title: 'Time'
}

export default CustomTimePicker;