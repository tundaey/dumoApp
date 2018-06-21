import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { checkAuthStatus } from '../reducer/auth/actions'
import AuthComponent from './AuthComponent'
import Login from './Login'
import { getUserData, updateProfile } from '../reducer/profile/actions';
import { getProfile } from '../reducer/profile/selectors';

class AuthContainer extends React.Component {

    constructor(props){
        super();
        this.unsubscriber = null;
        this.state = {
            user: null,
        };
    }

    state = {
        user: null
    }

    componentDidMount() {
        // AsyncStorage.clear()
        //this.props.getUserData(firebase.auth().currentUser.uid)
        this.props.checkAuthStatus().then(loggedIn => {
            if(!loggedIn) this.props.navigation.navigate('Auth')
            if(loggedIn) {
                //console.log('uid', firebase.auth().currentUser.uid)
                //this.props.getUserData(firebase.auth().currentUser.uid)
                this.props.navigation.navigate('Update')
            }
        })
        // this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
        //     this.setState({ user });
        //     this.runfunction()
        //   }); 
        
    }

    componentWillUnmount() {
        // if (this.unsubscriber) {
        //   this.unsubscriber();
        // }
    }


    runfunction = ()=> {
        const { user } = this.state;
        console.log('container profile', this.props.profile)
        //make an api call to check if the profile is complete
        //if it is change the route to Update Profile screen
        //else change route to app
        //this.props.navigation.navigate(user === null ? 'Auth' : 'App')
        
        // if(!user) this.props.navigation.navigate('Auth')
        // if(user) {
        //     console.log('uid', firebase.auth().currentUser.uid)
        //     this.props.getUserData(firebase.auth().currentUser.uid)
        //     //this.props.navigation.navigate('Update')
        // }
    }

    render() {
        console.log('auth container profile', this.props)
        if(this.props.profile) {
            return this.props.profile.profileComplete 
            ? this.props.navigation.navigate('App') 
            : this.props.navigation.navigate('Update')
        }
        return (
            <ActivityIndicator /> 
        );
    }
}

const mapStateToProps = (state) => ({
    profile: getProfile(state)
})

export default connect(mapStateToProps, { getUserData, checkAuthStatus })(AuthContainer)
