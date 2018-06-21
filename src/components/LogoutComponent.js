import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import { logout} from '../reducer/auth/actions'

class LogoutComponent extends React.Component {

  onLogout = ()=> {
      this.props.logout().then(()=> {
          console.log('logout')
          this.props.navigation.navigate("Auth")
      })
  }

  render() {
      return (
          <Icon
              raised
              name='sign-out'
              size={28}
              type='font-awesome'
              color='#f50'
              onPress={this.onLogout} 
          />
      )
  }
}

export default connect(null, { logout })(LogoutComponent)