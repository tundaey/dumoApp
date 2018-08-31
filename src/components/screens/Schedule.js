import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import { Button } from 'react-native-elements'
import moment from 'moment';
import { searcAppointments } from '../../reducer/search/actions'
import CustomTimePicker from '../shared/CustomTimePicker';
import { setAvailableAppointment } from '../../reducer/appointments/actions'

  class Schedule extends React.Component {

    state = {
        from: '8:00',
        to: "18:00",
    }

    componentWillMount() {
        this.props.navigation.setParams({ dismiss: this.goBack });
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        const date = moment(params.date.dateString, 'YYYY-MM-DD').format('D MMM YYYY')
        return {
            headerLeft:(
                <TouchableOpacity onPress={() => params.dismiss()}>
                    <IOSIcon name="ios-arrow-back" size={30} />
                </TouchableOpacity>
                ),
            headerStyle: { paddingRight: 10, paddingLeft: 10 },
            title: `${date}`,
        }
    }

    goBack = () => {
        const goBack = this.props.screenProps.dismiss()
    }

    setAvailableTimes = () => {
        const params = {
            date: this.props.navigation.state.params.date.dateString,
            from: this.state.from,
            to: this.state.to,
        }
        console.log('submit available times', params)
        this.props.setAvailableAppointment(params)
        .then(() => this.props.navigation.navigate('Profile') )
        //this.props.dispatch(searcAppointments(params))
        //this.props.navigation.navigate('SearchResults')   
    } 

    setFrom = (time) => {
      this.setState({from: time})
    }

    setTo = (time) => {
      this.setState({to: time})
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 30, backgroundColor: '#fff' }}>
                 <CustomTimePicker
                    title={'From'}
                    date={this.state.from}
                    mode="datetime"
                    format="HH:mm"
                    time={this.state.from}
                    setTime={this.setFrom} />
                  <CustomTimePicker
                    title={'To'}
                    date={this.state.to}
                    mode="datetime"
                    format="HH:mm"
                    time={this.state.to}
                    setTime={this.setTo} />
                 <Button
                    style={{marginTop: 10, marginBottom: 10}}
                    raised
                    borderRadius={20}
                    loading={this.props.authPending}
                    onPress={this.setAvailableTimes}
                    onLongPress={this.setAvailableTimes}
                    backgroundColor={'#000'}
                    title='Set Available Times' 
                />
            </View>
        )
    }
}

export default connect(null, {
  setAvailableAppointment,
})(Schedule)