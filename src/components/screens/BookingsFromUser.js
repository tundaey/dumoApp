import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import LogoutComponent from '../LogoutComponent';
import { Button, Card, Avatar } from 'react-native-elements';
import moment from 'moment'
import StarRating from 'react-native-star-rating';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


const FromUser = props => (
    props.loading 
    ? (
      <View flex={1} justifyContent='center' alignContent='center' >
        <ActivityIndicator flex={1} size="large" color="#0000ff" />
      </View>
    )
    : (
      <View style={{
        flex: 1,
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        }}>
        { props.bookings.map(booking => (
            <TouchableOpacity key={booking._id} onPress={()=> props.viewBooking(booking)}>
              <Card
               containerStyle={{padding: 0}}>
                <View flexDirection="row" style={{padding: 10}}>
                  <View style={{marginRight: 15}}>
                      <Avatar
                          small
                          rounded
                          source={{uri: booking.trainer.avatar}}
                          activeOpacity={0.7}
                      />
                  </View>
                  <View>
                      <Text style={{fontWeight: '700'}}>
                          {`${booking.trainer.first_name} ${booking.trainer.last_name}`}
                      </Text>
                      <View style={{paddingRight: 35}}>
                          <Text style={{fontWeight: '700', color:'rgb(45,156,219)'}}>
                              Apartment Puri Parkview, Pessangrahan, BB Kenbangan, Jakarta Barat 11620, Indonesia
                          </Text>
                      </View>
                  </View>
                </View>
                <View flexDirection="row" 
                  style={{
                      marginTop: 10, 
                      justifyContent: 'space-between',
                      borderTopWidth: 0.2,
                      backgroundColor: '#f9fafc',
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingTop: 15,
                      paddingBottom: 15
                  }}>
                    <View flexDirection="column">
                      <Text style={{fontWeight: '800', color:'#dcdbe3'}}>date</Text>
                      <Text style={{fontWeight: '700'}}>
                          {moment(booking.appointment.day).format('MMM D YYYY')}
                      </Text>
                    </View>
                    <View flexDirection="column">
                      <Text style={{fontWeight: '800', color:'#dcdbe3'}}>price</Text>
                      <Text style={{fontWeight: '700'}}>{`£${booking.transaction.amount}`}</Text>
                    </View>
                    <View flexDirection="column">
                      <Text style={{fontWeight: '800', color:'#dcdbe3'}}>status</Text>
                      <Text style={{fontWeight: '700', color: 'red'}}>Pending</Text>
                    </View>
                    <View flexDirection="column">
                      <Text style={{fontWeight: '800', color:'#dcdbe3'}}>time</Text>
                      <Text style={{fontWeight: '700'}}>
                          {booking.time}
                      </Text>
                    </View>
                </View>
              </Card>
            </TouchableOpacity>
        ))}
    </View>
    )
)

export default FromUser;