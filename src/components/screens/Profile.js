import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import IOSIcon from "react-native-vector-icons/Ionicons";
import LogoutComponent  from '../LogoutComponent';
import { logout } from '../../reducer/auth/actions';
import { TabNavigator, TabBarBottom, DrawerNavigator, StackNavigator } from 'react-navigation';
import { Calendar, CalendarList} from 'react-native-calendars'
import moment from 'moment';
import { setDayAppointments, getDayAppointments, saveAppointment } from '../../reducer/profile/actions'
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'


const DetailsTab = () => TabNavigator({
    Calendar: StackNavigator(CalendarScreen),
    Bio: StackNavigator(BioScreen),
})

const StackDetails = () => StackNavigator({Details: DetailsTab})

//bookings
    //["2018-05": [{time: "3:00", booked_by: {name: "Tunde", uid: "12345"}}]]
    //if the time is not present in the list show unavailable for that time
    //if the date is not found, show unavailable for all times listed

//on set to available -- get the month and day, get the time, set available to true
//save the available date to bookings with uid of the trainer
//save the available date to the users bookings

class ProfileScreen extends React.Component {


    state = {
        date: moment(new Date, 'YYYY-MM-DD'),
        showAppointments: false,
        currentDay: {dateString: ''},
        appointments: []
    }

    static navigationOptions = ({ navigation })=> ({
        headerLeft:(
            <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                <IOSIcon name="ios-menu" size={30} />
            </TouchableOpacity>
            ),
        headerStyle: { paddingRight: 10, paddingLeft: 10 },
        headerRight: <LogoutComponent navigation={navigation}/>
    })

    setTimeToAvailable = (appointment, value, key)=> {
        console.log('new value', appointment, value, key)
        // const appointments = _isEmpty(this.props.appointments) 
        //     ? this.props.defaultAppointments : this.props.appointments[this.state.currentDay.dateString]
        // const newAppointments = appointments.map(a => {
        //     if(a.time === appointment.time ) {
        //         let b = Object.assign({}, a);
        //         b.available = value
        //         return b
        //     }
        //     return a;
        // })
        const day = this.state.currentDay.dateString;
        const { time } = appointment
        const available = value;
        this.props.setDayAppointments(this.state.currentDay.dateString, time, available)
        // const newAppointment = Object.assign({}, appointment)
        // console.log('newappointment', newAppointment)
        // newAppointment.available = value;
        // newAppointment['day'] = this.state.currentDay.dateString;
        // console.log('new appointment', newAppointment)
        // if(value) this.props.dispatch(saveAppointment(newAppointment))
    }

    debounceInput = _debounce(() => {
        //this.checkTransferFields();
        console.log('debounced')
        this.props.dispatch(setDayAppointments(this.state.currentDay.dateString, this.state.appointments))
      }, 1000)

    showDayAppointments = (day)=> {
        console.log('selected day', day)
        this.setState({showAppointments: true, currentDay: day}, 
            ()=> this.props.getDayAppointments(day.dateString))
    }

    render() {
        //console.log('appointments to display', this.props.appointments)
        // const appointmentsToDisplay = _isEmpty(this.props.appointments) 
        //     ? [] : this.props.appointments[this.state.currentDay.dateString]
        
        return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{marginTop: 40}}><Text>Profile Details</Text></View>
            <View>
                <Calendar
                    // Initially visible month. Default = Date()
                    //current={this.state.date}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    //current={'2012-05-10'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => this.showDayAppointments(day)}
                    markedDates={
                        {
                         [this.state.currentDay.dateString]: {selected: true,},
                        }
                    }
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // Hide month navigation arrows. Default = false
                    //hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    //renderArrow={(direction) => (<Arrow />)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    //disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                />
            </View>
            { !this.props.appointments[this.state.currentDay.dateString] ? null : (
                <View>
                    <View style={{backgroundColor: 'grey', flexDirection: 'row', padding:5}}>
                        <Text style={styles.time_header}>Time</Text>
                        <Text style={styles.event_header}>Event</Text>
                    </View>
                    <ScrollView>
                        {this.props.appointments[this.state.currentDay.dateString].map((appointment, key) => (
                            <View style={styles.agenda_container}>
                                <Text style={styles.time_body}>{appointment.time}</Text>
                                {
                                    appointment.booked_by 
                                    ? <Text style={styles.event_body}>{appointment.booked_by}</Text> 
                                    : <View style={{flexDirection: 'row', flex: 1, marginLeft: 30}}>
                                        <Text>{appointment.available ? 'Available' : 'Unavailable'}</Text>
                                        <View style={{marginLeft: 5, marginTop: -5}}>
                                            <Switch
                                                onValueChange={(value)=> this.setTimeToAvailable(appointment, value, key)} 
                                                value={appointment.available}/>
                                        </View>
                                    </View>
                                }
                                
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
        );
    }
}

class CalendarScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
        </View>
      );
    }
  }
  
  class BioScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    time_header: {
        color: 'white',
        fontWeight:'bold',
        flex: 1,
        fontSize: 15, 
        paddingLeft: 30, 
        textDecorationColor: 'white',
        textDecorationLine: 'underline',
    },
    event_header: {
        color: 'white', 
        flex: 1,
        fontWeight:'bold',
        fontSize: 15, 
        paddingLeft: 20, 
        textDecorationColor: 'white',
        textDecorationLine: 'underline',
    },
    agenda_container: {
        flexDirection: 'row',
        marginTop: 20
    },
    time_body: { 
        fontSize: 15, 
        flex: 1, 
        paddingLeft: 30 ,
    },
    event_body: { 
        fontSize: 15, 
        flex: 1, 
        paddingLeft: 30
    }
})

const mapStateToProps = (state) => ({
    defaultAppointments: state.profile.calendarDefault,
    appointments: state.profile.calendar
})

export default connect(mapStateToProps, {
    logout,
    getDayAppointments,
    setDayAppointments
})(ProfileScreen)