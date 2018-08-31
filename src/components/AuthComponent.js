import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import { Button } from 'react-native-elements'
import {
    TabNavigator,
    TabBarBottom,
    DrawerNavigator,
    StackNavigator,
    withNavigation } from 'react-navigation';
import { logOut } from '../helpers/api'
import SearchScreen from './screens/Search'
import ProfileScreen from './screens/Profile'
import HomeScreen from './screens/Home'
import ChatScreen from './screens/Chats'
import SearchResults from './screens/SearchResults'
import LogoutComponent from './LogoutComponent'
import DismissableStackNavigator from './DismissableStackNavigator';
import Schedule from './screens/Schedule';
import Agenda from './Agenda';
import CreateBooking from './screens/CreateBooking'
import ViewUser from './screens/ViewUser'
import BookingDetails from './screens/BookingDetails'


const tabNav = TabNavigator(
    {
        Home: {
            screen: StackNavigator({Home: HomeScreen}),
        },
        Profile: { screen: StackNavigator({Profile: ProfileScreen}) },
        Chat: { screen: StackNavigator({Chat: ChatScreen}) },
        Search: { screen: StackNavigator({Search: SearchScreen}) },
        
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                } else if (routeName === 'Profile') {
                    iconName = `ios-person${focused ? '' : '-outline'}`;
                } else if (routeName === 'Chat') {
                    iconName = `ios-chatbubbles${focused ? '' : '-outline'}`;
                } else if (routeName === 'Search') {
                    iconName = `ios-search${focused ? '' : '-outline'}`;
                }
                
    
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={20} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'rgb(45,156,219)',
            inactiveTintColor: 'gray',
            style: {
                backgroundColor: '#ffffff',
                height: 40,
                paddingTop: 5
             }
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
    
)

const DrawerNavigatorConfig = { 
    contentOptions: {
        onItemPress: function(route){
            console.log('route', route)
        }
    },
    activeTintColor: 'rgb(45,156,219)',
    inactiveTintColor: 'rgb(45,156,219)',
    style:{
        color: 'rgb(45,156,219)'
    }
}

const drawernav = DrawerNavigator({
    Account: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Account",
            drawerIcon: ({ tintColor }) => <Icon name="user" size={24} />
        },
    },
    Calendar: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Calendar",
            drawerIcon: ({ tintColor }) => <Icon name="calendar" size={24} />
        },
    },
    Availability: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Availability",
            drawerIcon: ({ tintColor }) => <Icon name="check-circle" size={24} />
        },
    },
    contactUs: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Contact Us",
            drawerIcon: ({ tintColor }) => <Icon name="envelope" size={24} />
        },
    },
    termsAndConditions: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Terms and Conditions",
            drawerIcon: ({ tintColor }) => <Icon name="book" size={24} />
        },
    },
    privacyPolicy: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Privacy Policy",
            drawerIcon: ({ tintColor }) => <Icon name="user-secret" size={24} />
        },
    },
    About: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "About",
            drawerIcon: ({ tintColor }) => <Icon name="info" size={24} />
        },
    },
    Feedback: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Feedback",
            drawerIcon: ({ tintColor }) => <Icon name="envelope-open" size={24} />
        },
    },
    Logout: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Logout",
            drawerIcon: ({ tintColor }) => <Ionicons name="ios-power" size={24} />
        },
    }
}, DrawerNavigatorConfig);

const ModalStackNavigator = StackNavigator({
        drawer:          { screen: drawernav },
        SearchResults: DismissableStackNavigator({screen: SearchResults}, {
            mode: 'modal',
        }),
        Schedule: DismissableStackNavigator({screen: Schedule}, {
            mode: 'modal',
        }),
        Agenda: DismissableStackNavigator({screen: Agenda}, {
            mode: 'modal',
        }),
        ViewUser: DismissableStackNavigator({screen: ViewUser}, {
            mode: 'modal',
        }),
        CreateBooking: DismissableStackNavigator({screen: CreateBooking}, {
            mode: 'modal',
        }),
        BookingDetails: DismissableStackNavigator({screen: BookingDetails}, {
            mode: 'modal',
        }),
    }, 
    {
        headerMode: 'none',
        mode:       'modal'
    });
// SearchResults: DismissableStackNavigator({screen: SearchResults}, {
    //   mode: 'modal', // Remember to set the root navigator to display modally.
    //   //headerMode: 'none', // This ensures we don't get two top bars.
    // })
//export default drawernav
export default ModalStackNavigator

