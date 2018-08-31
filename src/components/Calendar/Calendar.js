import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

const AppointmentCalendar = (props) => (
  <Calendar
    style={{
        height: 400
    }}
    theme={{
        'stylesheet.calendar.main': {
            week: {
              marginTop: 0,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }
        },
        'stylesheet.calendar.head': {
            week: {
              marginTop: 0,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }
        },
        dayTextColor: '#000',
        textDayFontSize: 12,
        textMonthFontSize: 12,
        textDayHeaderFontSize: 12
    }}
    minDate={'2012-05-10'}
    onDayPress={(day) => props.openScheduler(day, props.appointments, props.navigation)}
    onDayLongPress={() => props.openScheduler(day, props.appointments, props.navigation)}
    markedDates={props.appointments}
    monthFormat={'yyyy MM'}
    onMonthChange={(month) => {console.log('month changed', month)}}
    hideExtraDays={true}
    firstDay={1}
    hideDayNames={false}
    showWeekNumbers={true}
    onPressArrowLeft={substractMonth => substractMonth()}
    onPressArrowRight={addMonth => addMonth()}
  />
)

AppointmentCalendar.propTypes = {

};

export default AppointmentCalendar;
