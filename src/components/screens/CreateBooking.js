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
import { setAvailableAppointment, initializePaymentForAppointment } from '../../reducer/appointments/actions'
import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'pk_test_uON7Ga0f0aEFY7ZXLl5eQJxu',
})

  class CreateBooking extends React.Component {

    state = {
        from: '8:00',
        to: "18:00",
    }

    componentWillMount() {
        this.props.navigation.setParams({ dismiss: this.goBack });
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerLeft:(
                <TouchableOpacity onPress={() => params.dismiss()}>
                    <IOSIcon name="ios-arrow-back" color="rgb(45,156,219)" size={30} />
                </TouchableOpacity>
                ),
            headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff' },
            headerTitle: (
                <Text style={{ color: 'rgb(45,156,219)', fontWeight: '600'}}>{'Confirm your Appointment'}</Text>
            ),
            //title: `Confirm your Appointment`,
        }
    }

    goBack = () => {
        const goBack = this.props.screenProps.dismiss()
    }

    setFrom = (time) => {
      this.setState({from: time})
    }

    setTo = (time) => {
      this.setState({to: time})
    }

    payWithStripe = () => {
        const params = this.props.navigation.state.params
        const { appointment_id, customer_id, date, time, trainer_id, price} = params
        const payload = {
            appointment_id,
            customer_id,
            date,
            time,
            trainer_id,
            amount: price,
        }
        
        if(customer_id) {
            console.log('customer id', customer_id)
            this.props.initializePaymentForAppointment(payload)
            .then((res) => this.props.navigation.navigate('Home'))
            .catch((err)=> console.warn('err', err))
        }else {
            stripe.paymentRequestWithCardForm()
            .then((response)=> this.props.initializePaymentForAppointment(payload))
            .then((res) => this.props.navigation.navigate('Home'))
            .catch((err)=> console.warn('err', err))
        }
        
    }

    render() {
      
      const params = this.props.navigation.state.params
        return (
            <View style={{ flex: 1, padding: 30, backgroundColor: '#fff' }}>
                 <Text>Trainer Name: {params.trainerName}</Text>
                 <Text>Date of Appoinment: {params.date}</Text>
                 <Text>Time of Appoinment: {params.time}</Text>
                 <Text>Cost £{params.price}</Text>
                  <Button
                    onPress={this.payWithStripe}
                    style={{marginTop: 20}}
                    color="#fff"
                    backgroundColor="rgb(45,156,219)" 
                    title="Confirm Booking"
                    rounded
                  />
            </View>
        )
    }
}

export default connect(null, {
  setAvailableAppointment,
  initializePaymentForAppointment,
})(CreateBooking)