import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Avatar, Text, FormLabel, FormInput, Icon, CheckBox } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Modal from "react-native-modal";
// import firebase from 'react-native-firebase';
import { getUserData, updateProfile } from '../reducer/profile/actions';
import { getUserDataSelector, getProfileStatus, getProfile } from '../reducer/profile/selectors';
import SelectInput from 'react-native-select-input-ios';

const gender_radio_props = [
    {label: 'Male', value: 'male' },
    {label: 'Female', value: 'female' },
    {label: 'Other', value: 'other' },
];

const account_type_props = [
    {label: 'Trainer', value: 'trainer' },
    {label: 'Buddy', value: 'buddy' },
    // {label: 'Both', value: 'both' },
  ];

const ProfileView = props => (
    <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
        <View style={{marginLeft: 'auto', marginRight:'auto', marginTop: 30}}>
            <Avatar
                large
                rounded
                source={{uri: props.avatar}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
            />
            <Text style={{marginTop: 10, fontWeight:'bold', color: '#63B8FF'}} onPress={this.changePhoto}>
                Change Photo
            </Text>
            {props.displayModal()}
        </View>
        <View>
            
            <FormLabel>First Name</FormLabel>
            <FormInput
                value={props.first_name}
                onChangeText={(e)=> props.onInputChange(e, 'first_name')} 
            />
            <FormLabel>Last Name</FormLabel>
            <FormInput
                value={props.last_name} 
                onChangeText={(e)=> props.onInputChange(e, 'last_name')} 
            />
            <FormLabel>Nickname</FormLabel>
            <FormInput
                value={props.nickname}  
                onChangeText={(e)=> props.onInputChange(e, 'nickname')} 
            />
            <FormLabel>Phone</FormLabel>
            <FormInput
                value={props.phone}
                keyboardType="phone-pad"  
                onChangeText={(e)=> props.onInputChange(e, 'phone')} 
            />
            { props.account_type === 'buddy' ? null : (
                <View>
                    <FormLabel>Billing(per 30 minutes)</FormLabel>
                    <FormInput
                        keyboardType="numeric"  
                        onChangeText={(e)=> props.onInputChange(e, 'price')} 
                    />
                </View>
            ) }
           <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <FormLabel>Account Type</FormLabel>
                    <View style={{marginTop: 10}}>
                        <RadioForm
                            formHorizontal={true}
                            animation={true}
                        >
                            {account_type_props.map((obj, i) => {
                                //var that = this;
                                const is_selected = props.accountTypeIndex == i;
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
                                        props.setAccountType(value, index)
                                    }}
                                    />
                                </View>
                                )
                            })}
                        </RadioForm>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <FormLabel>Gender</FormLabel>
                    <View style={{marginTop: 10}}>
                        <RadioForm
                            formHorizontal={true}
                            animation={true}
                        >
                            {gender_radio_props.map((obj, i) => {
                                //var that = this;
                                const is_selected = props.genderIndex == i;
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
                                        props.setGender(value, index)
                                    }}
                                    />
                                </View>
                                )
                            })}
                        </RadioForm>
                    </View>
                </View>
           </View>
            
            {/* <FormLabel>Account Type</FormLabel> */}
            {/* <SelectInput
              value={props.account_type}
              options={props.getPickerOptions()}
              onCancelEditing={() => console.log('onCancel')}
              onSubmitEditing={(e) => props.onInputChange(e, 'account_type')}
              style={[styles.selectInput, styles.selectInputSmall]}
            /> */}
        </View>
    </ScrollView>
)

class UpdateProfile extends React.Component {

    state = {
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        account_type: 'trainer',
        gender: 'male',
        price: 0,
        genderIndex: 0,
        accountTypeIndex: 0,
        first_name: '',
        last_name: '',
        nickname: '',
        phone: '',
    }

    setGender = (value, index) => {
        this.setState({gender:value})
        this.setState({genderIndex: index});
    }

    setAccountType = (value, index) => {
        this.setState({account_type:value})
        this.setState({accountTypeIndex: index});
    }

    getPickerOptions = () => [
        { value: 'buddy', label: 'Buddy'},
        { value: 'trainer', label: 'Trainer'},
      ];

    componentDidMount() {
        console.log('component did mount')
        this.props.getUserData()
    }

    componentWillMount() {
        this.props.navigation.setParams({ submitForm: this.submitForm });
    }

    onInputChange = (e, field) => {
        console.log('account type', e, field)
        this.setState({
            [field]: e
        })
    }

    submitForm = () => {
        const { first_name, last_name, nickname, avatar, price, phone, gender, account_type } = this.state;
        const payload = {
            first_name,
            last_name,
            nickname,
            avatar,
            price,
            phone,
            gender,
            account_type,
            profileComplete: true,
            //...this.props.profile
        }
        console.log('payload', payload)
        this.props.updateProfile(payload)
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: 'Update Profile',
            headerRight: (
                <Icon
                    containerStyle={{marginRight: 10}}
                    name='check'
                    type='font-awesome'
                    color='#63B8FF'
                    onPress={() => params.submitForm()} 
                />
            ),
            headerLeft: (
                <Icon
                    containerStyle={{marginLeft: 10}}
                    name='times'
                    type='font-awesome'
                    color='black'
                    onPress={() => console.log('hello')} 
                />
            ),
        }
    };

    changePhoto = ()=> {
        console.log('change photo')
        this.setState({isVisible: true})
    }

    displayModal = ()=> (
        <Modal style={{height: 20, marginTop: 20}} isVisible={this.state.isVisible}>
          <View style={{ flex: 1, backgroundColor: '#fff', borderRadius:20, height: 20 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
    )

    render() {
        
        return (
            this.props.loading 
            ? <View><Text>Loading</Text></View>
            : this.props.profile.profileComplete 
                ? this.props.navigation.navigate(this.state.account_type === 'buddy' ? 'Search' : 'Profile' ) 
                : (
                    <ProfileView
                        setGender={this.setGender}
                        setAccountType={this.setAccountType}
                        genderIndex={this.state.genderIndex}
                        accountTypeIndex={this.state.accountTypeIndex}
                        first_name={this.state.first_name}
                        last_name={this.state.last_name}
                        nickname={this.state.nickname}
                        phone={this.state.phone}
                        account_type={this.state.account_type}
                        avatar={this.state.avatar}
                        getPickerOptions={this.getPickerOptions}
                        onInputChange={this.onInputChange}
                        displayModal={this.displayModal}
                    />
                ) 
            )
    }
}

const mapStateToProps = (state) => ({
    loading: getProfileStatus(state),
    profile: getProfile(state),
})

export default connect(mapStateToProps, { getUserData, updateProfile })(UpdateProfile)


const styles = StyleSheet.create({
    checkButton: {
        marginRight: 5 
    },
    radioStyle: {
        //borderRightWidth: 1,
        borderColor: '#2196f3',
        paddingRight: 10,
        marginLeft: 10,
      },
})