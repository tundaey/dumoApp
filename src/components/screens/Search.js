import React from 'react';
import { Header } from 'react-navigation';
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    Picker,
    PickerIOS,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Dimensions } from 'react-native';
import { connect } from 'react-redux'
import _capitalize from 'lodash/capitalize'
import { NavigationActions } from 'react-navigation'
import { List, ListItem, Button, Card, Avatar, Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from 'react-native-vector-icons/MaterialIcons'
import IOSIcon from "react-native-vector-icons/Ionicons";
import LogoutComponent  from '../LogoutComponent'
import DatePicker from 'react-native-datepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSelect from 'react-native-multiple-select';
import moment from 'moment';
import { searchAppointments, getUsers } from '../../reducer/search/actions'
import StarRating from 'react-native-star-rating';
import { getCurrencyValue } from '../../helpers/utils'
import LinearGradient from 'react-native-linear-gradient';

const GradientHeader = props => (
    <View style={{ backgroundColor: '#eee', marginBottom: 60 }}>
        <LinearGradient
          start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}} locations={[0.0, 1.0]}
          colors={['#fff', '#fff']}
          style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
        >
          <Header {...props} />
        </LinearGradient>
      </View>
    )
  
class SearchScreen extends React.Component {

    state = {

    }

    componentDidMount() {
        this.props.getUsers()
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
        // headerLeft: <LogoutComponent navigation={navigation}/>,
        headerTitle: (
            <Text style={{ color: 'rgb(45,156,219)', fontWeight: '600'}}>Search</Text>
        ),
    })
    

    submitSearch = () => {
        
    } 

    filterAppointments = () => {
        console.log('filter results')
        //this.props.navigation.navigate("SearchResults")
    }

    goToUserPage = item => {
        console.log('go to user page', item)
        this.props.navigation.navigate("ViewUser", { user: item })
    }

    renderItem(item, index, goToUserPage) {
        return (
        <TouchableOpacity onPress={() => goToUserPage(item)}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                margin: 15,
                minWidth: 150,
                maxWidth: 203,
                height: 204,
                maxHeight:204,
                backgroundColor: '#CCC',
            }}
        >
            <LinearGradient colors={['#2ec0de', '#68e0cf']}
                style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <Avatar
                    large
                    rounded
                    source={{uri: item.avatar}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
               
                <StarRating
                    disabled={false}
                    starSize={15}
                    maxStars={5}
                    rating={3}
                    fullStarColor={'#fff'}
                    containerStyle={{ paddingVertical: 10 }}
                />
                <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{fontSize: 12}}>{`${item.first_name} ${item.last_name}`}</Text>
                        <Text style={{fontSize: 10, paddingTop: 5, color: 'gray'}}>{'London'}</Text>
                    </View>
                    <View style={{padding: 10, justifyContent: 'space-between', alignItems: 'center', flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon
                                name='sword-cross'
                                type='material-community'
                                size={12}
                                color={'grey'}
                            />
                            <Text style={{fontSize:10, color: 'grey', marginTop: 2.5}}>
                                {_capitalize(item.account_type)}
                            </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon
                                name='ios-pricetag-outline'
                                type='ionicon'
                                size={14}
                                color={'grey'}
                            />
                            <Text style={{fontSize:10, color: 'grey'}}>{getCurrencyValue(item.price)}</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon
                                name='dumbbell'
                                type='material-community'
                                size={14}
                                color={'grey'}
                            />
                            <Text style={{fontSize:10, color: 'grey'}}>{150}</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
        </TouchableOpacity>
        )
    }

    render () {
        return (
            <View>
                <View>
                    <Button
                        style={{marginTop: 10, marginBottom: 10}}
                        raised
                        borderRadius={20}
                        loading={this.props.authPending}
                        onPress={() => this.props.navigation.navigate("SearchResults")}
                        onLongPress={() => this.props.navigation.navigate("SearchResults")}
                        backgroundColor={'#000'}
                        title='Filter Results' />
                </View>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.props.searchResults}
                    renderItem={({ item, index }) => this.renderItem(item, index, this.goToUserPage)}
                />
            </View>
            
        );
    }
}



const styles = StyleSheet.create({
    list: {
        //justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 0,
    },
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

export default connect(mapStateToProps, { searchAppointments, getUsers })(SearchScreen)