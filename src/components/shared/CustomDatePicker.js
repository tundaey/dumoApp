import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

const CustomDatePicker = ({ mode, format, setDate, date }) => {
    console.log('setDate', setDate)
    return (
        <View>
            <FormLabel>Date</FormLabel>
            <DatePicker
                ref={(datepicker) => myDatepicker = datepicker}
                style={{width: 320, marginLeft: -15 }}
                date={date}
                mode="date"
                placeholder="dd/mm/yyyy"
                format="DD/MM/YYYY"
                minDate="2016-05-01"
                    //maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
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
                onDateChange={(date) => setDate(date)}
            />
        </View>
    )
}

export default CustomDatePicker;