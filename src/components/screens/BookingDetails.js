import React from 'react';
import { Header } from 'react-navigation';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import { Button, Card, Avatar } from 'react-native-elements'
import moment from 'moment';
import CustomTimePicker from '../shared/CustomTimePicker';
import LinearGradient from 'react-native-linear-gradient';
import Timeline from 'react-native-timeline-listview'

const GradientHeader = props => (
  <View style={{ backgroundColor: '#eee', marginBottom: 60 }}>
      <LinearGradient
        start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}} locations={[0.0, 1.0]}
        colors={['rgb(45,156,219)', 'rgb(45,156,219)']}
        style={[StyleSheet.absoluteFill, { height: 180, marginBottom: 40 }]}
      >
        <Header {...props} />
      </LinearGradient>
    </View>
)

const AppointmentCreated = (user) => (
    
    <View>
        <Text style={{fontWeight: '700', color:'rgb(45,156,219)'}}>
                Appointment Requested
        </Text>
        <View>
            {user.account_type === 'to_you' 
                ? (
                    <React.Fragment>
                        <Text style={{fontWeight: '700'}}>
                            Tunde has requested your services
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Button
                                buttonStyle={{height: 30, padding: 0, width: 80}}
                                textStyle={{fontSize: 10}}
                                outline
                                icon={{name: 'chat', color: 'rgb(45,156,219)'}}
                                color="rgb(45,156,219)"
                                rounded
                                title='Chat' />
                            <Button
                                buttonStyle={{height: 30, padding: 0, width: 80}}
                                textStyle={{fontSize: 10}}
                                color="white"
                                backgroundColor="#ff6347"
                                rounded
                                title='Accept' />
                        </View>
                    </React.Fragment>
                ) 
                : (
                    <React.Fragment>
                        <Text style={{fontWeight: '700'}}>
                            Tunde has received your appointment but has not confirmed
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Button
                                buttonStyle={{height: 30, padding: 0, width: 80}}
                                textStyle={{fontSize: 10}}
                                outline
                                icon={{name: 'chat', color: 'rgb(45,156,219)'}}
                                color="rgb(45,156,219)"
                                rounded
                                title='Chat' />
                            <Button
                                buttonStyle={{height: 30, padding: 0, width: 80}}
                                textStyle={{fontSize: 10}}
                                color="white"
                                backgroundColor="#ff6347"
                                rounded
                                title='Accept' />
                        </View>
                        </React.Fragment>
                    )
                }
        </View>
    </View>
)

const AppointmentCard = (user) => {
    console.log('appointment card', user);
    if(user.status === 'created') {
        return (
            <React.Fragment>
                <Avatar
                    small
                    rounded
                    source={{uri: user.avatar}}
                    activeOpacity={0.7}
                />
                <AppointmentCreated {...user} />
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <Avatar
                small
                rounded
                source={{uri: user.avatar}}
                activeOpacity={0.7}
            />
            
        </React.Fragment>
    )
}


  class BookingDetails extends React.Component {

    state = {
        from: '8:00',
        to: "18:00",
    }

    componentWillMount() {
        const params = this.props.navigation.state.params || {};
        this.props.navigation.setParams({ dismiss: this.goBack });
    }

    static navigationOptions = ({ navigation })=> {
        const params = navigation.state.params || {};
        return {
            header: props => <GradientHeader {...props} />,
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                paddingRight: 10, 
                paddingLeft: 10,
                //paddingTop: 40,
                height: 180,
                marginBottom: 20,
                marginTop: -20,
            },
            headerLeft:(
                <TouchableOpacity style={{marginTop: -50}} onPress={() => params.dismiss()}>
                    <IOSIcon color="white" name="ios-arrow-back" size={30} />
                </TouchableOpacity>
            ),
            headerTitle: (
                <View style={{ alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{ color: 'white', fontWeight: '600', marginBottom: 20}}>
                        Booking Detail
                    </Text>
                    <View flexDirection="row">
                        <View style={{marginRight: 40}}>
                            <Text style={{ color: 'white', fontWeight: '100', marginBottom: 10}}>
                                Date
                            </Text>
                            <Text style={{ flex: 1, color: 'white', fontWeight: '600', fontSize: 20, alignSelf: 'center'}}>
                                {moment(params.booking.appointment.day).format('MMM D YYYY')}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontWeight: '100', marginBottom: 10}}>
                                Time
                            </Text>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 20}}>
                                {params.booking.time}
                            </Text>
                        </View>
                    </View>
                </View>
            ),
        }
    }

    goBack = () => {
        const goBack = this.props.screenProps.dismiss()
    }


    onStartChat = () => {
        
        
    }

    render() {
      // Name of the Trainer
      // Price
      // Date
      // Time
      // Button Confirm and Pay 
      const params = this.props.navigation.state.params
      const { booking, key } = params;
      let { trainer, user, user_id, status } = booking;
      trainer = {...trainer, account_type: key, status};
      user = {...user, account_type: key, status};
        return (
            <View style={{ flex: 1, marginTop: 100, padding: 30, backgroundColor: '#fff' }}>
                 <Card>
                     <View>
                        <Text style={{fontWeight: '700', color:'rgb(45,156,219)'}}>
                              Address
                        </Text>
                        <Text style={{fontWeight: '700'}}>
                            Apartment Puri Parkview, Pessangrahan, BB Kenbangan, Jakarta Barat 11620, Indonesia
                        </Text>
                     </View>
                 </Card>

                 <Card>
                    { key === 'from_you' 
                        ? <AppointmentCard {...user}/> 
                        : <AppointmentCard {...trainer}/> 
                    }
                 </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop:65,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
    title:{
      fontSize:16,
      fontWeight: 'bold'
    },
    descriptionContainer:{
      flexDirection: 'row',
      paddingRight: 50,
      marginTop: 5,
    },
    image:{
      width: 50,
      height: 50,
      borderRadius: 25
    },
    textDescription: {
      marginLeft: 10,
      color: 'gray'
    }
  });

export default BookingDetails;