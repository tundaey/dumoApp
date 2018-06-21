import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import { Button } from 'react-native-elements'
import { TabNavigator, TabBarBottom, DrawerNavigator, StackNavigator } from 'react-navigation';
import { logOut } from '../helpers/api'
import SearchScreen from './screens/Search'
import ProfileScreen from './screens/Profile'
import HomeScreen from './screens/Home'
import ChatScreen from './screens/Chats'
import SearchResults from './screens/SearchResults'
import LogoutComponent from './LogoutComponent'


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
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
    
)

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
    }
}, { contentOptions: {
    onItemPress: function(route){
        console.log('route')
    }
}});



export default drawernav

