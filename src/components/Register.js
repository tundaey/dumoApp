import React from 'react';
import { StyleSheet, Platform, Image, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, SocialIcon, Text, FormValidationMessage, CheckBox } from 'react-native-elements'
import { connect } from 'react-redux'
import { register } from '../reducer/auth/actions'
import { signInWithEmail, signUpWithEmailAndPassword } from '../helpers/api'
import SelectInput from 'react-native-select-input-ios';

class Register extends React.Component {
    state = {
        email: '',
        password: '',
        account_type: 'buddy',
        loading: false,
        error: '',
    }
  
    componentDidMount() {
      // firebase things?
      console.log('user did mount', this.props.user)
    }

    onInputChange = (e, field) => {
        this.setState({
            [field]: e
        })
    }

    onRegister = ()=> {
        const emailError = this.state.email === '' ? true : false
        const passwordError = this.state.password === '' ? true : false
        const nameError = this.state.name === '' ? true : false

        this.setState({
            emailError,
            passwordError,
            nameError,
        })

        if(!emailError && !passwordError) {
            this.setState({loading: true})
            const { email, password, account_type } = this.state;
            this.props.register(email, password, account_type)
            .then((response)=> {
                console.log('authed user', response)
                if(response.success) {
                    // authSuccess(user);
                    this.props.navigation.navigate('Update')
                }else{
                    this.setState({error: response.error, loading: false})
                }
            })
        }
        
    }

    goToLogin = ()=> this.props.navigation.navigate('Auth')

    getPickerOptions = () => [
          { value: 'buddy', label: 'Buddy'},
          { value: 'trainer', label: 'Trainer'},
        ];
  
    render() {
      return (
          <View style={styles.modules}>
            <Text style={styles.modulesHeader}>Sign Up</Text>
            <FormLabel>Email</FormLabel>
            <FormInput 
                keyboardType="email-address" 
                onChangeText={(e)=> this.onInputChange(e, 'email')}/>
            {this.state.emailError ? (
                <FormValidationMessage>{'Please enter an email address'}</FormValidationMessage>
            ): null}
            <FormLabel>Password</FormLabel>
            <FormInput
                secureTextEntry={true} 
                onChangeText={(e)=> this.onInputChange(e, 'password')}/>
            {this.state.passwordError ? (
                <FormValidationMessage>{'Please enter a password'}</FormValidationMessage>
            ): null}
            {/* <FormLabel>Account Type</FormLabel> */}
            {/* <SelectInput
              value={this.state.account_type}
              options={this.getPickerOptions()}
              onCancelEditing={() => console.log('onCancel')}
              onSubmitEditing={(e) => this.setState({account_type: e})}
              style={[styles.selectInput, styles.selectInputSmall]}
            /> */}
            <Button
                style={{marginTop: 10}}
                raised
                borderRadius={20}
                loading={this.props.authPending}
                onPress={this.onRegister}
                onLongPress={this.onRegister}
                backgroundColor={'#FF6347'}
                title='Register' />
            <SocialIcon
                title='Sign Up With Facebook'
                button
                type='facebook'
            />
            <FormValidationMessage
                containerStyle={{marginLeft: 'auto', marginRight: 'auto'}}
            >
            {this.props.regError}
            </FormValidationMessage>
            <Text
                onLongPress={this.goToLogin} 
                onPress={this.goToLogin} 
                style={styles.registrationLink} h5>Already have an account? Login</Text>
            {/* <SocialIcon
                title='Sign In With Google'
                button
                type='google-plus-official'
            /> */}
          </View>
      );
    }
  }

  const mapStateToProps = ({ auth })=> {
      console.log('login auth', auth)
      return {
          user: auth.user,
          authPending: auth.authPending,
          regError: auth.regError,
      }
  }

  export default connect(mapStateToProps, { register })(Register)
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    logo: {
      height: 80,
      marginBottom: 16,
      marginTop: 32,
      width: 80,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    modules: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    modulesHeader: {
      fontSize: 16,
      marginBottom: 8,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    module: {
      fontSize: 14,
      marginTop: 4,
      textAlign: 'center',
    },
    registrationLink: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });