import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/FontAwesome";
//import MIcon from 'react-native-vector-icons/MaterialIcons'
import IOSIcon from "react-native-vector-icons/Ionicons";
import { Button, FormInput, FormLabel } from 'react-native-elements'
import { LogoutComponent } from '../LogoutComponent'
import DatePicker from 'react-native-datepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSelect from 'react-native-multiple-select';
import moment from 'moment';
import { searcAppointments } from '../../reducer/search/actions'
import CustomDatePicker from '../shared/CustomDatePicker';
import CustomTimePicker from '../shared/CustomTimePicker';
import CustomRadio from '../shared/CustomRadio';
import CustomMultiSlider from '../shared/CustomSlider';


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
        date: null, //moment(new Date, 'YYYY-MM-DD'),//"2016-05-15",
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

    componentWillMount() {
        this.props.navigation.setParams({ dismiss: this.goBack });
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        console.log('this',params)
        return {
            headerLeft:(
                <TouchableOpacity onPress={() => params.dismiss()}>
                    <IOSIcon name="ios-arrow-back" size={30} />
                </TouchableOpacity>
                ),
            headerRight: (
                <TouchableOpacity onPress={() => params.submitSearch()}>
                    <IOSIcon name="ios-checkmark" size={50} />
                </TouchableOpacity>
            ),
            headerStyle: { paddingRight: 10, paddingLeft: 10 },
            title: 'Filter Results',
        }
    }

    setDate = () => {

    }

    goBack = () => {
        console.log('hey', this.props);
        const goBack = this.props.screenProps.dismiss()
        console.log('go back', goBack);
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

    setDate = (date) => {
        console.log('set date')
        this.setState({date: date})
    }

    setTime = (time) => {
        this.setState({time: time})
    }

    setWhatValue = (value, idx) => {
        this.setState({what:value})
        this.setState({whatIndex: idx});
    }

    setGenderValue = (value, idx) => {
        this.setState({gender:value})
        this.setState({genderIndex: idx});
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 30, backgroundColor: '#fff' }}>
                <CustomDatePicker
                    date={this.state.date}
                    mode="date"
                    format="YYYY-MM-DD"
                    setDate={this.setDate} />
                 <CustomTimePicker
                    date={this.state.time}
                    mode="datetime"
                    format="HH:mm"
                    setTime={this.setDate} />
                 <CustomRadio
                    data={what_radio_props}
                    index={this.state.whatIndex}
                    setValue={this.setWhatValue}
                    title={'What'}/>
                 <CustomRadio
                    data={gender_radio_props}
                    index={this.state.genderIndex}
                    setValue={this.setGenderValue}
                    title={'Gender'}/>
                 <CustomMultiSlider
                    title={'Price'}
                    type={'£'}
                    position={'before'}
                    values={[this.state.priceStart, this.state.priceEnd]}
                    min={10}
                    max={200}
                    step={10}
                    sliderLength={280}
                    onValuesChangeStart={this.priceValuesChangeStart}
                    onValuesChange={this.priceValuesChange}
                    onValuesChangeFinish={this.priceValuesChangeFinish}
                 />
                 <Button
                    style={{marginTop: 10, marginBottom: 10}}
                    raised
                    borderRadius={20}
                    loading={this.props.authPending}
                    onPress={() => this.props.navigation.navigate("SearchResults")}
                    onLongPress={() => this.props.navigation.navigate("SearchResults")}
                    backgroundColor={'#000'}
                    title='Search' 
                />
            </View>
        )
    }

    // render() {
    //     return (
    //         <ScrollView style={{ flex: 1, padding: 30, backgroundColor: '#fff' }}>
    //             <View style={styles.condition}>
    //                 <Text style={styles.condition_title}>{'Date'.toUpperCase()}</Text>
    //                 <CustomDatePicker
    //                     date={this.state.date}
    //                     mode="date"
    //                     format="YYYY-MM-DD"
    //                     setDate={this.setDate} />
    //             </View>
    //             <View style={styles.condition}>
    //                 <Text style={styles.condition_title}>{'Time'.toUpperCase()}</Text>
    //                 <CustomTimePicker
    //                     date={this.state.time}
    //                     mode="datetime"
    //                     format="HH:mm"
    //                     setTime={this.setDate} />
                        
    //             </View>
    //             <View style={styles.condition}>
    //                 <Text style={styles.condition_title_radio}>{'What'.toUpperCase()}</Text>
    //                 <CustomRadio
    //                     data={what_radio_props}
    //                     index={this.state.whatIndex}
    //                     setValue={this.setWhatValue} />
    //             </View>
    //             <View style={styles.condition}>
    //                 <Text style={styles.condition_title_radio}>{'Gender'.toUpperCase()}</Text>
    //                 <CustomRadio
    //                     data={gender_radio_props}
    //                     index={this.state.genderIndex}
    //                     setValue={this.setGenderValue} />
    //             </View>
    //             <View >
    //                 <Text style={styles.condition_title_slider}>{'Price'.toUpperCase()}</Text>
    //                 <View style={{marginLeft: 15}}>
    //                     <MultiSlider
    //                         values={[this.state.priceStart, this.state.priceEnd]}
    //                         min={10}
    //                         max={200}
    //                         step={10}
    //                         sliderLength={280}
    //                         onValuesChangeStart={this.priceValuesChangeStart}
    //                         onValuesChange={this.priceValuesChange}
    //                         onValuesChangeFinish={this.priceValuesChangeFinish}
    //                     />
    //                 </View>
    //                 <Text style={{marginTop: -23, marginBottom: 20, }}>
    //                     £{this.state.priceStart} - £{this.state.priceEnd}
    //                 </Text>
    //             </View>
    //             <View>
    //                 <Text style={styles.condition_title_slider}>{'Distance'.toUpperCase()}</Text>
    //                 <View style={{marginLeft: 15, marginBottom: -20}}>
    //                     <MultiSlider
    //                             values={[this.state.distance]}
    //                             min={100}
    //                             max={2000}
    //                             step={50}
    //                             sliderLength={280}
    //                             onValuesChangeStart={this.distanceSliderValuesChangeStart}
    //                             onValuesChange={this.distanceSliderValuesChange}
    //                             onValuesChangeFinish={this.distanceSliderValuesChangeFinish}
    //                     />
    //                     <Text style={{marginTop: -23, marginBottom: 20, marginLeft: -15}}>{this.state.distance}m</Text>
    //                 </View>
    //             </View>
    //             {/* <View style={styles.condition}>
    //                 <Text style={styles.condition_title_radio}>{'Search Centre'.toUpperCase()}</Text>
    //                 <RadioForm
    //                     formHorizontal={true}
    //                     animation={true}
    //                 >
    //                     {search_centre_radio_props.map((obj, i) => {
    //                         //var that = this;
    //                         var is_selected = this.state.searchCentreIndex == i;
    //                         return (
    //                         <View key={i} style={styles.radioButtonWrap}>
    //                             <RadioButton
    //                             isSelected={is_selected}
    //                             obj={obj}
    //                             index={i}
    //                             labelHorizontal={false}
    //                             buttonColor={'#2196f3'}
    //                             labelColor={'#000'}
    //                             style={[i !== search_centre_radio_props.length-1 && styles.radioStyle]}
    //                             onPress={(value, index) => {
    //                                 this.setState({search_centre:value})
    //                                 this.setState({searchCentreIndex: index});
    //                             }}
    //                             />
    //                         </View>
    //                         )
    //                     })}
    //                 </RadioForm>
    //             </View> */}
                
    //             {/* <View>
    //                 <MultiSelect
    //                     hideTags
    //                     items={items}
    //                     uniqueKey="id"
    //                     ref={(component) => { this.multiSelect = component }}
    //                     onSelectedItemsChange={this.onSelectedItewmsChange}
    //                     selectedItems={this.state.selectedItems}
    //                     selectText="Select Skills"
    //                     searchInputPlaceholderText="Search Skills..."
    //                     onChangeInput={ (text)=> console.log(text)}
    //                     altFontFamily="System"
    //                     tagRemoveIconColor="#CCC"
    //                     tagBorderColor="#CCC"
    //                     tagTextColor="#CCC"
    //                     selectedItemTextColor="#CCC"
    //                     selectedItemIconColor="#CCC"
    //                     itemTextColor="#000"
    //                     displayKey="name"
    //                     searchInputStyle={{ color: '#CCC' }}
    //                     submitButtonColor="#CCC"
    //                     submitButtonText="Submit"
    //                 />
    //                 <View>
    //                     { this.multiselect ? this.multiselect.getSelectedItemsExt() : null }
    //                 </View>
    //             </View> */}
    //   </ScrollView>
    //     );
    // }
}

const styles = StyleSheet.create({
    condition: {
        //marginTop: 10,
        marginBottom: 10,
        flexDirection: 'column',
    },
    condition_title: {
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    condition_title_radio: {
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    condition_title_slider: {
        marginBottom: 25,
        marginLeft: 5,
        marginTop: 5,
        //marginRight: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    radioStyle: {
        // borderRightWidth: 1,
        // borderColor: '#2196f3',
        paddingRight: 10,
        marginLeft: -10,
      },

})


export default SearchResults