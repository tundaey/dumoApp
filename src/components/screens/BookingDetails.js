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

  class BookingDetails extends React.Component {

    state = {
        from: '8:00',
        to: "18:00",
    }

    data = [
        {time: '08:00', title: 'Appointment Requested', description: ''},
        {
            time: '08:45', 
            title: 'Confirm Booking', 
            description: 'Yanto has requested your services, you can contact him to confirm',
            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
        },
        {
            time: '08:45', 
            title: 'Booking Accepted', 
            description: 'Yanto has accepted your request, please contact him to confirm',
            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
        },
      ]

    componentWillMount() {
        const params = this.props.navigation.state.params || {};
        console.log('booking details', params)
        this.props.navigation.setParams({ dismiss: this.goBack });
    }

    static navigationOptions = ({ navigation })=> {
        const params = navigation.state.params || {};
        console.log('booking details', params)
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

    renderDetail(rowData, sectionID, rowID) {
        console.log('---- row data ----', rowData)
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null
        if(rowData.description && rowData.imageUrl)
          desc = (
            <View style={{flexDirection:'column'}}>
                <View style={styles.descriptionContainer}>   
                    <Avatar
                        small
                        rounded
                        source={{uri: rowData.imageUrl}}
                        activeOpacity={0.7}
                    />
                <Text style={[styles.textDescription]}>{rowData.description}</Text>
                </View>
                <View flex={1} flexDirection="row" style={{ marginTop: 10, paddingRight: 10, marginLeft: -15}}>
                    {rowData.isTrainer && (
                        <Button
                            buttonStyle={{height: 30, padding: 0, width: 80}}
                            textStyle={{fontSize: 10}}
                            color="white"
                            backgroundColor="#ff6347"
                            rounded
                            title='Accept' />
                    )}
                    
                    <Button
                        buttonStyle={{height: 30, padding: 0, width: 80}}
                        textStyle={{fontSize: 10}}
                        outline
                        icon={{name: 'chat', color: 'rgb(45,156,219)'}}
                        color="rgb(45,156,219)"
                        rounded
                        title='Chat' />
                </View>
            </View>
            
          )
    
        return (
          <View style={{flex:1}}>
            {title}
            {desc}
          </View>
        )
    }

    render() {
      // Name of the Trainer
      // Price
      // Date
      // Time
      // Button Confirm and Pay 
      const params = this.props.navigation.state.params
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
                 {/* <View> */}
                    <Timeline
                        data={params.data}
                        renderDetail={this.renderDetail}
                        circleSize={20}
                        circleColor='rgb(45,156,219)'
                        lineColor='rgb(45,156,219)'
                        timeContainerStyle={{minWidth:52, marginTop: -5}}
                        timeStyle={{
                            textAlign: 'center',
                            // backgroundColor:'#ff9797',
                            color:'black',
                            padding:5,
                            //borderRadius:13
                        }}
                        descriptionStyle={{color:'gray'}}
                        options={{
                            style:{paddingTop:5}
                        }}
                        innerCircle={'dot'}
                        style={{ marginTop: 10, marginLeft: 15}}
                    />
                 {/* </View> */}
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