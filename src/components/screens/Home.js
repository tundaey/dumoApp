import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/FontAwesome";
import IOSIcon from "react-native-vector-icons/Ionicons";
import LogoutComponent from '../LogoutComponent';
import { Button, Card, Avatar } from 'react-native-elements';
import { fetchBookings } from '../../reducer/bookings/actions';
import { getUserData } from '../../reducer/profile/actions';
import { getProfile, getProfileStatus } from '../../reducer/profile/selectors';
import { getBookings, getBookingsLoadingStatus, getBookingsError } from '../../reducer/bookings/selectors'
import moment from 'moment'
import StarRating from 'react-native-star-rating';
import _upperFirst from 'lodash/upperFirst'
import FromUser from './BookingsFromUser';
import GradientHeader from '../shared/GradientHeader';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const SecondRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);


class Bookings extends React.Component {

    state = {
        index: 0,
        routes: [
        { key: 'confirmed', title: 'Confirmed' },
        { key: 'pending', title: 'Pending' },
        { key: 'past', title: 'Past' },
        ],
    };

    componentDidMount() {

        this.props.fetchBookings(this.state.routes[0].key)
    }

    static navigationOptions = ({ navigation })=> ({
            header: props => <GradientHeader {...props} />,
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                paddingRight: 10, paddingLeft: 10,
            },
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    <IOSIcon color="rgb(45,156,219)"  name="ios-menu" size={30} />
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{ color: 'rgb(45,156,219)', fontWeight: '600'}}>Bookings</Text>
            ),
    })

    logOut = () => console.log('log ou tplacehilder')

    onViewBooking = (booking, key) => {
        const user_id = this.props.user._id;
        this.props.navigation.navigate('BookingDetails', { booking, user_id, key })
    }

    // acceptBooking = (booking, key) => {
    //     const user_id = this.props.user._id;
    //     this.props.navigation.navigate('BookingDetails', { booking, user_id, key })
    // }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'confirmed':
            return (
                <FromUser
                    bookings={this.props.bookings}
                    viewBooking={this.onViewBooking}
                    loading={this.props.fromYouBookingsLoading}
                    my_key={'confirmed'}
                />
            )
            case 'pending':
            return (
                <FromUser
                    bookings={this.props.bookings}
                    viewBooking={this.onViewBooking}
                    loading={this.props.fromYouBookingsLoading}
                    my_key={'pending'}
                />
            );
            default:
            return null;
        }

    }

    render() {
        return (
        <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={props =>
                <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'rgb(45,156,219)', width: 80, marginLeft: 40 }}
                tabStyle={{width: 150}}
                style={{ backgroundColor: 'white'}}
                //labelStyle={{ fontWeight: '800', color:'#dcdbe3'}}
                labelStyle={{ fontWeight: '800', color:'#000000'}}
                getLabelText={({ route }) => route.title}
                />
            }
            onIndexChange={index => this.setState({ index }, 
                () => this.props.fetchBookings(this.state.routes[index].key))}
            initialLayout={{ width: Dimensions.get('window').width }}
        />
        );
    }
}

const mapStateToProps = state => ({
    bookings: getBookings(state),
    fromYouBookingsLoading: getBookingsLoadingStatus(state),
    fromYouBookingsError: getBookingsError(state),
    user: getProfile(state)
})

export default connect(mapStateToProps, {
    fetchBookings,
})(Bookings)