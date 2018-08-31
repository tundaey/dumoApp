import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import LogoutComponent from '../LogoutComponent';
import { Button } from 'react-native-elements'

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation })=> ({
      headerRight:(
          <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
              <IOSIcon color="white" containerStyle={{marginRight: 10}} name="ios-menu" size={30} />
          </TouchableOpacity>
      ),
      headerLeft: <LogoutComponent navigation={navigation}/>,
      headerTitle: (
        <Image
            source={require('./weightlifting.png')}
            style={{marginBottom: 10}}
        />
      ),
      headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff' },
  })

  render() {
      return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Chat Screen</Text>
          <Button
          title="Go to Details"
          onPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'First Details',
              });
          }}
          />
      </View>
      );
  }
}

export default connect()(ChatScreen)