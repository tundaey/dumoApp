import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Agenda} from 'react-native-calendars';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation'
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import { Button } from 'react-native-elements'
import moment from 'moment';
import { fetchDayBookings } from '../reducer/appointments/actions'
import { getDayBookings } from '../reducer/appointments/selectors'
import { getProfile } from '../reducer/profile/selectors'

class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({ dismiss: this.goBack });
  }

  componentDidMount() {
    const { date, email } = this.props.navigation.state.params;
    const { dateString } = date;
    this.props.fetchDayBookings(email, dateString)
  }

  static navigationOptions = ({ navigation }) => {
      const params = navigation.state.params || {};
      const date = moment(params.date.dateString, 'YYYY-MM-DD').format('D MMM YYYY')
      return {
          headerLeft:(
              <TouchableOpacity onPress={() => params.dismiss()}>
                  <IOSIcon name="ios-arrow-back" color="rgb(45,156,219)" size={30} />
              </TouchableOpacity>
              ),
          headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff' },
          headerTitle: (
            <Text style={{ color: 'rgb(45,156,219)', fontWeight: '600'}}>{`Pick Time on ${date}`}</Text>
          ),
          //title: `Pick Time on ${date}`,
      }
  }

  goBack = () => {
    const goBack = this.props.screenProps.dismiss()
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.props.navigation.state.params.date.dateString}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markedDates={this.props.navigation.state.params.appointments}
         // monthFormat={'yyyy'}
         // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems(day) {
    const dateString = this.props.navigation.state.params.date.dateString;
    
    setTimeout(() => {
      const myItems = {}
      Object.keys(this.props.appointment)
      .forEach(key => {
        return myItems[key] = this.props.appointment[key]
      });
      if(this.props.appointment){
        this.setState({
          items: myItems
        });
      }
      
    }, 1000);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <View flexDirection="column" style={{marginBottom: 10, marginLeft: 12}}>
          <View flexDirection="row" style={{marginRight: 20}}>
            <IOSIcon name="ios-time" color="rgb(45,156,219)" size={20} />
            <Text style={{marginLeft: 10}}>{item.time}</Text>
          </View>
          <View flexDirection="row">
            <IOSIcon name="md-timer" color="rgb(45,156,219)" size={20} />
            <Text style={{marginLeft: 10}}>{'30 minutes'}</Text>
          </View>
        </View>
        
        {item.booked ? <Text>Booked</Text> : (
          <Button
            onPress={this.gotoBookAppointmentPage.bind(this, item)}
            buttonStyle={{height: 30, padding: 0, width: 140}}
            color="#fff"
            backgroundColor="rgb(45,156,219)" 
            title="Book Slot"
            rounded
          />
        )}
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>There are no bookings available for this date</Text>
      </View>
    );
  }

  gotoBookAppointmentPage(item) {
    console.log('reached here', this.props.appointment)
    const { profile } = this.props
    //fix initial issue with profile returning null
    //seems the profile is not in the redux store until i reload the app
    console.log('trainer name', profile)
    const price = profile.price
    const params = this.props.navigation.state.params
    const dateString = params.date.dateString;
    const trainerName = params.trainerName;
    const date = moment(dateString, 'YYYY-MM-DD').format('D MMM YYYY')
    this.props.navigation.navigate('CreateBooking', {
      time: item.time,
      date,
      trainerName,
      price,
      customer_id: profile.customer_id,
      appointment_id: this.props.appointment.appointment_id,
      trainer_id: params.trainer_id,
    })  
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

const mapStateToProps = state => ({
  appointment: getDayBookings(state),
  profile: getProfile(state),
})

export default connect(mapStateToProps, {
  fetchDayBookings,
})(AgendaScreen)