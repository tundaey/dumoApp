import React from 'react';
import { Header } from 'react-navigation';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { connect } from 'react-redux'
import _find from 'lodash/find'
import { Icon, Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import IOSIcon from "react-native-vector-icons/Ionicons";
import LogoutComponent  from '../LogoutComponent';
import { logout } from '../../reducer/auth/actions';
import { TabNavigator, TabBarBottom, DrawerNavigator, StackNavigator } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import moment from 'moment';
import { setDayAppointments, getDayAppointments, saveAppointment } from '../../reducer/profile/actions'
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'
import _upperFirst from 'lodash/upperFirst'
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import { getCurrencyValue } from '../../helpers/utils'
import { getAppointments } from '../../reducer/appointments/actions'
import { getUserAppointments } from '../../reducer/appointments/selectors'
import { getProfile } from '../../reducer/profile/selectors'
import AppointmentCalendar from '../Calendar/Calendar'

const GradientHeader = props => (
    <View style={{ backgroundColor: '#eee', marginBottom: 60 }}>
        <LinearGradient
          start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}} locations={[0.0, 1.0]}
          colors={['#ffffff', '#ffffff']}
          style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
        >
          <Header {...props} />
        </LinearGradient>
      </View>
    )


const DetailsTab = () => TabNavigator({
    Calendar: StackNavigator(CalendarScreen),
    Bio: StackNavigator(BioScreen),
})

const StackDetails = () => StackNavigator({Details: DetailsTab})

class ProfileScreen extends React.Component {

    componentDidMount() {
        this.props.getAppointments()
    }

    state = {
        date: moment(new Date, 'YYYY-MM-DD'),
        showAppointments: false,
        currentDay: {dateString: ''},
        appointments: []
    }

    static navigationOptions = ({ navigation })=> ({
        header: props => <GradientHeader {...props} />,
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            paddingRight: 10, paddingLeft: 10,
        },
        headerLeft:(
            <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                <IOSIcon color="rgb(45,156,219)"  name="ios-menu" size={30} />
            </TouchableOpacity>
        ),
        // headerLeft: <LogoutComponent navigation={navigation}/>,
        headerTitle: (
            <Text style={{ color: 'rgb(45,156,219)', fontWeight: '600'}}>Profile</Text>
        ),
    })


    showDayAppointments = (day)=> {
        console.log('selected day', day)
        this.setState({showAppointments: true, currentDay: day}, 
            ()=> this.props.getDayAppointments(day.dateString))
    }

    openScheduler(day, appointments, navigation) {
        //console.log('this props', this.props)
        const getDay = _find(appointments, (o) => o.day === day.dateString)
       
        if (!getDay) {
            navigation.navigate("Schedule", {date: day})
        }else {
            navigation.navigate("Agenda", {date: day, appointments})
        }
        
    }

    render() {
        return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{height: 150}}>
                <Image
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined
                    }}
                    source={require('./gym2.jpg')}
                />
            </View>
            <View >
                <LinearGradient  colors={['#2ec0de', '#68e0cf']}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                {`${this.props.profile.first_name} ${this.props.profile.last_name}`}
                            </Text>
                        </View>
                        <StarRating
                            disabled={false}
                            starSize={15}
                            maxStars={5}
                            rating={4}
                            fullStarColor={'#fff'}
                            containerStyle={{ paddingVertical: 10 }}
                        />
                    </View>
                    <View style={{paddingRight: 80, paddingLeft: 80, paddingBottom: 10}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View >
                                <Icon
                                    name='sword-cross'
                                    type='material-community'
                                    size={14}
                                    color={'#fff'}
                                />
                                <Text style={{fontSize:14, color: '#fff', marginTop: 2.5}}>
                                    {_upperFirst(this.props.profile.account_type)}
                                </Text>
                            </View>
                            <View >
                                <Icon
                                    name='ios-pricetag-outline'
                                    type='ionicon'
                                    size={14}
                                    color={'#fff'}
                                />
                                <Text style={{fontSize:14, color: '#fff'}}>
                                    {getCurrencyValue(this.props.profile.price)}
                                </Text>
                            </View>
                            <View >
                                <Icon
                                    name='dumbbell'
                                    type='material-community'
                                    size={14}
                                    color={'#fff'}
                                />
                                <Text style={{fontSize:14, color: '#fff'}}>{150}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <Button
                    style={{marginTop: 10, marginBottom: 10, width: 65 }}
                    buttonStyle={{padding: 5}}
                    fontSize={10}
                    borderRadius={20}
                    backgroundColor={'#fff'}
                    color={'#000'}
                    title='Pictures' 
                />
                <Button
                    style={{marginTop: 10, marginBottom: 10, width: 65}}
                    buttonStyle={{padding: 5}}
                    borderRadius={20}
                    fontSize={10}
                    backgroundColor={'#fff'}
                    color={'#000'}
                    title='Bio' 
                />
                <Button
                    style={{marginTop: 10, marginBottom: 10, width: 65}}
                    buttonStyle={{padding: 5}}
                    borderRadius={20}
                    fontSize={10}
                    backgroundColor={'#000'}
                    title='Diary' 
                />
                <Button
                    style={{marginTop: 10, marginBottom: 10, width: 65}}
                    buttonStyle={{padding: 5}}
                    borderRadius={20}
                    fontSize={10}
                    backgroundColor={'#fff'}
                    color={'#000'}
                    title='Previews' 
                />
            </View>
            <View>
                <AppointmentCalendar
                    openScheduler={this.openScheduler}
                    appointments={this.props.appointments}
                    navigation={this.props.navigation}
                />
            </View>
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
    appointments: getUserAppointments(state),
    profile: getProfile(state),
})

export default connect(mapStateToProps, {
    logout,
    getDayAppointments,
    setDayAppointments,
    getAppointments,
})(ProfileScreen)