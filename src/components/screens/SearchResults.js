import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
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
//import SectionedMultiSelect from 'react-native-sectioned-multi-select';
//import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const what_radio_props = [
    {label: 'Trainer', value: 'trainer' },
    {label: 'Buddy', value: 'buddy' },
    {label: 'Both', value: 'both' },
  ];

const gender_radio_props = [
    {label: 'Male', value: 'male' },
    {label: 'Female', value: 'female' },
    {label: 'Either', value: 'either' },
];

const search_centre_radio_props = [
    {label: 'Postcode', value: 'postcode' },
    {label: 'My Location', value: 'location' },
];



const items = [
    {  
      name: "Fruits",
      id: 0,
      //children: []
    },
    {
        name: "Apple",
        id: 10,
      },{
        name: "Strawberry",
        id: 17,
      },{
        name: "Pineapple",
        id: 13,
      },{
        name: "Banana",
        id: 14,
      },{
        name: "Watermelon",
        id: 15,
      },{
        name: "Kiwi fruit",
        id: 16,
      }
  ]


  class SearchResults extends React.Component {

    state = {
        date: moment(new Date, 'YYYY-MM-DD'),//"2016-05-15",
        time: "8:00",
        multiSliderValue: [3, 7],
        whatIndex: 0,
        genderIndex: 0,
        searchCentreIndex: 0,
        priceStart: 10,
        priceEnd: 150,
        distance: 100,
        priceChanging: false,
        distanceSliderChanging: false,
        priceValue: [5],
        selectedItems: [],
        minuteInterval: 15,
    }

    static navigationOptions = ({ navigation })=> ({
        headerLeft:(
            <TouchableOpacity onPress={() => NavigationActions.back({key: 'Profile'})}>
                <IOSIcon name="ios-menu" size={30} />
            </TouchableOpacity>
            ),
        headerStyle: { paddingRight: 10, paddingLeft: 10 },
        headerRight: <LogoutComponent navigation={navigation}/>
    })

    setDate = () => {

    }


    onSelectedItemsChange = selectedItems => {
        console.log('selected items', selectedItems)
        this.setState({ selectedItems });
    };

    priceValuesChangeStart = () => {
        this.setState({
            priceChanging: true,
        });
    }
    
    priceValuesChange = (values) => {
        console.log('values', values)
        let newValues = [0];
        newValues[0] = values[0];
        this.setState({
            priceStart: values[0],
            priceEnd: values[1],
        });
    }
    
    priceValuesChangeFinish = () => {
        this.setState({
            priceChanging: false,
        });
    }

    distanceSliderValuesChangeStart = () => {
        this.setState({
            distanceSliderChanging: true,
        });
    }
    
    distanceSliderValuesChange = (values) => {
        console.log('values', values)
        let newValues = [0];
        newValues[0] = values[0];
        this.setState({
            distance: values[0],
        });
    }
    
    distanceSliderValuesChangeFinish = () => {
        this.setState({
            distanceSliderChanging: false,
        });
    }

    submitSearch = () => {
        console.log('submit search', this.state)
        const params = {
            date: moment(this.state.date).format('YYYY-MM-DD'),
            time: this.state.time
        }
        this.props.dispatch(searcAppointments(params))
        this.props.navigation.navigate('SearchResults') 
        
    } 

    render() {
        console.log('results', this.props.searchResults)
        return (
            <ScrollView style={{ flex: 1, padding: 30 }}>
            <View style={styles.condition}>
                <Text style={styles.condition_title}>Date</Text>
                <DatePicker
                    style={{width: 320}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                        //maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                </View>
                <View style={styles.condition}>
                    <Text style={styles.condition_title}>Time</Text>
                    <DatePicker
                        style={{width: 320}}
                        date={this.state.time}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        mode="datetime"
                        format="HH:mm"
                        minuteInterval={30}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        is24Hour={false}
                        onDateChange={(time, i) => { console.log('time selected', time, i),this.setState({time: time});}}
                    />
                </View>
                <View style={styles.condition}>
                    <Text style={styles.condition_title_radio}>What</Text>
                    <RadioForm
                        formHorizontal={true}
                        animation={true}
                    >
                        {what_radio_props.map((obj, i) => {
                            //var that = this;
                            var is_selected = this.state.whatIndex == i;
                            return (
                            <View key={i} style={styles.radioButtonWrap}>
                                <RadioButton
                                isSelected={is_selected}
                                obj={obj}
                                index={i}
                                labelHorizontal={false}
                                buttonColor={'#2196f3'}
                                labelColor={'#000'}
                                style={[i !== what_radio_props.length-1 && styles.radioStyle]}
                                onPress={(value, index) => {
                                    this.setState({what:value})
                                    this.setState({whatIndex: index});
                                }}
                                />
                            </View>
                            )
                        })}
                    </RadioForm>
                </View>
                <View style={styles.condition}>
                    <Text style={styles.condition_title_radio}>Gender</Text>
                    <RadioForm
                        formHorizontal={true}
                        animation={true}
                    >
                        {gender_radio_props.map((obj, i) => {
                            //var that = this;
                            var is_selected = this.state.genderIndex == i;
                            return (
                            <View key={i} style={styles.radioButtonWrap}>
                                <RadioButton
                                isSelected={is_selected}
                                obj={obj}
                                index={i}
                                labelHorizontal={false}
                                buttonColor={'#2196f3'}
                                labelColor={'#000'}
                                style={[i !== gender_radio_props.length-1 && styles.radioStyle]}
                                onPress={(value, index) => {
                                    this.setState({gender:value})
                                    this.setState({genderIndex: index});
                                }}
                                />
                            </View>
                            )
                        })}
                    </RadioForm>
                </View>
                <View >
                    <Text style={styles.condition_title_slider}>Price</Text>
                    <View style={{marginLeft: 15}}>
                        <MultiSlider
                            values={[this.state.priceStart, this.state.priceEnd]}
                            min={10}
                            max={200}
                            step={10}
                            sliderLength={280}
                            onValuesChangeStart={this.priceValuesChangeStart}
                            onValuesChange={this.priceValuesChange}
                            onValuesChangeFinish={this.priceValuesChangeFinish}
                        />
                    </View>
                    <Text style={{marginTop: -23, marginBottom: 20, }}>
                        £{this.state.priceStart} - £{this.state.priceEnd}
                    </Text>
                </View>
                <View>
                    <Text style={styles.condition_title_slider}>Distance</Text>
                    <View style={{marginLeft: 15, marginBottom: -20}}>
                        <MultiSlider
                                values={[this.state.distance]}
                                min={100}
                                max={2000}
                                step={50}
                                sliderLength={280}
                                onValuesChangeStart={this.distanceSliderValuesChangeStart}
                                onValuesChange={this.distanceSliderValuesChange}
                                onValuesChangeFinish={this.distanceSliderValuesChangeFinish}
                        />
                        <Text style={{marginTop: -23, marginBottom: 20, marginLeft: -15}}>{this.state.distance}m</Text>
                    </View>
                </View>
                <View style={styles.condition}>
                    <Text style={styles.condition_title_radio}>Search Centre</Text>
                    <RadioForm
                        formHorizontal={true}
                        animation={true}
                    >
                        {search_centre_radio_props.map((obj, i) => {
                            //var that = this;
                            var is_selected = this.state.searchCentreIndex == i;
                            return (
                            <View key={i} style={styles.radioButtonWrap}>
                                <RadioButton
                                isSelected={is_selected}
                                obj={obj}
                                index={i}
                                labelHorizontal={false}
                                buttonColor={'#2196f3'}
                                labelColor={'#000'}
                                style={[i !== search_centre_radio_props.length-1 && styles.radioStyle]}
                                onPress={(value, index) => {
                                    this.setState({search_centre:value})
                                    this.setState({searchCentreIndex: index});
                                }}
                                />
                            </View>
                            )
                        })}
                    </RadioForm>
                </View>
                
                <View>
                    <MultiSelect
                        hideTags
                        items={items}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="Select Skills"
                        searchInputPlaceholderText="Search Skills..."
                        onChangeInput={ (text)=> console.log(text)}
                        //altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                    <View>
                        { this.multiselect ? this.multiselect.getSelectedItemsExt() : null }
                    </View>
                </View>

                <Button
                    style={{marginTop: 10}}
                    raised
                    borderRadius={20}
                    loading={this.state.loading}
                    onPress={this.submitSearch}
                    onLongPress={this.submitSearch}
                    backgroundColor={'#FF6347'}
                    title='Search' />
            
      </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    condition: {
        //marginTop: 10,
        marginBottom: 10,
        //flexDirection: 'row'
    },
    condition_title: {
        marginTop: 15,
        marginRight: 10,
    },
    condition_title_radio: {
        marginTop: 10,
        marginRight: 10,
    },
    condition_title_slider: {
        marginBottom: 15,
        marginLeft: 5,
    },
    radioStyle: {
        // borderRightWidth: 1,
        // borderColor: '#2196f3',
        paddingRight: 10
      },

})

const mapStateToProps = (state) => ({
    searchResults: state.search.searchResults
})

export default connect(mapStateToProps)(SearchResults)