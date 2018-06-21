
import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { List, ListItem } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from 'react-native-vector-icons/MaterialIcons'
import IOSIcon from "react-native-vector-icons/Ionicons";
import { Button } from 'react-native-elements'
import { LogoutComponent } from '../AuthComponent'
import DatePicker from 'react-native-datepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSelect from 'react-native-multiple-select';
import moment from 'moment';
import { searcAppointments } from '../../reducer/search/actions'

  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
    {
        name: 'Tunde Ganiy',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      },
  ]

class SearchScreen extends React.Component {

    state = {

    }

    static navigationOptions = ({ navigation })=> ({
        headerLeft:(
            <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                <IOSIcon name="ios-arrow-back" size={30} />
            </TouchableOpacity>
            ),
        headerStyle: { paddingRight: 10, paddingLeft: 10 },
        title: 'Search Results',
    })
    

    submitSearch = () => {
        
    } 

    

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff'}}>
            {this.props.searchResults.length <= 0 ? null : (
                <List containerStyle={{marginBottom: 20}}>
                {
                    this.props.searchResults.map((l, i) => (
                        <ListItem
                            roundAvatar
                            avatarContainerStyle={{height: 80, width: 80}}
                            avatarStyle={{height: 80, width: 80}}
                            title={`${l._data.first_name} ${l._data.last_name}`}
                            subtitle={
                            <View style={{flex: 1, flexDirection: 'row', marginTop: -18, marginLeft: 100}}>
                                <View style={{flexDirection: 'column', marginLeft: 5, marginRight: 5}}>
                                    <Text style={styles.ratingText}>{l._data.account_type}</Text>
                                    <Text style={styles.ratingText}>4.5/5</Text>
                                </View>
                                <View style={{flexDirection: 'column', marginLeft: 8}}>
                                    <Text>£{l._data.price}</Text>
                                    <Text>154</Text>
                                </View>
                                {/* <View style={{flexDirection: 'column', marginLeft: 5, marginRight: 3}}>
                                    <Text style={styles.ratingText}>2018-05-29</Text>
                                    <Text style={styles.ratingText}>8.00am</Text>
                                </View> */}
                            </View>
                            }
                            avatar={l._data.avatar}
                        />
                    ))
                }
            </List>
            ) }
            </ScrollView>
        );
    }
}



styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      //paddingTop: 5
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    }
  })

const mapStateToProps = (state) => ({
    searchResults: state.search.searchResults
})

export default connect(mapStateToProps)(SearchScreen)